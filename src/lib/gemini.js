// src/lib/gemini.js
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export const isConfigured = () => Boolean(API_KEY);

export async function generateKonsultasiKredit(data) {
  // data = { profil, dokumen, transaksi, skor }
  if (!API_KEY) throw new Error('NO_API_KEY');

  const { profil, dokumen, transaksi, skor } = data;

  // Hitung statistik keuangan dari array transaksi
  const totalPemasukan = transaksi
    .filter(t => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPengeluaran = transaksi
    .filter(t => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);

  const labaBersih = totalPemasukan - totalPengeluaran;

  const fmt = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

  // Hitung periode pencatatan dalam hari
  let periodeCatatan = 0;
  if (transaksi.length > 0) {
    const dates = transaksi.map(t => new Date(t.date).getTime());
    const oldest = Math.min(...dates);
    const newest = Math.max(...dates);
    periodeCatatan = Math.round((newest - oldest) / (1000 * 60 * 60 * 24));
  }

  // Hitung rata-rata omset bulanan
  const bulan = periodeCatatan > 0 ? periodeCatatan / 30 : 1;
  const rataOmset = fmt(totalPemasukan / bulan);

  // Hitung konsistensi: % minggu yang punya transaksi dari total minggu pencatatan
  const mingguTotal = Math.max(1, Math.ceil(periodeCatatan / 7));
  const mingguAktif = new Set(
    transaksi.map(t => {
      const d = new Date(t.date);
      return `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`;
    })
  ).size;
  const konsistensiPersen = Math.min(100, Math.round((mingguAktif / mingguTotal) * 100));

  const dok = (ada) => ada ? 'ADA ✓' : 'BELUM ADA ✗';

  const prompt = `Kamu adalah konsultan kredit berpengalaman yang ahli dalam sistem KUR (Kredit Usaha Rakyat) dan perbankan Indonesia. Kamu berbicara langsung kepada pemilik UMKM.

DATA USAHA YANG PERLU DIANALISIS:

PROFIL:
- Nama Usaha: ${profil.namaUsaha || 'Usaha Anda'}
- Jenis Usaha: ${profil.jenisUsaha}
- Lokasi: ${profil.kota || 'Indonesia'}
- Sudah berjalan: ${profil.lamaUsaha}
- Estimasi omset/bulan: ${profil.omsetPerBulan}
- Keuangan usaha terpisah dari pribadi: ${profil.keuanganTerpisah ? 'Ya' : 'Belum'}

DOKUMEN (ini yang bank periksa pertama kali):
- e-KTP: ${dok(dokumen.ktp)}
- Kartu Keluarga: ${dok(dokumen.kk)}
- NIB (Nomor Induk Berusaha): ${dok(dokumen.nib)}  ← paling menentukan
- NPWP: ${dok(dokumen.npwp)}
- Foto Usaha: ${dok(dokumen.fotoUsaha)}

DATA KEUANGAN (${periodeCatatan} hari pencatatan, ${transaksi.length} transaksi):
- Total Pemasukan: ${fmt(totalPemasukan)}
- Total Pengeluaran: ${fmt(totalPengeluaran)}
- Laba Bersih: ${fmt(labaBersih)}
- Rata-rata Omset/Bulan: ${rataOmset}
- Konsistensi Pencatatan: ${konsistensiPersen}%

SKOR KESIAPAN KREDIT: ${skor.total}/100
- Kelengkapan Dokumen: ${skor.breakdown.dokumen}/25
- Catatan Keuangan: ${skor.breakdown.catatan}/30
- Konsistensi Pencatatan: ${skor.breakdown.konsistensi}/25
- Profil Usaha: ${skor.breakdown.profil}/20

INSTRUKSI PENULISAN:
Tulis konsultasi kredit personal dalam Bahasa Indonesia yang hangat, jujur, dan memotivasi. Gunakan nama usaha. Buat dalam 4 paragraf:

Paragraf 1 (2-3 kalimat): Sapaan personal + gambaran umum kondisi usaha berdasarkan skor dan data nyata.

Paragraf 2 (2-3 kalimat): Hal positif yang perlu diapresiasi — sebut angka spesifik dari data mereka.

Paragraf 3 (2-4 kalimat): Hambatan utama yang menyebabkan skor belum maksimal — jujur dan konkret, sebut dokumen atau data yang kurang.

Paragraf 4 (3-4 kalimat): Langkah prioritas + timeline realistis + produk KUR yang paling cocok saat ini + estimasi peluang disetujui dalam persen berdasarkan data ini.

BATAS: 200-250 kata total. JANGAN gunakan bullet points atau heading. Tulis seperti surat konsultasi dari seorang ahli ke kliennya.`;

  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.6 },
    }),
  });

  if (!res.ok) {
    let errorMsg = `Gemini error: ${res.status}`;
    try {
      const errJson = await res.json();
      if (errJson.error && errJson.error.message) {
        errorMsg = `Gemini API Error: ${errJson.error.message}`;
      }
    } catch (e) {
      // Ignore json parse error if body is not json
    }
    throw new Error(errorMsg);
  }

  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error('EMPTY_RESPONSE');

  return text;
}
