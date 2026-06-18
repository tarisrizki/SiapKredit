import React from 'react';
import { Card } from '../components/ui/Card';

export function PanduanKUR() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Panduan Pinjam Bank</h1>
        <p className="text-base text-muted-foreground">Kredit Usaha Rakyat (KUR)</p>
      </div>

      <div className="space-y-6">
        <Card className="p-5 rounded-2xl border bg-brand-50 border-brand-200 shadow-sm">
          <h2 className="text-xl font-bold text-brand-800 mb-3">Apa itu KUR?</h2>
          <p className="text-base text-brand-900 leading-relaxed font-medium">
            KUR adalah pinjaman modal dari bank yang disubsidi oleh pemerintah. Bunganya sangat kecil (biasanya hanya 6% per tahun atau 0.5% per bulan). Sangat cocok untuk warung atau usaha kecil.
          </p>
        </Card>

        <Card className="p-5 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3">Syarat Utama:</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 items-start">
              <div className="bg-primary text-primary-foreground font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base">1</div>
              <p className="text-base font-semibold text-foreground pt-1">Punya E-KTP dan Kartu Keluarga (KK)</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-primary text-primary-foreground font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base">2</div>
              <p className="text-base font-semibold text-foreground pt-1">Punya Izin Usaha (NIB) - Bisa diurus dari HP</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-primary text-primary-foreground font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base">3</div>
              <p className="text-base font-semibold text-foreground pt-1">Usaha sudah berjalan minimal 6 bulan</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-primary text-primary-foreground font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base">4</div>
              <p className="text-base font-semibold text-foreground pt-1">Tidak sedang punya hutang macet di bank lain (BI Checking Bersih)</p>
            </li>
          </ul>
        </Card>

        <Card className="p-5 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-3">Pilihan Pinjaman:</h2>
          
          <div className="space-y-3">
            <div className="bg-muted p-4 rounded-xl">
              <h3 className="text-lg font-bold text-foreground mb-1">KUR Mikro</h3>
              <p className="text-base text-muted-foreground font-medium mb-2">Pinjam hingga Rp 50 Juta</p>
              <div className="bg-success-100 text-success-800 font-bold px-3 py-1.5 rounded-lg inline-block text-xs">
                Tanpa Jaminan Tambahan
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-xl">
              <h3 className="text-lg font-bold text-foreground mb-1">KUR Kecil</h3>
              <p className="text-base text-muted-foreground font-medium mb-2">Pinjam Rp 50 - 500 Juta</p>
              <div className="bg-warning-100 text-warning-800 font-bold px-3 py-1.5 rounded-lg inline-block text-xs">
                Butuh NPWP & Jaminan (Sertifikat/BPKB)
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl border border-success-200 bg-success-50 text-center shadow-sm">
          <h2 className="text-xl font-bold text-success-800 mb-3">Langkah Selanjutnya</h2>
          <p className="text-base text-success-900 font-medium mb-4">
            Jika syarat Anda sudah lengkap di aplikasi ini, segera bawa dokumen Anda ke kantor cabang Bank terdekat (seperti BRI, Mandiri, atau BNI) dan bilang: <strong>"Saya mau mengajukan KUR"</strong>.
          </p>
        </Card>
      </div>
    </div>
  );
}
