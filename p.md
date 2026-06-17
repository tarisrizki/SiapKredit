# SIAPKREDIT — SUPERPROMPT UNTUK GOOGLE ANTIGRAVITY

Bangun aplikasi web lengkap bernama **SiapKredit** — platform literasi keuangan dan pengukur kesiapan kredit berbasis AI untuk UMKM Indonesia. Ikuti seluruh spesifikasi ini secara otonom dari awal hingga aplikasi berjalan dan siap di-deploy.

---

## BAGIAN 0 — IDENTITAS APLIKASI

| Atribut | Nilai |
|---|---|
| Nama Aplikasi | SiapKredit |
| Tagline | "Rekam jejak keuangan UMKM menuju kredit formal" |
| Sub-tagline | "Bukan hanya mencatat — tapi mempersiapkan Anda ke bank" |
| Target Pengguna | Pemilik UMKM Indonesia usia 21–55, pengguna smartphone, non-teknis |
| Bahasa | 100% Bahasa Indonesia |
| Mata Uang | Rupiah (Rp), format: Rp 1.500.000 |
| Format Tanggal | DD Bulan YYYY (contoh: 18 Juni 2026) |

**WAJIB — Tambahkan di `<head>` setiap halaman HTML:**
```html
<meta name="dicoding:email" content="tarisrizki@gmail.com">
```

---

## BAGIAN 1 — TECH STACK & TOOLING

### Framework & Build Tool
- **React 18** — UI library
- **Vite 5** — build tool (dev server cepat, HMR)
- **React Router DOM v6** — client-side routing (hash-based: `HashRouter`)

### Styling
- **Tailwind CSS v3** — utility-first CSS
- **tailwind.config.js** — extend warna dengan palet custom SiapKredit
- Tidak menggunakan CSS-in-JS atau styled-components

### State Management & Persistence
- **React Context API + useReducer** — global state (transactions, profile, documents, score)
- **localStorage** — satu-satunya tempat penyimpanan data (no backend, no database, fully offline)
- Custom hook `useLocalStorage(key, defaultValue)` untuk auto-sync state ke localStorage

### Charting
- **Recharts v2** — chart library berbasis React (bar chart, pie chart, line chart)
- Import dari npm, bukan CDN

### Icons
- **Lucide React** — icon library lightweight
- Semua icon: outline style

### Toast Notifications
- **react-hot-toast** — notifikasi sukses/error konfirmasi transaksi

### PDF & Print
- **Tombol "Cetak Laporan"** menggunakan `window.print()` dengan CSS `@media print`
- Tidak perlu library PDF tambahan — buat print stylesheet di `src/styles/print.css`

### Tanggal
- **date-fns** — parsing, formatting, dan kalkulasi tanggal (format Bahasa Indonesia)

### Linting & Format
- **ESLint** + **Prettier** — konfigurasi default Vite React

### Deployment Target
- **Vercel** — deploy dengan `vercel --prod` setelah build
- Output folder: `dist/`

---

## BAGIAN 2 — STRUKTUR PROYEK (FILE TREE LENGKAP)

