import React from 'react';
import { Card } from '../ui/Card';
import { GaugeChart } from '../ui/GaugeChart';

export function ScoreHeader({ score, tier }) {
  return (
    <Card className="text-center bg-white border-brand-100 shadow-sm relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-brand-50 to-white -z-10" />
      
      <h2 className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-6">Skor Kesiapan Kredit Anda</h2>
      
      <div className="flex justify-center mb-2">
        <GaugeChart score={score} tier={tier} />
      </div>
      
      <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${tier.bg} ${tier.color} font-bold text-lg mb-6 border border-current/20 shadow-sm`}>
        <span>{tier.label}</span>
      </div>
      
      <div className="max-w-xl mx-auto">
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {score <= 30 && "Anda belum memenuhi syarat dasar untuk mengajukan KUR. Ikuti panduan di bawah untuk mulai mempersiapkan usaha Anda."}
          {score > 30 && score <= 50 && "Anda mulai membangun rekam jejak. Bisa mencoba KUR Mikro, namun akan lebih kuat jika Anda melengkapi dokumen dan catatan."}
          {score > 50 && score <= 70 && "Selamat! Anda memenuhi kriteria untuk KUR Mikro dan memiliki peluang awal untuk KUR Kecil (hingga Rp 500 Juta)."}
          {score > 70 && score <= 85 && "Sangat Bagus! Profil Anda sangat meyakinkan untuk mendapatkan KUR Kecil dan bersiap ke kredit komersial."}
          {score > 85 && "Luar Biasa! Usaha Anda bankable dan siap untuk mengakses fasilitas kredit komersial perbankan mana pun."}
        </p>
      </div>
    </Card>
  );
}
