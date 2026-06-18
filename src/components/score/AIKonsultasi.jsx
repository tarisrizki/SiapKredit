import React, { useState, useEffect } from 'react';
import { generateKonsultasiKredit, isConfigured } from '../../lib/gemini';
import { useAppContext } from '../../context/AppContext';
import { useScore } from '../../hooks/useScore';
import { Sparkles, Loader2, RefreshCw, AlertCircle } from 'lucide-react';

export function AIKonsultasi() {
  const { state } = useAppContext();
  const scoreResult = useScore();
  const { profil, dokumen, transaksi } = state;

  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('siapkredit_konsultasi');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHasil(parsed.text);
        setTimestamp(new Date(parsed.ts));
      } catch (e) {
        console.error('Failed to parse saved consultation', e);
      }
    }
  }, []);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const teks = await generateKonsultasiKredit({ profil, dokumen, transaksi, skor: scoreResult });
      setHasil(teks);
      const now = new Date();
      setTimestamp(now);
      localStorage.setItem('siapkredit_konsultasi', JSON.stringify({ text: teks, ts: now.toISOString() }));
    } catch (e) {
      console.error("Gemini API Error:", e);
      if (e.message === 'NO_API_KEY') {
        setError('API Key Gemini belum dikonfigurasi. Tambahkan VITE_GEMINI_API_KEY di file .env');
      } else {
        setError(`Gagal menghubungi AI: ${e.message}. Periksa API key atau koneksi internet Anda.`);
      }
    } finally {
      setLoading(false);
    }
  }

  // Aturan 4: Jika transaksi kosong
  if (transaksi.length === 0) {
    return (
      <section className="bg-gradient-to-br from-brand-50 to-blue-50 border-2 border-brand-300 rounded-2xl p-6 mt-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-extrabold text-brand-800">Konsultasi AI Kredit</h2>
          <span className="bg-brand-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap font-medium tracking-wide">Powered by Gemini</span>
        </div>
        <p className="text-gray-800 font-medium text-sm">
          Mulai catat transaksi terlebih dahulu agar AI bisa menganalisis usaha Anda.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-brand-50 to-blue-50 border-2 border-brand-300 rounded-2xl p-6 mt-8 shadow-sm">
      <div className="flex items-center flex-wrap gap-3 mb-5">
        <h2 className="text-xl font-extrabold text-brand-800">Konsultasi AI Kredit</h2>
        <span className="bg-brand-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap font-medium tracking-wide">Powered by Gemini</span>
      </div>

      {!hasil && !loading && !error && (
        <div className="flex flex-col items-start gap-4">
          <p className="text-gray-800 font-medium text-sm">
            Dapatkan analisis personal dari AI tentang peluang kredit usaha Anda berdasarkan data nyata.
          </p>
          <button 
            onClick={handleGenerate}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95"
          >
            <Sparkles size={18} />
            Minta Analisis Sekarang
          </button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <Loader2 size={36} className="text-brand-600 animate-spin" />
          <p className="text-brand-800 font-bold tracking-wide">AI sedang membaca data usaha Anda...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-4 flex flex-col gap-3">
          <div className="flex items-start gap-2 text-danger-700">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button 
            onClick={handleGenerate}
            className="self-start text-sm bg-white border border-danger-200 text-danger-700 px-4 py-1.5 rounded-lg font-medium hover:bg-danger-100 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {hasil && !loading && (
        <div className="flex flex-col gap-5">
          <blockquote className="text-gray-900 leading-relaxed text-[15px] whitespace-pre-line border-l-4 border-brand-500 pl-5 py-2 bg-white/70 rounded-r-xl shadow-sm text-justify">
            {hasil}
          </blockquote>
          
          <div className="flex justify-end mt-3 pt-5 border-t-2 border-brand-200/60">
            <button 
              onClick={handleGenerate}
              className="flex items-center gap-2 text-brand-700 hover:text-brand-900 text-sm font-bold transition-colors py-1 px-2 hover:bg-brand-100 rounded-md"
            >
              <RefreshCw size={16} />
              Perbarui Analisis
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
