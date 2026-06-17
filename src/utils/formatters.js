// src/utils/formatters.js

// Rupiah: 1500000 → "Rp 1.500.000"
export function formatRupiah(angka) {
  return 'Rp ' + Math.round(angka).toLocaleString('id-ID');
}

// Tanggal panjang: "2026-06-18" → "18 Juni 2026"
export function formatTanggalPanjang(isoDate) {
  if (!isoDate) return '';
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni',
                 'Juli','Agustus','September','Oktober','November','Desember'];
  const d = new Date(isoDate);
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

// Tanggal singkat: "2026-06-18" → "18 Jun"
export function formatTanggalSingkat(isoDate) {
  if (!isoDate) return '';
  const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  const d = new Date(isoDate);
  return `${d.getDate()} ${bulan[d.getMonth()]}`;
}

// Selisih hari: "3 hari lalu", "kemarin", "hari ini"
export function formatRelative(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  const now = new Date();
  const diffTime = Math.abs(now - d);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // Normalized to local dates to compare calendar days
  const dDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const calendarDiff = Math.round((nowDate - dDate) / (1000 * 60 * 60 * 24));

  if (calendarDiff === 0) return 'Hari ini';
  if (calendarDiff === 1) return 'Kemarin';
  if (calendarDiff < 7) return `${calendarDiff} hari lalu`;
  return formatTanggalSingkat(isoDate);
}

// Singkat nominal: 1500000 → "1,5 jt" | 400000 → "400 rb"
export function formatSingkat(angka) {
  if (angka >= 1_000_000) return (angka / 1_000_000).toFixed(1).replace('.0', '') + ' jt';
  if (angka >= 1_000) return (angka / 1_000).toFixed(0) + ' rb';
  return String(angka);
}
