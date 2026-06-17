import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto no-print">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Tentang SiapKredit</h3>
          <p className="mt-4 text-base text-gray-500">
            SiapKredit — Membantu UMKM Indonesia naik kelas melalui literasi keuangan dan kesiapan kredit bank.
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0 space-y-1">
            <p className="font-medium text-gray-900">Referensi Data:</p>
            <p>• Jumlah & kontribusi UMKM: Kementerian Koperasi dan UKM (2024)</p>
            <p>• Akses pembiayaan: Pusat Investasi Pemerintah, Kemenkeu</p>
            <p>• Legalitas UMKM: Deputi Bappenas (2024)</p>
            <p>• Porsi kredit UMKM: Bank Indonesia</p>
            <p>• Program KUR: Kemenko Perekonomian, BRI, Mandiri, BNI</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-sm">
            <p className="text-xs text-brand-700">
              <strong className="block mb-1">Catatan:</strong>
              Program KUR adalah program resmi pemerintah Indonesia. Bunga 6%/tahun disubsidi oleh APBN. SiapKredit tidak berafiliasi langsung, namun membantu menyiapkan data Anda.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
