# SiapKredit

**SiapKredit** adalah aplikasi berbasis web modern yang dirancang khusus untuk membantu **UMKM Indonesia** mencatat keuangan dengan mudah, menganalisis kelayakan kredit, dan mempersiapkan dokumen untuk pengajuan Kredit Usaha Rakyat (KUR).

## Fitur Utama

- **Input Transaksi Natural (Mode Simple)**: UMKM tidak perlu memiliki latar belakang akuntansi. Cukup ketik transaksi sehari-hari (contoh: "Jual 5 porsi soto @15rb"), dan sistem akan otomatis mengonversinya menjadi format laporan keuangan standar.
- **Mode Profesional**: Menyediakan antarmuka pencatatan tingkat lanjut untuk UMKM yang membutuhkan input transaksi mendetail (pemasukan, pengeluaran operasional, dan transfer).
- **Dasbor & Laporan Otomatis**: Laporan Laba/Rugi, Arus Kas, dan Tren Pemasukan dihitung secara otomatis secara langsung (real-time). Laporan ini dapat dicetak ke format PDF sebagai lampiran untuk pihak bank.
- **Skor Kesiapan Bank (KUR)**: Sistem skoring cerdas yang mengevaluasi kesiapan UMKM untuk mengajukan pinjaman berdasarkan standar nyata perbankan (meliputi parameter Omset, Laba, Usia Usaha, dan kelengkapan legalitas seperti NIB/NPWP).
- **Konsultan AI Terintegrasi**: Didukung oleh teknologi Google Gemini 2.5 Flash, fitur ini memberikan analisis mendalam secara personal, persentase probabilitas kelulusan pinjaman, serta rekomendasi langkah konkret untuk memperbaiki profil keuangan UMKM.
- **Manajemen Ceklis Dokumen**: Memastikan kelengkapan administrasi UMKM terorganisir dengan baik sebelum melakukan pengajuan kredit fisik.
- **Arsitektur Offline-First & Aman**: Seluruh data transaksi disimpan secara aman di dalam *local storage* browser pengguna. Privasi data finansial terjamin karena tidak dikirim ke peladen (server) pihak ketiga.

## Teknologi yang Digunakan

- **Frontend Framework**: React.js (Vite)
- **Styling**: Tailwind CSS & Framer Motion (Glassmorphism & Fluid UI)
- **Icons**: Lucide React
- **Artificial Intelligence**: Google Gemini API (Model 2.5 Flash)
- **State Management**: React Context API
- **Data Persistence**: Local Storage API

## Panduan Instalasi & Menjalankan Aplikasi

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/tarisrizki/SiapKredit.git
   cd SiapKredit
   ```

2. **Instal dependensi proyek**
   ```bash
   npm install
   ```

3. **Konfigurasi Kunci API (Untuk Fitur Konsultan AI)**
   - Buat file bernama `.env` di direktori utama (sejajar dengan `package.json`).
   - Dapatkan kunci API secara gratis di [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Masukkan konfigurasi berikut ke dalam file `.env`:
     ```env
     VITE_GEMINI_API_KEY=KUNCI_API_ANDA_DISINI
     ```

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

5. **Akses Aplikasi**
   Buka `http://localhost:5173` di browser Anda.

## Lisensi & Kontribusi

Proyek ini dibuat dan dikembangkan sebagai wujud dedikasi untuk mempercepat digitalisasi UMKM di Indonesia. 
Hak Cipta (c) 2026 **tarisrizki**.
