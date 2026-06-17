import React from 'react';
import { formatRupiah, formatTanggalPanjang } from '../../utils/formatters';

export function PrintableReport({ data, profil, periodLabel }) {
  if (!data || data.length === 0) return null;

  const totalPemasukan = data.filter(t => t.type === 'pemasukan').reduce((sum, t) => sum + t.amount, 0);
  const totalPengeluaran = data.filter(t => t.type === 'pengeluaran').reduce((sum, t) => sum + t.amount, 0);
  const laba = totalPemasukan - totalPengeluaran;

  return (
    <div className="hidden print:block w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-1">{profil.namaUsaha || 'Laporan Keuangan'}</h1>
        <p className="text-gray-600">Periode: {periodLabel}</p>
        <p className="text-sm text-gray-500 mt-2">Dicetak pada: {formatTanggalPanjang(new Date().toISOString())}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-gray-300 p-4 rounded-lg text-center">
           <h3 className="text-gray-500 font-medium mb-1">Total Pemasukan</h3>
           <p className="text-xl font-bold text-gray-900">{formatRupiah(totalPemasukan)}</p>
        </div>
        <div className="border border-gray-300 p-4 rounded-lg text-center">
           <h3 className="text-gray-500 font-medium mb-1">Total Pengeluaran</h3>
           <p className="text-xl font-bold text-gray-900">{formatRupiah(totalPengeluaran)}</p>
        </div>
        <div className="border border-gray-300 p-4 rounded-lg text-center">
           <h3 className="text-gray-500 font-medium mb-1">Laba Bersih</h3>
           <p className="text-xl font-bold text-gray-900">{formatRupiah(laba)}</p>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-4">Rincian Transaksi</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="py-2 px-1 font-semibold text-gray-700">Tanggal</th>
            <th className="py-2 px-1 font-semibold text-gray-700">Keterangan</th>
            <th className="py-2 px-1 font-semibold text-gray-700">Kategori</th>
            <th className="py-2 px-1 font-semibold text-gray-700 text-right">Pemasukan</th>
            <th className="py-2 px-1 font-semibold text-gray-700 text-right">Pengeluaran</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.map((trx) => (
            <tr key={trx.id} className="border-b border-gray-200">
              <td className="py-2 px-1">{formatTanggalPanjang(trx.date)}</td>
              <td className="py-2 px-1">{trx.description}</td>
              <td className="py-2 px-1">{trx.category}</td>
              <td className="py-2 px-1 text-right">{trx.type === 'pemasukan' ? formatRupiah(trx.amount) : '-'}</td>
              <td className="py-2 px-1 text-right">{trx.type === 'pengeluaran' ? formatRupiah(trx.amount) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