```
siapkredit/
├── index.html                    ← root HTML, include meta dicoding
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .prettierrc
├── vercel.json                   ← SPA rewrite rules untuk Vercel
│
├── public/
│   └── favicon.ico
│
└── src/
    ├── main.jsx                  ← mount React ke #root
    ├── App.jsx                   ← HashRouter + routes + OnboardingGate
    ├── index.css                 ← Tailwind directives + global styles
    │
    ├── context/
    │   └── AppContext.jsx        ← global state: transactions, profile, documents, UI
    │
    ├── hooks/
    │   ├── useLocalStorage.js    ← localStorage sync hook
    │   ├── useScore.js           ← computed credit score dari context
    │   └── usePeriodFilter.js    ← filter transaksi berdasarkan periode
    │
    ├── utils/
    │   ├── transactionParser.js  ← NLP/regex engine parse teks Indonesia → transaksi
    │   ├── scoreCalculator.js    ← hitung Credit Readiness Score 0–100
    │   ├── formatters.js         ← formatRupiah(), formatTanggal(), formatSingkat()
    │   └── sampleData.js         ← 45 transaksi contoh Warung Bu Siti
    │
    ├── data/
    │   ├── documentList.js       ← daftar dokumen KUR + cara mendapatkan
    │   └── kurInfo.js            ← info KUR Mikro, Kecil, Komersial
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx        ← top navigation + mobile hamburger
    │   │   ├── MobileMenu.jsx    ← drawer menu untuk mobile
    │   │   └── Footer.jsx
    │   │
    │   ├── ui/
    │   │   ├── Button.jsx        ← variant: primary | secondary | ghost | danger
    │   │   ├── Card.jsx          ← wrapper card dengan padding dan shadow
    │   │   ├── Badge.jsx         ← badge status: siap/belum/proses
    │   │   ├── Modal.jsx         ← modal overlay + backdrop
    │   │   ├── ProgressBar.jsx   ← progress bar dengan label dan warna dinamis
    │   │   ├── GaugeChart.jsx    ← SVG semi-circle gauge untuk skor kredit
    │   │   ├── Tooltip.jsx       ← tooltip hover
    │   │   └── EmptyState.jsx    ← state kosong dengan ilustrasi SVG
    │   │
    │   ├── onboarding/
    │   │   └── OnboardingWizard.jsx  ← 3-step setup wizard (first launch)
    │   │
    │   ├── transaction/
    │   │   ├── ChatBubble.jsx    ← bubble percakapan (user + sistem)
    │   │   ├── ParsedPreview.jsx ← kartu konfirmasi hasil parsing
    │   │   ├── TransactionRow.jsx← satu baris transaksi di list
    │   │   └── TransactionList.jsx ← list semua transaksi dengan filter/sort
    │   │
    │   ├── dashboard/
    │   │   ├── MetricCard.jsx    ← kartu angka (pemasukan/pengeluaran/laba)
    │   │   ├── MonthlyBarChart.jsx ← bar chart bulanan (recharts)
    │   │   ├── CategoryPieChart.jsx ← pie chart kategori pengeluaran (recharts)
    │   │   ├── PeriodSelector.jsx ← tombol filter periode: 7H | 30H | 3B | 6B | Custom
    │   │   └── PrintableReport.jsx ← template laporan untuk print
    │   │
    │   ├── score/
    │   │   ├── ScoreHeader.jsx   ← gauge + angka skor + label tier
    │   │   ├── DimensionBreakdown.jsx ← 4 kartu dimensi skor
    │   │   ├── BankRecommendation.jsx ← rekomendasi produk bank berdasarkan skor
    │   │   └── ActionPlan.jsx    ← daftar aksi "Naik Kelas" dengan poin dampak
    │   │
    │   └── documents/
    │       ├── DocumentItem.jsx  ← satu item dokumen + cara mendapat + status
    │       └── DocumentProgress.jsx ← progress bar total kelengkapan dokumen
    │
    └── pages/
        ├── Landing.jsx           ← halaman utama / hero
        ├── InputTransaksi.jsx    ← halaman chat input transaksi
        ├── Dashboard.jsx         ← laporan keuangan + chart
        ├── SkorKredit.jsx        ← Credit Readiness Score + rekomendasi
        ├── Dokumen.jsx           ← checklist dokumen KUR
        ├── PanduanKUR.jsx        ← info KUR lengkap
        └── ProfilUsaha.jsx       ← form profil bisnis
```

---

## BAGIAN 3 — KONFIGURASI FILE

### `index.html`
```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="dicoding:email" content="tarisrizki@gmail.com" />
    <meta name="description" content="SiapKredit — Bantu UMKM Indonesia siap akses kredit bank dan KUR" />
    <title>SiapKredit — Rekam Jejak Keuangan UMKM</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### `tailwind.config.js`
Extend warna default dengan palet SiapKredit:
```javascript
colors: {
  brand: {
    50:  '#EFF6FF',
    100: '#DBEAFE',
    500: '#1B4D8E',   // primary blue
    600: '#1E3A8A',
    700: '#1e3a8a',
  },
  success: {
    50:  '#F0FDF4',
    500: '#28A745',   // hijau
    600: '#16A34A',
  },
  warning: {
    50:  '#FFFBEB',
    500: '#F59E0B',   // amber
  },
  danger: {
    50:  '#FFF1F2',
    500: '#DC2626',   // merah
  }
}
```

### `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### `package.json` — dependencies wajib:
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "recharts": "^2.12.7",
    "lucide-react": "^0.438.0",
    "react-hot-toast": "^2.4.1",
    "date-fns": "^3.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.6"
  }
}
```

---

## BAGIAN 4 — DATA MODEL

### Transaksi
```typescript
interface Transaksi {
  id: string;               // nanoid() — unique ID
  type: 'pemasukan' | 'pengeluaran';
  amount: number;           // dalam Rupiah (integer)
  category: KategoriTransaksi;
  description: string;      // teks asli dari user
  date: string;             // ISO date string: "2026-06-18"
  createdAt: number;        // timestamp Unix
  isManual: boolean;        // true jika di-input manual, false jika parsed
}

type KategoriTransaksi =
  | 'Penjualan'
  | 'Jasa'
  | 'HPP'           // Harga Pokok Penjualan
  | 'Operasional'
  | 'Gaji'
  | 'Sewa'
  | 'Cicilan'
  | 'Lain-lain';
```

### Profil Usaha
```typescript
interface ProfilUsaha {
  namaUsaha: string;
  jenisUsaha: 'Perdagangan' | 'Makanan & Minuman' | 'Jasa' | 'Pertanian' | 'Kerajinan' | 'Lainnya';
  lamaUsaha: '<6 bulan' | '6–11 bulan' | '1–2 tahun' | '>2 tahun';
  kota: string;
  omsetPerBulan: '<1 juta' | '1–5 juta' | '5–20 juta' | '20–50 juta' | '>50 juta';
  keuanganTerpisah: boolean;
  setupDone: boolean;       // true setelah onboarding selesai
}
```

### Status Dokumen
```typescript
interface StatusDokumen {
  ktp: boolean;
  kk: boolean;
  nib: boolean;             // Nomor Induk Berusaha via oss.go.id
  npwp: boolean;
  fotoUsaha: boolean;
  rekeningBank: boolean;
  bpjsTK: boolean;         // BPJS Ketenagakerjaan
}
```

### Global State (AppContext)
```typescript
interface AppState {
  transaksi: Transaksi[];
  profil: ProfilUsaha;
  dokumen: StatusDokumen;
  chatHistory: ChatMessage[];   // riwayat chat di halaman input
  ui: {
    period: PeriodFilter;       // filter periode dashboard
    isOnboarded: boolean;
  };
}

