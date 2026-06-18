import React from 'react';
import { useScore } from '../hooks/useScore';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { AIKonsultasi } from '../components/score/AIKonsultasi';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SkorKredit() {
  const scoreResult = useScore();
  const { state } = useAppContext();

  // Tier logic mapping for simple language
  let badgeColor = "bg-danger-500";
  let statusText = "BELUM SIAP";
  let descText = "Bank kemungkinan besar akan menolak pengajuan pinjaman Anda. Lengkapi syarat di bawah ini.";
  
  if (scoreResult.total > 70) {
    badgeColor = "bg-success-500";
    statusText = "SANGAT SIAP";
    descText = "Luar biasa! Dokumen dan catatan Anda sudah memenuhi syarat Bank. Silakan datangi Bank terdekat.";
  } else if (scoreResult.total > 40) {
    badgeColor = "bg-warning-500";
    statusText = "LUMAYAN SIAP";
    descText = "Anda sudah di jalan yang benar, tapi masih ada beberapa syarat yang harus dilengkapi agar Bank lebih percaya.";
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Peluang Pinjam Bank</h1>
        <p className="text-base text-muted-foreground">Apakah Anda sudah siap mengajukan KUR?</p>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className={`p-6 rounded-2xl border-2 ${statusText === 'SANGAT SIAP' ? 'border-success-500 bg-success-50' : statusText === 'LUMAYAN SIAP' ? 'border-warning-500 bg-warning-50' : 'border-danger-500 bg-danger-50'} text-center mb-6 shadow-sm`}>
          <div className="text-6xl font-black leading-none mb-3">{scoreResult.total}</div>
          <div className="text-muted-foreground text-lg font-semibold mb-5">Nilai Anda (Dari 100)</div>
          
          <div className={`${badgeColor} text-white text-xl font-bold px-4 py-2 rounded-full inline-block mb-3 shadow-sm`}>
            {statusText}
          </div>
          <p className="text-base font-medium opacity-90 px-2">
            {descText}
          </p>
        </Card>
      </motion.div>

      <h2 className="text-xl font-bold text-foreground mb-4">Yang Harus Anda Lakukan:</h2>

      <div className="space-y-4">
        {/* Tugas 1: NIB */}
        {!state.dokumen.nib ? (
          <Card className="p-5 rounded-xl border border-danger-200 bg-white flex gap-3 items-start shadow-sm">
            <AlertCircle className="text-danger-500 shrink-0 mt-0.5" size={24} />
            <div className="w-full">
              <h3 className="text-lg font-bold text-foreground mb-1">Buat Surat Izin Usaha (NIB)</h3>
              <p className="text-sm text-muted-foreground mb-3">Bank tidak akan meminjamkan uang jika usaha tidak punya izin legal. Gratis dan bisa lewat HP.</p>
              <Link to="/dokumen" className="inline-block bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg text-base w-full text-center">
                Lihat Cara Buat NIB
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-4 rounded-xl border border-success-500 bg-success-50 flex gap-3 items-center">
            <CheckCircle2 className="text-success-500 shrink-0" size={32} />
            <h3 className="text-lg font-bold text-success-800">Izin Usaha (NIB) Beres!</h3>
          </Card>
        )}

        {/* Tugas 2: Catatan Keuangan */}
        {scoreResult.breakdown.catatan < 15 ? (
          <Card className="p-5 rounded-xl border border-danger-200 bg-white flex gap-3 items-start shadow-sm">
            <AlertCircle className="text-danger-500 shrink-0 mt-0.5" size={24} />
            <div className="w-full">
              <h3 className="text-lg font-bold text-foreground mb-1">Rajin Catat Uang Masuk/Keluar</h3>
              <p className="text-sm text-muted-foreground mb-3">Bank ingin melihat bukti bahwa jualan Anda benar-benar menghasilkan uang tiap bulan.</p>
              <Link to="/input" className="inline-block bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg text-base w-full text-center">
                Mulai Catat Uang
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-4 rounded-xl border border-success-500 bg-success-50 flex gap-3 items-center">
            <CheckCircle2 className="text-success-500 shrink-0" size={32} />
            <h3 className="text-lg font-bold text-success-800">Catatan Keuangan Bagus!</h3>
          </Card>
        )}

        {/* Tugas 3: Rekening Bank */}
        {!state.profil.keuanganTerpisah ? (
          <Card className="p-5 rounded-xl border border-warning-200 bg-white flex gap-3 items-start shadow-sm">
            <AlertCircle className="text-warning-500 shrink-0 mt-0.5" size={24} />
            <div className="w-full">
              <h3 className="text-lg font-bold text-foreground mb-1">Pisahkan Uang Pribadi & Usaha</h3>
              <p className="text-sm text-muted-foreground mb-3">Jangan campur uang belanja dapur dengan modal warung. Buatlah rekening terpisah khusus warung.</p>
              <Link to="/profil" className="inline-block bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg text-base w-full text-center">
                Ubah Profil Saya
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-4 rounded-xl border border-success-500 bg-success-50 flex gap-3 items-center">
            <CheckCircle2 className="text-success-500 shrink-0" size={32} />
            <h3 className="text-lg font-bold text-success-800">Uang Usaha Terpisah Beres!</h3>
          </Card>
        )}
      </div>

      <AIKonsultasi />
    </div>
  );
}
