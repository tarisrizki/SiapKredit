# SiapKredit

**SiapKredit** adalah aplikasi berbasis web modern yang dirancang khusus untuk membantu **UMKM Indonesia** mencatat keuangan dengan mudah, menganalisis kelayakan kredit, dan mempersiapkan dokumen untuk pengajuan Kredit Usaha Rakyat (KUR).

## Fitur Utama

- **Input Transaksi Natural & Profesional**: Tersedia Mode Simple untuk mencatat semudah melakukan *chatting* ("Jual soto 15rb"), serta Mode Pro untuk input detail (kategorisasi, tanggal, dan deskripsi khusus).
- **Dashboard Keuangan & Laporan Cetak**: Menyajikan visualisasi arus kas bulanan (Bar Chart), proporsi pengeluaran (Pie Chart), serta rekap Laba/Rugi yang dapat langsung dicetak (PDF) untuk dilampirkan ke pihak bank.
- **Simulasi Skor Kredit**: Sistem cerdas yang menghitung skor kelayakan UMKM untuk mengajukan pinjaman berdasarkan riwayat omset, laba operasional, usia usaha, dan validasi kelengkapan dokumen.
- **Konsultan AI Terintegrasi**: Didukung teknologi Google Gemini 2.5 Flash, fitur ini menganalisis seluruh data keuangan dan memberikan surat rekomendasi konkret langkah apa saja yang harus dilakukan untuk meningkatkan persetujuan bank.
- **Manajemen Dokumen**: Ceklis interaktif yang mengorganisir dokumen wajib perbankan seperti NIB, NPWP, KTP, dan SKU agar tersusun rapi.
- **Panduan Pinjaman KUR**: Modul edukasi terintegrasi yang menjelaskan perbedaan jenis-jenis KUR (Super Mikro, Mikro, Kecil) beserta syarat pendaftaran lengkapnya.
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
