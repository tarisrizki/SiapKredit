import React from 'react';
import { kurProducts } from '../data/kurInfo';
import { Card } from '../components/ui/Card';
import { ExternalLink, AlertTriangle, HelpCircle } from 'lucide-react';

export function PanduanKUR() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Panduan Lengkap KUR</h1>
        <p className="text-gray-500 text-sm mt-1">Kredit Usaha Rakyat (KUR) adalah program prioritas pemerintah dalam mendukung UMKM.</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Perbandingan Produk Kredit</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700">Produk</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Plafon</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Bunga</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Jaminan / Agunan</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {kurProducts.map((p, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50/50">
                  <td className="py-4 px-4 font-medium text-gray-900">{p.name}</td>
                  <td className="py-4 px-4 text-gray-700">{p.plafon}</td>
                  <td className="py-4 px-4 text-gray-700">{p.bunga}</td>
                  <td className="py-4 px-4 text-gray-700">{p.agunan}</td>
                </tr>
              ))}
              <tr className="border-b border-gray-200 hover:bg-gray-50/50">
                  <td className="py-4 px-4 font-medium text-gray-900">Kredit Komersial</td>
                  <td className="py-4 px-4 text-gray-700">&gt; Rp 500 Juta</td>
                  <td className="py-4 px-4 text-gray-700">6–12%/thn (pasar)</td>
                  <td className="py-4 px-4 text-gray-700">Wajib + Laporan Keuangan Audited</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Langkah Pengajuan KUR</h2>
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          
          {[
            { title: "Cek Skor Kesiapan", desc: "Pastikan skor Anda di SiapKredit minimal 'Mulai Siap' (31+) untuk KUR Mikro." },
            { title: "Siapkan Dokumen", desc: "Siapkan KTP, KK, NIB, dan riwayat transaksi minimal 6 bulan." },
            { title: "Cek Riwayat Kredit (SLIK)", desc: "Pastikan Anda tidak memiliki kredit macet atau sedang menerima kredit produktif lain." },
            { title: "Ajukan ke Bank Penyalur", desc: "Datang ke cabang terdekat atau daftar online di website resmi bank." },
            { title: "Survei Lokasi", desc: "Petugas bank (mantri) akan datang untuk memverifikasi usaha Anda." },
            { title: "Pencairan Dana", desc: "Jika disetujui (biasanya 3-14 hari kerja), dana akan dicairkan ke rekening usaha Anda." }
          ].map((step, idx) => (
             <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
             </div>
          ))}

        </div>
      </div>

      <Card className="bg-warning-50 border-warning-200 mb-8">
        <div className="flex gap-3">
          <AlertTriangle className="text-warning-600 shrink-0 mt-0.5" size={24} />
          <div>
            <h3 className="font-bold text-warning-800 mb-1">Penting: SLIK OJK (BI Checking)</h3>
            <p className="text-warning-700 text-sm leading-relaxed mb-3">
              Bank akan mengecek riwayat kredit Anda melalui SLIK OJK (Sistem Layanan Informasi Keuangan). Pastikan tidak ada kredit macet sebelumnya. Jika Anda sedang menerima fasilitas kredit produktif dari bank lain, pengajuan KUR umumnya akan ditolak.
            </p>
            <a 
              href="https://idebku.ojk.go.id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-bold text-warning-800 hover:text-warning-900"
            >
              Cek riwayat Anda di iDebku.ojk.go.id <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Portal Pengajuan Bank Penyalur Utama</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="https://kur.bri.co.id" target="_blank" rel="noopener noreferrer" className="p-4 border border-gray-200 rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors flex items-center justify-between">
            <span className="font-bold text-gray-900">KUR BRI</span>
            <ExternalLink size={16} className="text-gray-400" />
          </a>
          <a href="https://bmri.id/kur" target="_blank" rel="noopener noreferrer" className="p-4 border border-gray-200 rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors flex items-center justify-between">
            <span className="font-bold text-gray-900">KUR Mandiri</span>
            <ExternalLink size={16} className="text-gray-400" />
          </a>
          <a href="https://www.bni.co.id/id-id/beranda/kreditpengusaha/kur" target="_blank" rel="noopener noreferrer" className="p-4 border border-gray-200 rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors flex items-center justify-between">
            <span className="font-bold text-gray-900">KUR BNI</span>
            <ExternalLink size={16} className="text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
