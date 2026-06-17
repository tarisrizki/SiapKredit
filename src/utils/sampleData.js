// src/utils/sampleData.js
// 45 transaksi contoh Warung Bu Siti (60 hari terakhir)

function generateTransactions() {
  const transactions = [];
  const now = new Date();
  
  // Randomizer uti
  const randomAmount = (min, max, step) => Math.floor((Math.random() * (max - min + 1) + min) / step) * step;
  
  let idCounter = 1;
  const getId = () => `sample-${idCounter++}-${Date.now()}`;
  
  for (let i = 60; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Setiap hari warung buka, ada penjualan
    if (Math.random() > 0.1) { // 90% chance buka tiap hari
      // Pemasukan harian 300k - 800k
      transactions.push({
        id: getId(),
        type: 'pemasukan',
        amount: randomAmount(300000, 800000, 10000),
        category: 'Penjualan',
        description: 'Penjualan warung harian',
        date: dateStr,
        createdAt: d.getTime(),
        isManual: false
      });
    }

    // Belanja bahan (HPP) setiap 2-3 hari
    if (i % 3 === 0) {
      transactions.push({
        id: getId(),
        type: 'pengeluaran',
        amount: randomAmount(150000, 300000, 5000),
        category: 'HPP',
        description: 'Belanja sayur, lauk pauk, bumbu pasar',
        date: dateStr,
        createdAt: d.getTime() + 1000,
        isManual: false
      });
    }

    // Beli gas/air per minggu
    if (i % 7 === 0) {
      transactions.push({
        id: getId(),
        type: 'pengeluaran',
        amount: 80000,
        category: 'Operasional',
        description: 'Beli 4 tabung gas 3kg',
        date: dateStr,
        createdAt: d.getTime() + 2000,
        isManual: false
      });
    }

    // Gaji bulanan
    if (d.getDate() === 25) { // Gaji karyawan tgl 25
       transactions.push({
        id: getId(),
        type: 'pengeluaran',
        amount: 1500000,
        category: 'Gaji',
        description: 'Gaji karyawan (Mbak Nur)',
        date: dateStr,
        createdAt: d.getTime() + 3000,
        isManual: false
      });
    }

    // Listrik bulanan
    if (d.getDate() === 5) {
       transactions.push({
        id: getId(),
        type: 'pengeluaran',
        amount: 250000,
        category: 'Operasional',
        description: 'Bayar token listrik warung',
        date: dateStr,
        createdAt: d.getTime() + 4000,
        isManual: false
      });
    }
  }

  return transactions;
}

export const sampleTransactions = generateTransactions();

export const sampleProfile = {
  namaUsaha: 'Warung Makan Bu Siti',
  jenisUsaha: 'Makanan & Minuman',
  lamaUsaha: '1–2 tahun', // 14 bulan
  kota: 'Bandung',
  omsetPerBulan: '5–20 juta',
  keuanganTerpisah: false,
  setupDone: true,
};

export const sampleDocuments = {
  ktp: true,
  kk: true,
  nib: false,
  npwp: false,
  fotoUsaha: true,
  rekeningBank: true,
  bpjsTK: false,
};
