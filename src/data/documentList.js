export const documentList = [
  {
    id: 'ktp',
    name: 'e-KTP (Kartu Tanda Penduduk)',
    poin: 5,
    syarat: 'Semua KUR',
    wajib: true,
    alasan: 'Identitas utama peminjam. Semua jenis KUR dan kredit bank membutuhkan e-KTP yang masih berlaku.',
    cara: 'Datang ke Kantor Dukcapil setempat dengan membawa surat pengantar RT/RW.',
    link: null
  },
  {
    id: 'kk',
    name: 'Kartu Keluarga (KK)',
    poin: 3,
    syarat: 'Semua KUR',
    wajib: true,
    alasan: 'Untuk memastikan susunan anggota keluarga dan status pernikahan calon debitur.',
    cara: 'Datang ke Kantor Dukcapil setempat. Pastikan data KTP dan KK sudah sinkron.',
    link: null
  },
  {
    id: 'nib',
    name: 'NIB (Nomor Induk Berusaha)',
    poin: 10,
    syarat: 'Semua KUR',
    wajib: true,
    alasan: 'NIB adalah bukti legalitas usaha yang WAJIB untuk semua pengajuan KUR. Pengganti Surat Keterangan Usaha (SKU).',
    cara: '1. Buka oss.go.id\n2. Daftar dengan NIK dan nomor HP\n3. Isi data usaha (nama, alamat, jenis usaha)\n4. NIB langsung terbit dalam 15 menit',
    link: 'https://oss.go.id'
  },
  {
    id: 'npwp',
    name: 'NPWP (Nomor Pokok Wajib Pajak)',
    poin: 5,
    syarat: 'KUR > Rp 50 Juta',
    wajib: false,
    alasan: 'Wajib dimiliki jika Anda ingin meminjam KUR lebih dari Rp 50.000.000 (KUR Kecil).',
    cara: 'Daftar secara online di ereg.pajak.go.id, ikuti petunjuk pengisian, lalu NPWP elektronik akan dikirim via email.',
    link: 'https://ereg.pajak.go.id'
  },
  {
    id: 'fotoUsaha',
    name: 'Foto Usaha',
    poin: 2,
    syarat: 'Semua KUR',
    wajib: false, // tapi disarankan
    alasan: 'Memperkuat bukti fisik saat survei oleh petugas bank bahwa usaha Anda benar-benar berjalan.',
    cara: 'Siapkan 3-5 foto yang jelas: foto tampak depan usaha (terlihat plang nama), foto aktivitas di dalam, dan foto stok barang.',
    link: null
  },
  {
    id: 'rekeningBank',
    name: 'Rekening Bank Aktif',
    poin: 3,
    syarat: 'Semua KUR',
    wajib: false, // biasa bank buatkan, tp bagus kl pny
    alasan: 'Untuk pencairan dana kredit dan membuktikan bahwa keuangan usaha Anda sudah terkelola dengan baik.',
    cara: 'Datang ke bank terdekat (disarankan bank yang akan dituju untuk KUR seperti BRI, Mandiri, atau BNI) dengan membawa KTP dan setoran awal.',
    link: null
  },
  {
    id: 'bpjsTK',
    name: 'BPJS Ketenagakerjaan',
    poin: 0,
    syarat: 'KUR > Rp 100 Juta',
    wajib: false,
    alasan: 'Syarat wajib berdasarkan Permenko Perekonomian terbaru untuk pengajuan KUR di atas Rp 100.000.000.',
    cara: 'Daftar online di website resmi BPJS Ketenagakerjaan melalui jalur Bukan Penerima Upah (BPU).',
    link: 'https://www.bpjsketenagakerjaan.go.id'
  }
];