// Aksi yang tersedia:
type AppAction =
  | { type: 'ADD_TRANSAKSI'; payload: Transaksi }
  | { type: 'DELETE_TRANSAKSI'; payload: string }
  | { type: 'UPDATE_PROFIL'; payload: Partial<ProfilUsaha> }
  | { type: 'UPDATE_DOKUMEN'; payload: Partial<StatusDokumen> }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_PERIOD'; payload: PeriodFilter }
  | { type: 'RESET_DATA' }
  | { type: 'LOAD_SAMPLE_DATA' };
```

---

## BAGIAN 5 — ALGORITMA KUNCI

### 5.1 Transaction Parser (`src/utils/transactionParser.js`)

Fungsi: `parseTransaction(text: string): ParsedResult | null`

**Langkah 1 — Deteksi Tipe:**
Cek keyword pemasukan di teks (case-insensitive):
- Pemasukan: `jual`, `laku`, `terjual`, `terima`, `dapat`, `masuk`, `DP dari`, `bayaran dari`, `pembayaran dari`, `untung`, `pendapatan`, `penghasilan`
- Pengeluaran: `beli`, `bayar`, `keluar`, `biaya`, `cicilan`, `sewa`, `gaji`, `upah`, `transfer`, `kirim`, `belanja`

Jika ada kedua kata, ambil yang paling dominan (posisi kata pertama).
Default jika tidak terdeteksi: `pengeluaran`.

**Langkah 2 — Ekstrak Nominal:**

Regex pattern (urutkan dari spesifik ke umum):
```
1. Rp\s*[\d.]+           → "Rp 400.000" → 400000
2. (\d+(?:[.,]\d+)*)\s*(juta|jt)   → "1.5juta" → 1500000
3. (\d+(?:[.,]\d+)*)\s*(ribu|rb|k) → "300rb" → 300000
4. @(\d+(?:[.,]\d+)*)    → "@80rb" → lihat konteks satuan
5. (\d+(?:[.,]\d+)*)     → angka mentah
```

Aturan angka mentah tanpa satuan:
- Jika <= 999: kalikan 1000 (asumsi dalam "ribu")
- Jika 1000–99999: gunakan apa adanya
- Jika >= 100000: gunakan apa adanya

Jika ada pola `X barang @Y` atau `X pcs @Y`, kalikan X × Y untuk mendapat total.
Contoh: "Jual 5 kaos @80rb" → 5 × 80.000 = 400.000

**Langkah 3 — Deteksi Kategori:**

```
Penjualan:  kaos, baju, celana, dress, jilbab, sepatu, tas, aksesoris,
            nasi, mie, gorengan, kue, snack, makanan, minuman, es, kopi,
            barang, produk, dagangan, online, shopee, tokopedia
            
Jasa:       jasa, service, servis, ongkos, cuci, laundry, salon,
            potong rambut, cat, reparasi, bengkel, jahit, desain, cetak

HPP:        bahan, material, stok, tepung, minyak, gula, daging,
            bahan baku, kulakan, grosir, resupply

Operasional: listrik, air, gas, internet, wifi, telpon, hp, bensin,
             bbm, pertamax, parkir, kardus, plastik, alat, perlengkapan
             
Gaji:       gaji, upah, tukang, karyawan, pegawai, honor, honorarium

Sewa:       sewa, kontrakan, kios, lapak, stan, booth, tempat, ruko

Cicilan:    cicilan, angsuran, kredit, KUR, pinjaman
```

**Langkah 4 — Deteksi Tanggal:**
- "kemarin" → new Date() - 1 hari
- "tadi pagi/siang/malam" → hari ini
- "minggu lalu" → new Date() - 7 hari
- Tidak ada keterangan → hari ini
- Format eksplisit (18/6, 18 juni) → parse manual

**Output jika parsing berhasil:**
```javascript
{
  success: true,
  type: 'pemasukan',
  amount: 400000,
  category: 'Penjualan',
  description: 'Jual 5 kaos @80rb',
  date: '2026-06-18',
  confidence: 'high' | 'medium' | 'low'
}
```

---

### 5.2 Score Calculator (`src/utils/scoreCalculator.js`)

Fungsi: `hitungSkor(transaksi, profil, dokumen): ScoreResult`

```
TOTAL: 100 poin

