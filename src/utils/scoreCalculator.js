// src/utils/scoreCalculator.js

/**
 * Menghitung Credit Readiness Score (0-100)
 */
export function hitungSkor(transaksi, profil, dokumen) {
  let skor = 0;
  let breakdown = {
    dokumen: 0,
    catatan: 0,
    konsistensi: 0,
    profil: 0
  };

  // A. KELENGKAPAN DOKUMEN (25 poin)
  if (dokumen.ktp) { skor += 5; breakdown.dokumen += 5; }
  if (dokumen.kk) { skor += 3; breakdown.dokumen += 3; }
  if (dokumen.nib) { skor += 10; breakdown.dokumen += 10; }
  if (dokumen.npwp) { skor += 5; breakdown.dokumen += 5; }
  if (dokumen.fotoUsaha) { skor += 2; breakdown.dokumen += 2; }

  // B. CATATAN KEUANGAN (30 poin)
  if (transaksi.length > 0) {
    skor += 5; breakdown.catatan += 5;
    
    // Rentang waktu catatan
    const dates = transaksi.map(t => new Date(t.date).getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const daysDiff = (maxDate - minDate) / (1000 * 60 * 60 * 24);

    let rentangPoin = 0;
    if (daysDiff >= 180) rentangPoin = 15; // 6 bulan
    else if (daysDiff >= 90) rentangPoin = 8; // 3 bulan
    else if (daysDiff >= 30) rentangPoin = 5; // 1 bulan

    skor += rentangPoin; breakdown.catatan += rentangPoin;

    // Laba/Rugi
    const totalPemasukan = transaksi.filter(t => t.type === 'pemasukan').reduce((sum, t) => sum + t.amount, 0);
    const totalPengeluaran = transaksi.filter(t => t.type === 'pengeluaran').reduce((sum, t) => sum + t.amount, 0);
    if (totalPemasukan > totalPengeluaran) {
      skor += 7; breakdown.catatan += 7;
    }
  }

  if (profil.keuanganTerpisah) {
    skor += 3; breakdown.catatan += 3;
  }

  // C. KONSISTENSI PENCATATAN (25 poin)
  if (transaksi.length > 0) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentTrx = transaksi.filter(t => new Date(t.date) >= thirtyDaysAgo);
    
    // Rata-rata 3x per minggu = ~12 transaksi sebulan
    if (recentTrx.length >= 12) {
      skor += 10; breakdown.konsistensi += 10;
    }

    // Gap > 14 hari
    let maxGap = 0;
    const trxDates = transaksi.map(t => new Date(t.date).getTime());
    const sortedDates = [...trxDates].sort((a,b) => a-b);
    for(let i=1; i<sortedDates.length; i++) {
        const gap = (sortedDates[i] - sortedDates[i-1]) / (1000 * 60 * 60 * 24);
        if(gap > maxGap) maxGap = gap;
    }
    if (maxGap <= 14 && sortedDates.length > 1) {
      skor += 8; breakdown.konsistensi += 8;
    }

    // Deskripsi & Kategori
    const lengkap = transaksi.every(t => t.category && t.description && t.category !== 'Lain-lain');
    if (lengkap) {
      skor += 7; breakdown.konsistensi += 7;
    }
  }

  // D. PROFIL USAHA (20 poin)
  let profilPoinLama = 0;
  if (profil.lamaUsaha === '>2 tahun') profilPoinLama = 15;
  else if (profil.lamaUsaha === '1–2 tahun') profilPoinLama = 12;
  else if (profil.lamaUsaha === '6–11 bulan') profilPoinLama = 8;
  
  skor += profilPoinLama; breakdown.profil += profilPoinLama;

  let profilPoinOmset = 0;
  if (profil.omsetPerBulan === '>50 juta' || profil.omsetPerBulan === '20–50 juta') profilPoinOmset = 5;
  else if (profil.omsetPerBulan === '5–20 juta') profilPoinOmset = 4;
  else if (profil.omsetPerBulan === '1–5 juta') profilPoinOmset = 2;

  skor += profilPoinOmset; breakdown.profil += profilPoinOmset;

  // Cap skor di 100
  skor = Math.min(100, Math.max(0, skor));

  return { total: skor, breakdown };
}
