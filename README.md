# SiapKredit 🚀

**SiapKredit** adalah sebuah aplikasi berbasis web modern yang dirancang khusus untuk membantu **UMKM Indonesia** mencatat keuangan dengan sangat mudah (semudah *chatting*), menganalisis kelayakan kredit, dan mempersiapkan dokumen untuk pengajuan Kredit Usaha Rakyat (KUR).

## ✨ Fitur Unggulan

- 💬 **Input Semudah Chatting (Mode Simple)**: UMKM tidak perlu mengerti akuntansi. Cukup ketik "Jual 5 porsi soto @15rb", dan sistem akan otomatis memecahnya menjadi laporan keuangan yang rapi.
- ⚙️ **Mode Profesional**: Bagi UMKM yang sudah lebih berkembang, tersedia mode *Pro* untuk input transaksi detail (pemasukan, pengeluaran, transfer).
- 📊 **Laporan & Dasbor Otomatis**: Laporan Laba/Rugi, Arus Kas, dan Tren Pemasukan harian dihitung secara otomatis dan dapat langsung dicetak (Print/PDF) untuk diberikan ke pihak Bank.
- 🏆 **Skor Kesiapan Bank (KUR)**: Menghitung secara cerdas seberapa siap UMKM untuk mengajukan pinjaman berdasarkan standar nyata perbankan (Omset, Laba, Usia Usaha, kelengkapan NIB/NPWP).
- 🤖 **Konsultan AI Pribadi (Powered by Gemini 2.5)**: Memberikan analisis mendalam, tingkat probabilitas lolos pinjaman, dan langkah konkret yang harus dilakukan UMKM untuk memperbaiki profil keuangan mereka berdasarkan data transaksi riil.
- 📄 **Ceklis Dokumen Otomatis**: Memastikan UMKM tidak akan ditolak bank hanya karena masalah administrasi.
- 🔒 **Offline-First & Aman**: Seluruh data transaksi disimpan di *local storage* perangkat pengguna. Tidak ada data finansial yang dikirim ke server luar (kecuali teks anonim saat meminta analisis AI).

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework**: React.js (Vite)
- **Styling**: Tailwind CSS & Framer Motion (Glassmorphism & Fluid UI)
- **Icons**: Lucide React
- **Kecerdasan Buatan (AI)**: Google Gemini 2.5 Flash API
- **State Management**: React Context API
- **Persistensi Data**: Local Storage API

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/tarisrizki/SiapKredit.git
   cd SiapKredit
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi API Key (Untuk Fitur Konsultan AI)**
   - Buat file baru bernama `.env` di direktori utama (sejajar dengan `package.json`).
   - Dapatkan API Key gratis di [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Masukkan ke dalam file `.env`:
     ```env
     VITE_GEMINI_API_KEY=AIzaSy_KUNCI_API_ANDA_DISINI
     ```

4. **Jalankan *Development Server***
   ```bash
   npm run dev
   ```

5. **Buka di Browser**
   Buka `http://localhost:5173` di *browser* Anda.

## 👥 Kontribusi & Lisensi

Dibuat dengan dedikasi penuh untuk mendigitalkan UMKM Indonesia. 
Hak Cipta &copy; 2026 **tarisrizki**.