A. KELENGKAPAN DOKUMEN — 25 poin
   Sumber: StatusDokumen
   - KTP ada:           +5 poin  (syarat mutlak semua KUR)
   - KK ada:            +3 poin  (syarat KUR BRI, Mandiri)
   - NIB/SKU ada:      +10 poin  (SANGAT PENTING — paling banyak tidak punya)
   - NPWP ada:          +5 poin  (wajib untuk KUR > Rp 50 juta)
   - Foto usaha ada:    +2 poin  (memperkuat survei bank)

B. CATATAN KEUANGAN — 30 poin
   Sumber: array transaksi
   - Ada minimal 1 transaksi:                            +5 poin
   - Catatan ≥ 30 hari (1 bulan):                        +5 poin
   - Catatan ≥ 90 hari (3 bulan):                        +8 poin  (override 5)
   - Catatan ≥ 180 hari (6 bulan, syarat KUR):          +15 poin  (override 8)
   - Usaha menghasilkan laba (total pemasukan > pengeluaran): +7 poin
   - Keuangan usaha terpisah dari pribadi (self-declare): +3 poin

C. KONSISTENSI PENCATATAN — 25 poin
   - Rata-rata transaksi ≥ 3x per minggu dalam 30 hari terakhir: +10 poin
   - Tidak ada gap > 14 hari tanpa transaksi (dari data ada): +8 poin
   - Semua transaksi punya kategori & deskripsi: +7 poin

D. PROFIL USAHA — 20 poin
   Sumber: ProfilUsaha
   - Usaha berjalan 6–11 bulan:  +8 poin  (minimum KUR Mikro)
   - Usaha berjalan 1–2 tahun:  +12 poin
   - Usaha berjalan > 2 tahun:  +15 poin  (override, maks 15)
   - Omset 1–5 juta/bulan:   +2 poin
   - Omset 5–20 juta/bulan:  +4 poin
   - Omset > 20 juta/bulan:  +5 poin  (maks 5)
```

**Interpretasi Skor & Rekomendasi Produk:**
```
0–30   "Belum Siap"    (merah)       Belum memenuhi syarat dasar KUR
31–50  "Mulai Siap"    (oranye)      Bisa mencoba KUR Mikro BRI/Mandiri (maks Rp 50 jt, 6%/thn)
51–70  "Siap Kredit"   (kuning-hijau) KUR Mikro + awal KUR Kecil (Rp 50–500 jt)
71–85  "Sangat Siap"   (hijau)       KUR Kecil + kredit komersial bank
86–100 "Bankable"      (hijau tua)   Siap kredit komersial perbankan manapun
```

**Aksi Rekomendasi (urut dampak tertinggi):**
```javascript
const aksiRekomendasi = [
  {
    jika: !dokumen.nib,
    aksi: 'Buat NIB (Nomor Induk Berusaha) di oss.go.id',
    dampak: '+10 poin',
    waktu: '15 menit',
    gratis: true,
    link: 'https://oss.go.id',
    detail: 'NIB adalah syarat utama KUR. Bisa dibuat gratis online hanya dengan KTP.'
  },
  {
    jika: historiKurangDari6Bulan,
    aksi: 'Catat transaksi selama 6 bulan berturut-turut',
    dampak: '+7 poin (memenuhi syarat KUR)',
    waktu: 'Komitmen 6 bulan',
    gratis: true,
    detail: 'Bank mensyaratkan laporan keuangan minimal 6 bulan. SiapKredit membantu Anda membangunnya.'
  },
  {
    jika: !dokumen.npwp,
    aksi: 'Buat NPWP di pajak.go.id atau kantor pajak',
    dampak: '+5 poin (wajib untuk KUR > Rp 50 juta)',
    waktu: '1–3 hari',
    gratis: true,
    link: 'https://www.pajak.go.id'
  },
  {
    jika: !profil.keuanganTerpisah,
    aksi: 'Buka rekening bank terpisah khusus usaha',
    dampak: '+3 poin + memperkuat kelayakan bank',
    waktu: '1 hari',
    biaya: 'Biaya setoran awal bervariasi (BRI Simpedes: Rp 25.000)'
  },
  {
    jika: konsistensiRendah,
    aksi: 'Catat transaksi minimal 3 kali per minggu',
    dampak: '+10 poin konsistensi',
    waktu: 'Komitmen 4 minggu',
    gratis: true,
    detail: 'Konsistensi pencatatan menunjukkan ketertiban pengelolaan keuangan ke bank.'
  }
]
```

---

### 5.3 Sample Data (`src/utils/sampleData.js`)

Buat **45 transaksi** untuk usaha fiktif **"Warung Makan Bu Siti"** di Bandung.
- Periode: 60 hari terakhir dari tanggal saat ini
- Profil: Makanan & Minuman | 14 bulan | Bandung | Omset Rp 10–20 juta/bulan
- Pemasukan harian berkisar Rp 300.000–800.000 (penjualan nasi, lauk, minuman)
- Pengeluaran: bahan makanan 3x/minggu, gas LPG, plastik, 1x gaji karyawan/bulan, listrik bulanan
- Net: sekitar Rp 3.500.000–4.500.000 laba bersih per bulan
- Dokumen preset: KTP ✓, KK ✓, NIB ✗, NPWP ✗, Foto Usaha ✓

Tampilkan banner di halaman saat data sample aktif:
> "Ini adalah data contoh Warung Bu Siti. Klik 'Hapus Data Contoh' untuk memulai dengan data Anda sendiri."

---

## BAGIAN 6 — ALUR PENGGUNA LENGKAP (USER FLOW)

### ALUR 1 — Onboarding (Pengguna Baru)

```
[Buka App] 
    ↓
