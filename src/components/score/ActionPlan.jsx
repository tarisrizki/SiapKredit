import React from 'react';
import { Card } from '../ui/Card';
import { Trophy, TrendingUp, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ActionPlan({ scoreResult, dokumen, profil }) {
  // Generate dynamic action plan based on missing criteria
  const actions = [];

  if (!dokumen.nib) {
    actions.push({
      id: 'buat_nib',
      icon: Trophy,
      title: 'Buat NIB di oss.go.id',
      impact: '+10 poin',
      desc: 'Gratis, online, hanya butuh KTP. Syarat mutlak untuk semua pengajuan KUR.',
      actionText: 'Lihat Panduan',
      link: '/dokumen'
    });
  }

  if (scoreResult.breakdown.catatan < 15) {
     actions.push({
      id: 'catat_6_bulan',
      icon: TrendingUp,
      title: 'Catat transaksi rutin 6 bulan',
      impact: '+15 poin',
      desc: 'Bank mensyaratkan laporan keuangan minimal 6 bulan berturut-turut.',
      actionText: 'Input Transaksi',
      link: '/input'
    });
  }

  if (!dokumen.npwp) {
     actions.push({
      id: 'buat_npwp',
      icon: FileText,
      title: 'Buat NPWP',
      impact: '+5 poin',
      desc: 'Wajib untuk pengajuan KUR Kecil (di atas Rp 50 Juta).',
      actionText: 'Lihat Panduan',
      link: '/dokumen'
    });
  }

  if (!profil.keuanganTerpisah) {
     actions.push({
      id: 'pisah_keuangan',
      icon: AlertCircle,
      title: 'Buka rekening bank terpisah khusus usaha',
      impact: '+3 poin',
      desc: 'Memperkuat kelayakan Anda di mata mantri bank saat survei.',
      actionText: 'Ubah Profil',
      link: '/profil'
    });
  }

  if (actions.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Action Plan "Naik Kelas"</h3>
        <Card className="bg-success-50 border-success-200 text-center py-8">
          <Trophy size={40} className="mx-auto text-success-500 mb-3" />
          <h4 className="font-bold text-success-800 mb-1">Semua aksi utama sudah selesai!</h4>
          <p className="text-success-600 text-sm">Pertahankan konsistensi pencatatan transaksi Anda.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Lakukan ini untuk meningkatkan skor Anda</h3>
      <div className="space-y-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm hover:border-brand-300 transition-colors">
              <div className="bg-brand-50 p-3 rounded-lg self-start sm:self-center">
                <Icon size={24} className="text-brand-600" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">{act.title}</h4>
                  <span className="text-xs font-bold text-success-600 bg-success-50 px-2 py-0.5 rounded-full border border-success-100">
                    {act.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{act.desc}</p>
              </div>
              <div className="mt-2 sm:mt-0">
                <Link to={act.link} className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors">
                  {act.actionText} <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
