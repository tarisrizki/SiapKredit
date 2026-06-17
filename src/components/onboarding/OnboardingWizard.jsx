import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { TrendingUp, CheckCircle, Database } from 'lucide-react';
import { documentList } from '../../data/documentList';

export function OnboardingWizard() {
  const { state, dispatch } = useAppContext();
  const [step, setStep] = useState(1);
  const [profil, setProfil] = useState(state.profil);
  const [dokumen, setDokumen] = useState(state.dokumen);

  if (state.ui.isOnboarded) return null;

  const handleProfilChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfil({
      ...profil,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDokumenChange = (id) => {
    setDokumen({
      ...dokumen,
      [id]: !dokumen[id]
    });
  };

  const finishOnboarding = (useSample = false) => {
    if (useSample) {
      dispatch({ type: 'LOAD_SAMPLE_DATA' });
    } else {
      dispatch({ type: 'UPDATE_PROFIL', payload: { ...profil, setupDone: true } });
      dispatch({ type: 'UPDATE_DOKUMEN', payload: dokumen });
      dispatch({ type: 'SET_ONBOARDED', payload: true });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl max-h-[90vh] flex flex-col no-padding animate-slide-in">
        <div className="bg-brand-500 p-6 text-white text-center rounded-t-xl">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <TrendingUp size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Selamat datang di SiapKredit</h2>
          <p className="text-brand-100">Mari persiapkan profil usaha Anda untuk akses permodalan bank.</p>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {/* Progress Indicators */}
          <div className="flex justify-center mb-8 gap-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-2 w-12 rounded-full ${i <= step ? 'bg-brand-500' : 'bg-gray-200'}`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">1. Profil Usaha</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha Anda</label>
                  <input 
                    type="text" 
                    name="namaUsaha"
                    value={profil.namaUsaha}
                    onChange={handleProfilChange}
                    placeholder="Contoh: Warung Bu Siti"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Usaha</label>
                  <select 
                    name="jenisUsaha"
                    value={profil.jenisUsaha}
                    onChange={handleProfilChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                  >
                    <option value="Perdagangan">Perdagangan (Toko, Warung)</option>
                    <option value="Makanan & Minuman">Makanan & Minuman</option>
                    <option value="Jasa">Jasa (Laundry, Bengkel, dll)</option>
                    <option value="Pertanian">Pertanian / Peternakan</option>
                    <option value="Kerajinan">Kerajinan / Produksi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lama Berjalan</label>
                    <select 
                      name="lamaUsaha"
                      value={profil.lamaUsaha}
                      onChange={handleProfilChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                    >
                      <option value="<6 bulan">&lt; 6 bulan</option>
                      <option value="6–11 bulan">6 – 11 bulan</option>
                      <option value="1–2 tahun">1 – 2 tahun</option>
                      <option value=">2 tahun">&gt; 2 tahun</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Omset per Bulan</label>
                    <select 
                      name="omsetPerBulan"
                      value={profil.omsetPerBulan}
                      onChange={handleProfilChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                    >
                      <option value="<1 juta">&lt; Rp 1 juta</option>
                      <option value="1–5 juta">Rp 1–5 juta</option>
                      <option value="5–20 juta">Rp 5–20 juta</option>
                      <option value="20–50 juta">Rp 20–50 juta</option>
                      <option value=">50 juta">&gt; Rp 50 juta</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={() => setStep(2)}>Lanjut →</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">2. Cek Dokumen Awal</h3>
              <p className="text-gray-500 mb-6">Centang dokumen usaha yang sudah Anda miliki saat ini. (Bisa diperbarui nanti)</p>
              
              <div className="space-y-3">
                {documentList.slice(0, 5).map((doc) => (
                  <label key={doc.id} className="flex items-start p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        checked={dokumen[doc.id]}
                        onChange={() => handleDokumenChange(doc.id)}
                        className="h-5 w-5 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="font-medium text-gray-900">{doc.name}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>← Kembali</Button>
                <Button onClick={() => setStep(3)}>Lanjut →</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in text-center">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">3. Pilih Data Awal</h3>
              <p className="text-gray-500 mb-8">Pilih bagaimana Anda ingin memulai menggunakan aplikasi.</p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <button 
                  onClick={() => finishOnboarding(false)}
                  className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors"
                >
                  <CheckCircle size={40} className="text-brand-500 mb-3" />
                  <span className="font-semibold text-gray-900">Mulai Dari Awal</span>
                  <span className="text-sm text-gray-500 mt-1">Kosong, catat transaksi pertama saya</span>
                </button>
                
                <button 
                  onClick={() => finishOnboarding(true)}
                  className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors"
                >
                  <Database size={40} className="text-brand-500 mb-3" />
                  <span className="font-semibold text-gray-900">Muat Data Contoh</span>
                  <span className="text-sm text-gray-500 mt-1">Gunakan data "Warung Bu Siti" untuk coba-coba</span>
                </button>
              </div>
              
              <div className="mt-8 flex justify-start">
                 <Button variant="ghost" onClick={() => setStep(2)}>← Kembali</Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