[Cek localStorage: isOnboarded?]
    ├── YA → langsung ke Landing/Dashboard
    └── TIDAK → tampilkan OnboardingWizard (modal fullscreen)
        │
        ├── STEP 1/3 — Profil Usaha
        │   Form: nama usaha, jenis usaha, lama usaha, kota, omset
        │   CTA: "Lanjut →"
        │
        ├── STEP 2/3 — Cek Dokumen Awal
        │   Checklist cepat: "Anda sudah punya apa?"
        │   (KTP, KK, NIB, NPWP, Foto usaha)
        │   CTA: "Lanjut →"
        │
        └── STEP 3/3 — Pilih Data Awal
            Dua pilihan:
            ○ "Muat Data Contoh (Warung Bu Siti)" → load sampleData
            ○ "Mulai Dari Awal" → kosong
            CTA: "Mulai Gunakan SiapKredit →"
            
    → Set isOnboarded = true → redirect ke /dashboard
```

---

### ALUR 2 — Input Transaksi (Halaman `/input`)

```
[User buka halaman Input Transaksi]
    ↓
[Tampil chat interface — WhatsApp-style]
Riwayat chat tersimpan di context (chatHistory)
    ↓
[User ketik di textarea bawah]
Contoh: "Jual 5 kaos polos @80 ribu"
    ↓
[User tekan Enter atau tombol Kirim]
    ↓
[Chat bubble "user" muncul di layar]
    ↓
[Sistem memanggil parseTransaction(text)]
    ↓
    ├── PARSING BERHASIL (confidence: high/medium)
    │       ↓
    │   [Tampil ParsedPreview card]
    │   ┌─────────────────────────────────┐
    │   │ ✅ Ini yang saya tangkap:       │
    │   │ Tipe:      Pemasukan            │
    │   │ Jumlah:    Rp 400.000           │
    │   │ Kategori:  Penjualan            │
    │   │ Tanggal:   18 Juni 2026         │
    │   │ [✏ Edit] [✅ Simpan]            │
    │   └─────────────────────────────────┘
    │       ↓
    │   [Jika user klik SIMPAN]
    │       → transaksi masuk ke state
    │       → toast: "Transaksi disimpan! Skor kredit Anda diperbarui."
    │       → score recalculated otomatis
    │       ↓
    │   [Jika user klik EDIT]
    │       → buka modal edit manual
    │       → user bisa ubah semua field
    │       → simpan manual → toast sukses
    │
    └── PARSING GAGAL (teks tidak jelas)
            ↓
        [Tampil pesan sistem]
        "Hmm, saya belum mengerti. Coba tulis seperti ini:
         'Jual [barang] Rp [harga]' atau 'Bayar [keperluan] [jumlah]rb'"
        [Contoh transaksi quick-pick: 3 tombol shortcut]

[Di bawah chat — sidebar kanan atau panel bawah]
Tampil ringkasan hari ini:
  📈 Pemasukan hari ini: Rp 400.000
  📉 Pengeluaran hari ini: Rp 0
  💰 Saldo bersih: Rp 400.000
```

---

### ALUR 3 — Dashboard Keuangan (`/dashboard`)

```
[Buka Dashboard]
    ↓
[Period Selector — default: Bulan Ini]
  Tombol: [7 Hari] [Bulan Ini] [3 Bulan] [6 Bulan] [Pilih Tanggal]
    ↓
[Baris Metric Cards]
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │ Pemasukan    │  │ Pengeluaran  │  │ Laba/Rugi    │  │ Total Trx    │
  │ Rp 12.500.000│  │ Rp 8.200.000 │  │ Rp 4.300.000 │  │ 28 transaksi │
  │ ↑ vs bulan lalu│  │ ↓ efisien  │  │ ✅ Untung    │  │              │
  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
    ↓
[Bar Chart — Pemasukan vs Pengeluaran per Bulan]
  Recharts BarChart, tooltip dalam Rupiah
  Warna: brand-500 (pemasukan) + danger-500 (pengeluaran)
    ↓
[Dua kolom di bawah chart]
  Kolom Kiri: Pie Chart Kategori Pengeluaran
  Kolom Kanan: Daftar Transaksi Terbaru (5 teratas)
    ↓
[Tombol aksi bawah halaman]
  [📄 Cetak Laporan] → window.print() dengan print stylesheet
  [📊 Lihat Skor Kredit →] → navigate ke /skor
```

**Print Stylesheet (`src/styles/print.css`):**
```css
@media print {
  .no-print { display: none !important; }
  .print-header::before {
    content: "SiapKredit — Laporan Keuangan";
    display: block;
    font-size: 20px;
    font-weight: bold;
  }
  /* tampilkan tabel transaksi lengkap, sembunyikan chart */
}
```

---

### ALUR 4 — Skor Kredit (`/skor`)

```
[Buka halaman Skor Kredit]
    ↓
