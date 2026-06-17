// src/utils/transactionParser.js

/**
 * Parses a natural language string into a structured transaction object.
 * @param {string} text 
 * @returns {Object|null}
 */
export function parseTransaction(text) {
  if (!text || text.trim() === '') return null;
  
  const lowerText = text.toLowerCase();
  
  // 1. Deteksi Tipe
  const keywordPemasukan = ['jual', 'laku', 'terjual', 'terima', 'dapat', 'masuk', 'dp dari', 'bayaran dari', 'pembayaran dari', 'untung', 'pendapatan', 'penghasilan'];
  const keywordPengeluaran = ['beli', 'bayar', 'keluar', 'biaya', 'cicilan', 'sewa', 'gaji', 'upah', 'transfer', 'kirim', 'belanja'];
  
  let type = 'pengeluaran'; // default
  let minIndexPemasukan = Infinity;
  let minIndexPengeluaran = Infinity;
  
  for (const kw of keywordPemasukan) {
    const idx = lowerText.indexOf(kw);
    if (idx !== -1 && idx < minIndexPemasukan) minIndexPemasukan = idx;
  }
  for (const kw of keywordPengeluaran) {
    const idx = lowerText.indexOf(kw);
    if (idx !== -1 && idx < minIndexPengeluaran) minIndexPengeluaran = idx;
  }
  
  if (minIndexPemasukan < minIndexPengeluaran) {
    type = 'pemasukan';
  } else if (minIndexPengeluaran < Infinity) {
    type = 'pengeluaran';
  } else if (minIndexPemasukan !== Infinity) {
    type = 'pemasukan';
  }

  // 2. Ekstrak Nominal
  let amount = 0;
  let unitPrice = 0;
  let quantity = 1;
  
  // Cek quantity (X barang @Y)
  const qtyMatch = lowerText.match(/(\d+)\s*(?:barang|pcs|buah|porsi|bungkus|botol)?\s*@/);
  if (qtyMatch) {
    quantity = parseInt(qtyMatch[1], 10);
  }

  // Cek @harga (spesifik)
  const atPriceMatch = lowerText.match(/@\s*(?:rp\.?\s*)?(\d+(?:[.,]\d+)*)\s*(ribu|rb|k|juta|jt)?/i);
  if (atPriceMatch) {
    let num = parseFloat(atPriceMatch[1].replace(/,/g, '.').replace(/\./g, '')); // Remove thousand separators if it was like 1.500
    if (atPriceMatch[1].includes(',') && atPriceMatch[1].split(',')[1].length < 3) {
      num = parseFloat(atPriceMatch[1].replace(',', '.'));
    }
    const suffix = atPriceMatch[2];
    if (suffix) {
      if (['ribu', 'rb', 'k'].includes(suffix.toLowerCase())) num *= 1000;
      else if (['juta', 'jt'].includes(suffix.toLowerCase())) num *= 1000000;
    } else {
       // logic angka mentah
       if (num <= 999 && num > 0 && atPriceMatch[1].indexOf('.') === -1) num *= 1000; // Asumsi ribu
    }
    unitPrice = num;
    amount = quantity * unitPrice;
  } else {
    // Regex 1: Rp 400.000
    const rpMatch = lowerText.match(/rp\s*(\d+(?:\.\d+)*)/i);
    // Regex 2: 1.5juta, 300rb
    const suffixMatch = lowerText.match(/(\d+(?:[.,]\d+)*)\s*(juta|jt|ribu|rb|k)/i);
    // Regex 3: angka mentah
    const rawMatch = lowerText.match(/(?<!@\s*)(\d{3,}(?:\.\d{3})*)/); 

    if (rpMatch) {
      amount = parseInt(rpMatch[1].replace(/\./g, ''), 10);
    } else if (suffixMatch) {
      let num = parseFloat(suffixMatch[1].replace(',', '.'));
      const suffix = suffixMatch[2].toLowerCase();
      if (['juta', 'jt'].includes(suffix)) amount = num * 1000000;
      else if (['ribu', 'rb', 'k'].includes(suffix)) amount = num * 1000;
    } else if (rawMatch) {
      let num = parseInt(rawMatch[1].replace(/\./g, ''), 10);
      if (num <= 999 && num > 0) num *= 1000;
      amount = num;
    }
  }

  if (amount === 0) return null; // Wajib ada nominal

  // 3. Deteksi Kategori
  const categories = {
    'Penjualan': ['kaos', 'baju', 'celana', 'dress', 'jilbab', 'sepatu', 'tas', 'aksesoris', 'nasi', 'mie', 'gorengan', 'kue', 'snack', 'makanan', 'minuman', 'es', 'kopi', 'barang', 'produk', 'dagangan', 'online', 'shopee', 'tokopedia'],
    'Jasa': ['jasa', 'service', 'servis', 'ongkos', 'cuci', 'laundry', 'salon', 'potong', 'cat', 'reparasi', 'bengkel', 'jahit', 'desain', 'cetak'],
    'HPP': ['bahan', 'material', 'stok', 'tepung', 'minyak', 'gula', 'daging', 'baku', 'kulakan', 'grosir', 'resupply'],
    'Operasional': ['listrik', 'air', 'gas', 'internet', 'wifi', 'telpon', 'hp', 'bensin', 'bbm', 'pertamax', 'parkir', 'kardus', 'plastik', 'alat', 'perlengkapan'],
    'Gaji': ['gaji', 'upah', 'tukang', 'karyawan', 'pegawai', 'honor', 'honorarium'],
    'Sewa': ['sewa', 'kontrakan', 'kios', 'lapak', 'stan', 'booth', 'tempat', 'ruko'],
    'Cicilan': ['cicilan', 'angsuran', 'kredit', 'kur', 'pinjaman']
  };

  let category = type === 'pemasukan' ? 'Penjualan' : 'Lain-lain';
  for (const [catName, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => lowerText.includes(kw))) {
      category = catName;
      break;
    }
  }
  
  if (type === 'pemasukan' && !['Penjualan', 'Jasa', 'Lain-lain'].includes(category)) {
      category = 'Penjualan'; // fallback if weird
  }

  // 4. Deteksi Tanggal
  let dateObj = new Date();
  if (lowerText.includes('kemarin')) {
    dateObj.setDate(dateObj.getDate() - 1);
  } else if (lowerText.includes('minggu lalu')) {
    dateObj.setDate(dateObj.getDate() - 7);
  } else {
    // cek format DD/MM (simple parsing)
    const dateMatch = lowerText.match(/(\d{1,2})\/(\d{1,2})/);
    if (dateMatch) {
      dateObj.setMonth(parseInt(dateMatch[2], 10) - 1);
      dateObj.setDate(parseInt(dateMatch[1], 10));
    }
  }

  // YYYY-MM-DD
  const dateStr = dateObj.toISOString().split('T')[0];

  let confidence = 'high';
  if (amount < 1000) confidence = 'low';
  if (type === 'pengeluaran' && category === 'Lain-lain') confidence = 'medium';

  // Format Description (capitalize first letter)
  const description = text.charAt(0).toUpperCase() + text.slice(1);

  return {
    success: true,
    type,
    amount,
    category,
    description,
    date: dateStr,
    confidence
  };
}
