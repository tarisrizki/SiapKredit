import React from 'react';
import { Card } from '../ui/Card';
import { CheckCircle, Lock, ExternalLink } from 'lucide-react';

export function BankRecommendation({ score, dokumen }) {
  
  const recommendations = [
    {
      id: 'kur_mikro',
      name: 'KUR Mikro BRI / Mandiri',
      desc: 'Maks Rp 50 juta | Bunga 6%/thn',
      isOpen: score >= 31,
      syarat: [
        { label: 'KTP', done: dokumen.ktp },
        { label: 'KK', done: dokumen.kk },
        { label: 'NIB', done: dokumen.nib },
        { label: 'Usaha 6 bln', done: score >= 31 } // Simplified logic
      ],
      link: 'https://kur.bri.co.id'
    },
    {
      id: 'kur_kecil',
      name: 'KUR Kecil',
      desc: 'Rp 50 - 500 juta | Bunga 6%/thn',
      isOpen: score > 50 && dokumen.nib && dokumen.npwp,
      syarat: [
        { label: 'KTP & KK', done: dokumen.ktp && dokumen.kk },
        { label: 'NIB', done: dokumen.nib },
        { label: 'NPWP', done: dokumen.npwp },
        { label: 'Skor >50', done: score > 50 }
      ],
      link: null
    }
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Rekomendasi Produk Bank</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map(rec => (
          <Card key={rec.id} className={`border ${rec.isOpen ? 'border-success-200 bg-success-50/30' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {rec.isOpen ? (
                  <CheckCircle size={20} className="text-success-600" />
                ) : (
                  <Lock size={20} className="text-gray-400" />
                )}
                <h4 className="font-bold text-gray-900">{rec.name}</h4>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${rec.isOpen ? 'bg-success-100 text-success-700' : 'bg-gray-200 text-gray-600'}`}>
                {rec.isOpen ? 'TERBUKA' : 'HAMPIR BISA'}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{rec.desc}</p>
            
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-1.5">Syarat Utama:</p>
              <div className="flex flex-wrap gap-1.5">
                {rec.syarat.map(s => (
                  <span key={s.label} className={`text-xs px-2 py-0.5 rounded-full border ${s.done ? 'bg-success-50 border-success-200 text-success-700' : 'bg-white border-gray-200 text-gray-500'}`}>
                    {s.label} {s.done ? '✓' : '✗'}
                  </span>
                ))}
              </div>
            </div>
            
            {rec.isOpen && rec.link && (
              <a href={rec.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-800">
                Info Lengkap <ExternalLink size={14} className="ml-1" />
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