[Hitung skor real-time dari context]
    ↓
[Section 1 — Hero Skor]
  ┌────────────────────────────────────────────┐
  │         SKOR KESIAPAN KREDIT ANDA          │
  │                                            │
  │         [SVG Gauge Semi-circle]            │
  │              72 / 100                      │
  │          ✅ SANGAT SIAP                    │
  │                                            │
  │  "Anda memenuhi syarat KUR Kecil           │
  │   (Rp 50–500 juta, bunga 6%/tahun)"        │
  └────────────────────────────────────────────┘
    ↓
[Section 2 — Breakdown 4 Dimensi]
  4 kartu berdampingan (grid 2x2 di mobile, 4x1 di desktop)
  Setiap kartu:
  - Nama dimensi + skor (15/25)
  - Progress bar berwarna
  - 2-3 item checklist yang sudah/belum tercapai
    ↓
[Section 3 — Rekomendasi Bank/KUR]
  Berdasarkan skor, tampilkan yang SUDAH MEMENUHI SYARAT:
  ┌─────────────────────────────────────────────┐
  │ ✅ KUR Mikro BRI          TERBUKA           │
  │    Maks Rp 50 juta | Bunga 6%/thn           │
  │    Syarat: KTP ✓ KK ✓ NIB ✗ (segera buat) │
  │    [Info Lengkap] [kur.bri.co.id ↗]        │
  ├─────────────────────────────────────────────┤
  │ 🔒 KUR Kecil Mandiri      HAMPIR BISA       │
  │    Maks Rp 500 juta | Perlu NIB + 6 bln    │
  │    Kurang: NIB, catatan keuangan 6 bulan   │
  └─────────────────────────────────────────────┘
    ↓
[Section 4 — Action Plan "Naik Kelas"]
  Header: "Lakukan ini untuk meningkatkan skor Anda"
  List aksi diurutkan dari dampak terbesar:
  ┌──────────────────────────────────────────────────┐
  │ 🏆 Buat NIB di oss.go.id         +10 poin | 15 menit │
  │    Gratis, online, hanya butuh KTP              │
  │    [Buat Sekarang →]                            │
  ├──────────────────────────────────────────────────┤
  │ 📊 Catat transaksi 6 bulan       +7 poin  | Komitmen │
  │    Syarat utama KUR dari semua bank             │
  │    [Mulai Mencatat →]                           │
  └──────────────────────────────────────────────────┘
    ↓
[Skor diperbarui otomatis setiap kali context berubah]
```

---

### ALUR 5 — Checklist Dokumen (`/dokumen`)

```
[Buka halaman Dokumen]
    ↓
[Progress Bar Total]
  "Dokumen lengkap: 3 dari 7 (43%)"
  Progress bar hijau
    ↓
[List Dokumen — setiap item expandable]

  Contoh satu item:
  ┌──────────────────────────────────────────────────────┐
  │ [✓] e-KTP (Kartu Tanda Penduduk)        5 poin ✅    │
  │ ▼ klik untuk detail                                  │
  │                                                      │
  │ Kenapa dibutuhkan bank:                              │
  │ Identitas utama peminjam. Semua jenis KUR dan kredit │
  │ bank membutuhkan e-KTP yang masih berlaku.           │
  │                                                      │
  │ Cara mendapatkan/memperbarui:                        │
  │ → Datang ke Kantor Dukcapil setempat dengan membawa  │
  │   surat pengantar RT/RW                              │
  │                                                      │
  │ [Tandai Sudah Punya ✓]                               │
  └──────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────┐
  │ [ ] NIB (Nomor Induk Berusaha)          10 poin ⚠️  │
  │ ▼ klik untuk detail                                  │
  │                                                      │
  │ Kenapa dibutuhkan bank:                              │
  │ NIB adalah bukti legalitas usaha yang WAJIB untuk    │
  │ semua pengajuan KUR. Lebih dari 50% UMKM belum       │
  │ memiliki NIB (Deputi Bappenas, 2024).                │
  │                                                      │
  │ Cara mendapatkan (GRATIS):                           │
  │ 1. Buka oss.go.id                                    │
  │ 2. Daftar dengan NIK dan nomor HP                    │
  │ 3. Isi data usaha (nama, alamat, jenis usaha)        │
  │ 4. NIB langsung terbit dalam 15 menit               │
  │                                                      │
  │ [🔗 Buka oss.go.id]  [Tandai Sudah Punya ✓]         │
  └──────────────────────────────────────────────────────┘
