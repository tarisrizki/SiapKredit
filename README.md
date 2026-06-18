# SiapKredit

**SiapKredit** adalah aplikasi berbasis web modern yang dirancang khusus untuk membantu **UMKM Indonesia** mencatat keuangan dengan mudah, menganalisis kelayakan kredit, dan mempersiapkan dokumen untuk pengajuan Kredit Usaha Rakyat (KUR).

## Fitur Utama

- **Input Transaksi Natural & Profesional**: Tersedia **Mode Simple** dengan antarmuka kalkulator/numpad besar yang sangat intuitif untuk mencatat uang masuk/keluar dalam hitungan detik, serta **Mode Pro** untuk pencatatan jurnal detail (tanggal spesifik, kategorisasi kustom, dan deskripsi khusus).
- **Dashboard Keuangan & Laporan Cetak**: Menyajikan visualisasi arus kas bulanan (Bar Chart), proporsi pengeluaran (Pie Chart), serta rekap Laba/Rugi yang dapat langsung dicetak (PDF) untuk dilampirkan ke pihak bank.
- **Simulasi Skor Kredit**: Sistem cerdas yang menghitung skor kelayakan UMKM untuk mengajukan pinjaman berdasarkan riwayat omset, laba operasional, usia usaha, dan validasi kelengkapan dokumen.
- **Konsultan AI Terintegrasi**: Didukung teknologi Google Gemini 2.5 Flash, fitur ini menganalisis seluruh data keuangan dan memberikan surat rekomendasi konkret langkah apa saja yang harus dilakukan untuk meningkatkan persetujuan bank.
- **Manajemen Dokumen**: Ceklis interaktif yang mengorganisir dokumen wajib dan pendukung perbankan seperti e-KTP, Kartu Keluarga (KK), NIB (sebagai pengganti SKU), NPWP, hingga BPJS Ketenagakerjaan agar tersusun rapi.
- **Panduan Pinjaman KUR**: Modul edukasi terintegrasi yang menjelaskan perbedaan jenis-jenis KUR (Super Mikro, Mikro, Kecil) beserta syarat pendaftaran lengkapnya.
- **Real-time Database & Autentikasi (Supabase)**: Tersinkronisasi penuh dengan Supabase (PostgreSQL) menggunakan sistem otentikasi aman tanpa batas. Data transaksi, profil, dan dokumen pengguna tidak akan hilang meskipun berpindah perangkat (Cloud-First).

## Teknologi yang Digunakan

- **Frontend Framework**: React.js (Vite)
- **Styling**: Tailwind CSS & Framer Motion (Glassmorphism & Fluid UI)
- **Icons**: Lucide React
- **Backend as a Service (BaaS)**: Supabase (PostgreSQL, Authentication)
- **Artificial Intelligence**: Google Gemini API (Model 2.5 Flash)
- **State Management**: React Context API

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

3. **Konfigurasi Variabel Lingkungan (.env)**
   - Buat file bernama `.env` di direktori utama (sejajar dengan `package.json`).
   - Masukkan konfigurasi API Key Google Gemini (untuk fitur konsultan AI) dan kredensial Supabase (untuk database & login).
   - Dapatkan kunci Gemini di [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Masukkan konfigurasi berikut:
     ```env
     VITE_GEMINI_API_KEY=KUNCI_GEMINI_ANDA
     
     VITE_SUPABASE_URL=URL_SUPABASE_ANDA
     VITE_SUPABASE_ANON_KEY=KUNCI_ANON_SUPABASE_ANDA
     VITE_SUPABASE_SERVICE_ROLE_KEY=KUNCI_SERVICE_ROLE_SUPABASE_ANDA
     ```

4. **Konfigurasi Database Supabase**
   - Pastikan Anda telah menjalankan skrip SQL yang ada pada `database_schema.sql` di SQL Editor Supabase Anda untuk membuat tabel (Profil, Dokumen, Transaksi) beserta pengaturan RLS (*Row Level Security*).

5. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

6. **Akses Aplikasi**
   Buka `http://localhost:5173` di browser Anda.
