import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { TrendingUp, MessageSquare, PieChart, ShieldCheck } from 'lucide-react';

export function Landing() {
  const { state } = useAppContext();

  // Jika sudah onboard, landing page ini sebenernya bisa di redirect ke dashboard, 
  // tapi kita sediakan versi marketing sebentar jika user kesini.
  if (state.ui.isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-brand-50 pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center justify-center p-3 bg-brand-100 rounded-2xl mb-8">
            <TrendingUp size={40} className="text-brand-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Rekam jejak keuangan UMKM <br className="hidden md:block"/> menuju kredit formal
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-600 mx-auto mb-10">
            Bukan hanya mencatat transaksi — SiapKredit membantu Anda mengukur kesiapan dan memenuhi syarat pinjaman bank seperti KUR.
          </p>
          <div className="flex justify-center gap-4">
             {/* Note: In real app, clicking this would open Onboarding. 
                 But since OnboardingGate intercepts everything if !isOnboarded, 
                 it will already be showing. This page only shows if Onboarding is closed,
                 which shouldn't happen. Let's just make it a static hero. */}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 flex items-center justify-center rounded-2xl mb-6">
                <MessageSquare size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Input Semudah Chatting</h3>
              <p className="text-gray-600">Catat "Jual 5 porsi soto @15rb" dan AI kami akan merapikannya menjadi laporan keuangan standar.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 flex items-center justify-center rounded-2xl mb-6">
                <PieChart size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Laporan Otomatis</h3>
              <p className="text-gray-600">Pantau laba rugi, tren pemasukan, dan arus kas harian tanpa perlu mengerti akuntansi.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 flex items-center justify-center rounded-2xl mb-6">
                <ShieldCheck size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Skor Kesiapan Kredit</h3>
              <p className="text-gray-600">Ketahui apakah usaha Anda sudah memenuhi kriteria untuk mengajukan KUR di Bank.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