```

**Semua 7 dokumen yang ditampilkan:**

| No | Dokumen | Poin | Portal Resmi |
|----|---------|------|-------------|
| 1 | e-KTP | 5 | dukcapil setempat |
| 2 | Kartu Keluarga (KK) | 3 | dukcapil setempat |
| 3 | NIB via OSS (atau SKU dari kelurahan) | 10 | oss.go.id |
| 4 | NPWP | 5 | pajak.go.id |
| 5 | Foto Usaha (3–5 foto) | 2 | — |
| 6 | Rekening Bank Aktif | 3 (bonus) | bank terdekat |
| 7 | BPJS Ketenagakerjaan | — (syarat KUR Kecil >100 jt) | bpjsketenagakerjaan.go.id |

---

### ALUR 6 — Panduan KUR (`/kur`)

Halaman informasi statis tentang program KUR berdasarkan data resmi pemerintah:

**Perbandingan Produk Kredit (tabel):**

| Produk | Plafon | Bunga | Jaminan | Syarat Utama |
|--------|--------|-------|---------|-------------|
| KUR Mikro | s.d. Rp 50 juta | 6%/thn | Tidak wajib | KTP + NIB/SKU + usaha ≥6 bln |
| KUR Kecil | Rp 50–500 juta | 6%/thn | BPKB/SHM (>Rp100 jt) | + NPWP + BPJS TK |
| Kredit Komersial | >Rp 500 juta | 6–12%/thn | Agunan wajib | Laporan keuangan audited |

**Langkah Pengajuan KUR (step-by-step):**
1. Cek skor kesiapan di SiapKredit (syarat minimal: skor 31+)
2. Siapkan dokumen (KTP, KK, NIB, catatan keuangan)
3. Cek riwayat kredit pribadi di **iDebku.ojk.go.id** (Sistem Layanan Informasi Keuangan OJK)
4. Datang ke cabang bank terdekat atau ajukan online:
   - BRI: kur.bri.co.id
   - Mandiri: bancassurance.bankmandiri.co.id
   - BNI: bni.co.id/kur
5. Petugas bank akan melakukan survei lokasi usaha
6. Tunggu persetujuan (3–14 hari kerja)
7. Tandatangani perjanjian kredit
8. Dana cair ke rekening

**Catatan penting (tampilkan sebagai callout box):**
> Bank akan mengecek riwayat kredit Anda melalui **SLIK OJK** (Sistem Layanan Informasi Keuangan). Pastikan tidak ada kredit macet sebelumnya. Cek mandiri di iDebku.ojk.go.id sebelum mengajukan.

---

## BAGIAN 7 — DESAIN UI

### Warna
- Primary (brand blue): `#1B4D8E` — kepercayaan, profesional
- Success (hijau): `#28A745` — tumbuh, positif
- Warning (amber): `#F59E0B` — perhatian, perbaikan
- Danger (merah): `#DC2626` — belum siap
- Background: `#F8F9FA` (abu sangat terang)
- Surface/card: `#FFFFFF`
- Text primary: `#111827`
- Text secondary: `#6B7280`
- Border: `#E5E7EB`

### Gauge Chart (SVG — buat sendiri tanpa library)
Semi-circle gauge dengan:
- Stroke warna merah (0–30) → oranye (31–50) → kuning (51–70) → hijau (71–100)
- Angka skor besar di tengah (bold, 48px)
- Label tier di bawah angka (16px)
- Arc menggunakan `stroke-dasharray` dan `stroke-dashoffset` SVG

### Typography
- Heading 1: 28–32px, font-weight 700
- Heading 2: 22–24px, font-weight 600
- Body: 15–16px, font-weight 400, line-height 1.6
- Label kecil: 12–13px, font-weight 500
- Gunakan Tailwind `font-sans` (sistem default)

### Komponen Penting
- **Semua angka Rupiah**: selalu gunakan `formatRupiah(amount)` → "Rp 1.500.000"
- **Badge status skor**: pill berwarna sesuai tier skor
- **Progress bar dimensi**: tinggi 8px, rounded, warna sesuai persentase
- **Chat bubble user**: aligned kanan, bg brand-100, teks brand-800
- **Chat bubble sistem**: aligned kiri, bg white, border abu, teks gray-700

### Responsivitas
- Mobile-first: Tailwind breakpoints `sm:` `md:` `lg:`
- Navbar mobile: hamburger → drawer dari kiri
- Grid dashboard: 1 kolom (mobile) → 2 kolom (md) → 4 kolom (lg)
- Chat input: selalu di bawah layar (sticky bottom)
- Ukuran tap target minimum 44px untuk semua tombol

---

## BAGIAN 8 — KOMPONEN UI DETAIL

### Navbar
- Kiri: Logo "SiapKredit" dengan ikon panah naik (Lucide `TrendingUp`)
- Desktop: link horizontal — Beranda | Input Transaksi | Dashboard | Skor Kredit | Dokumen | KUR
- Mobile: hamburger icon, slide-in drawer dari kiri
- Link aktif: `text-brand-500 font-semibold border-b-2 border-brand-500`
- Sticky top-0, bg white, shadow-sm

### Footer
```
SiapKredit — Membantu UMKM Indonesia naik kelas melalui literasi keuangan

Referensi data:
• Jumlah & kontribusi UMKM: Kementerian Koperasi dan UKM (2024)
• Akses pembiayaan: Direktur Pusat Investasi Pemerintah, Kemenkeu
• Legalitas UMKM: Deputi Bappenas (2024)
• Porsi kredit UMKM: Bank Indonesia
• Program KUR: Kemenko Perekonomian, BRI, Mandiri, BNI

Program KUR adalah program resmi pemerintah Indonesia.
Bunga 6%/tahun disubsidi oleh APBN.
```

---

## BAGIAN 9 — FORMATTERS (Helpers Wajib)

```javascript
// src/utils/formatters.js

// Rupiah: 1500000 → "Rp 1.500.000"
export function formatRupiah(angka) {
  return 'Rp ' + Math.round(angka).toLocaleString('id-ID');
}

// Tanggal panjang: "2026-06-18" → "18 Juni 2026"
export function formatTanggalPanjang(isoDate) {
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni',
                 'Juli','Agustus','September','Oktober','November','Desember'];
  const d = new Date(isoDate);
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

// Tanggal singkat: "2026-06-18" → "18 Jun"
export function formatTanggalSingkat(isoDate) {
  // ...
}

// Selisih hari: "3 hari lalu", "kemarin", "hari ini"
export function formatRelative(isoDate) {
  // ...
}

// Singkat nominal: 1500000 → "1,5 jt" | 400000 → "400 rb"
export function formatSingkat(angka) {
  if (angka >= 1_000_000) return (angka / 1_000_000).toFixed(1).replace('.0', '') + ' jt';
  if (angka >= 1_000) return (angka / 1_000).toFixed(0) + ' rb';
  return String(angka);
}
```

---

## BAGIAN 10 — RUTE APLIKASI

Gunakan `HashRouter` dari react-router-dom v6:

```javascript
// App.jsx
<HashRouter>
  <OnboardingGate>
    <Navbar />
    <main>
      <Routes>
        <Route path="/"        element={<Landing />} />
        <Route path="/input"   element={<InputTransaksi />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skor"    element={<SkorKredit />} />
        <Route path="/dokumen" element={<Dokumen />} />
        <Route path="/kur"     element={<PanduanKUR />} />
        <Route path="/profil"  element={<ProfilUsaha />} />
        <Route path="*"        element={<Navigate to="/" />} />
      </Routes>
    </main>
    <Footer />
    <Toaster /> {/* react-hot-toast */}
  </OnboardingGate>
</HashRouter>
```

`OnboardingGate`: komponen yang cek `profil.setupDone` dari context. Jika false, tampilkan `OnboardingWizard` di atas semua halaman.

---

## BAGIAN 11 — INSTRUKSI KHUSUS UNTUK ANTIGRAVITY

1. **Mulai dari `package.json`**, lalu setup Vite + React + Tailwind sesuai spec di atas
2. **Jalankan `npm install`** semua dependencies
3. **Buat semua file** sesuai file tree di Bagian 2 — tidak ada yang dilewati
4. **Implement `transactionParser.js` dengan lengkap** — ini adalah fitur utama
5. **Implement `scoreCalculator.js` dengan tepat** — gunakan formula di Bagian 5.2
6. **Load sample data** saat first launch jika user memilih opsi tersebut
7. **Test manual** di browser: input transaksi "Jual 10 gorengan @500", verifikasi parsing benar
8. **Skor harus update otomatis** setiap kali transaksi baru ditambahkan atau dokumen dicentang
9. **Semua teks dalam Bahasa Indonesia** — tidak ada teks Inggris yang terlihat user
10. **Verifikasi meta tag Dicoding** ada di `index.html` sebelum selesai

---

## BAGIAN 12 — CHECKLIST FINAL SEBELUM SELESAI

Verifikasi semua item ini terpenuhi:

- [ ] `<meta name="dicoding:email" content="tarisrizki@gmail.com">` ada di `index.html`
- [ ] Semua 7 halaman/route berfungsi dan tidak ada error
- [ ] Transaction parser bisa parse: "Jual 5 kaos @80rb", "Bayar listrik 150 ribu", "Terima DP 500rb dari Bu Dewi"
- [ ] Credit Readiness Score terupdate otomatis saat transaksi bertambah
- [ ] Semua angka menggunakan format Rupiah Indonesia (Rp 1.500.000)
- [ ] Semua tanggal dalam format Indonesia (18 Juni 2026)
- [ ] Sample data Warung Bu Siti ter-load dengan benar
- [ ] Onboarding wizard muncul di first launch
- [ ] Halaman dokumen menampilkan link ke oss.go.id, pajak.go.id, iDebku.ojk.go.id
- [ ] Halaman KUR menampilkan link ke kur.bri.co.id
- [ ] Aplikasi responsif di mobile (375px) dan desktop (1280px)
- [ ] Print/cetak laporan berfungsi
- [ ] `vercel.json` sudah ada untuk SPA routing
- [ ] `npm run build` berhasil tanpa error
- [ ] `npm run preview` — aplikasi berjalan sempurna di localhost

---

*SiapKredit — Membantu 44 juta UMKM Indonesia yang belum bisa akses kredit formal.*
*Data berdasarkan: Kemenkop UKM 2024 | Kemenkeu/PIP | Bank Indonesia | OJK | Kemenko Perekonomian*