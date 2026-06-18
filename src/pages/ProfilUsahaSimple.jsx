import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';
import { Store, RefreshCcw, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProfilUsaha() {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState(state.profil);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_PROFIL', payload: formData });
    toast.success('Data warung berhasil disimpan!', {
      style: { padding: '16px', fontSize: '18px', fontWeight: 'bold' }
    });
  };

  const handleReset = () => {
    if (window.confirm('AWAS: Semua data akan dihapus! Yakin?')) {
      dispatch({ type: 'RESET_DATA' });
      toast.success('Semua data telah dihapus');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Data Warung / Usaha</h1>
        <p className="text-base text-muted-foreground">Ubah informasi usaha Anda di sini.</p>
      </div>

      <Card className="p-5 rounded-2xl border mb-6 shadow-sm">
        <form onSubmit={handleSave} className="space-y-8">
          
          <div>
            <label className="block text-lg font-semibold text-foreground mb-2">Nama Usaha/Warung Anda:</label>
            <input 
              type="text" 
              name="namaUsaha"
              value={formData.namaUsaha}
              onChange={(e) => handleChange('namaUsaha', e.target.value)}
              className="w-full px-4 py-3 text-lg border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Contoh: Warung Nasi Bu Siti"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-foreground mb-2">Jenis Jualan:</label>
            <div className="grid grid-cols-2 gap-3">
              {['Perdagangan', 'Makanan/Minuman', 'Jasa', 'Lainnya'].map(jenis => (
                <button
                  type="button"
                  key={jenis}
                  onClick={() => handleChange('jenisUsaha', jenis)}
                  className={`px-3 py-3 rounded-xl text-base font-semibold border transition-all ${
                    formData.jenisUsaha === jenis || (jenis === 'Lainnya' && !['Perdagangan', 'Makanan/Minuman', 'Jasa'].includes(formData.jenisUsaha))
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {jenis}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-foreground mb-2">Sudah Berjalan Berapa Lama?</label>
            <div className="grid grid-cols-2 gap-3">
              {['<6 bulan', '6–11 bulan', '1–2 tahun', '>2 tahun'].map(lama => (
                <button
                  type="button"
                  key={lama}
                  onClick={() => handleChange('lamaUsaha', lama)}
                  className={`px-3 py-3 rounded-xl text-base font-semibold border transition-all ${
                    formData.lamaUsaha === lama
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {lama.replace('<', 'Kurang dari ').replace('>', 'Lebih dari ')}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <label className={`flex flex-col sm:flex-row gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              formData.keuanganTerpisah ? 'border-success-500 bg-success-50' : 'border-border bg-white hover:border-primary/50'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  formData.keuanganTerpisah ? 'border-success-500 bg-success-500' : 'border-muted-foreground/30 bg-transparent'
                }`}>
                  {formData.keuanganTerpisah && <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
                <span className="text-lg font-bold text-foreground">Rekening Bank Sudah Dipisah</span>
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={formData.keuanganTerpisah}
                onChange={(e) => handleChange('keuanganTerpisah', e.target.checked)}
              />
              <p className="text-base text-muted-foreground sm:pl-11">
                Uang jualan tidak dicampur dengan uang belanja keluarga.
              </p>
            </label>
          </div>

          <Button type="submit" className="w-full py-4 text-xl font-bold rounded-xl shadow-md">
            SIMPAN DATA
          </Button>
        </form>
      </Card>

      <div className="text-center mt-10 mb-6">
        <h3 className="text-lg font-bold text-danger-700 mb-3">Pengaturan Bahaya</h3>
        <button 
          onClick={handleReset}
          className="bg-danger-50 text-danger-700 border border-danger-200 px-4 py-3 rounded-xl font-semibold text-base hover:bg-danger-100 transition-colors w-full sm:w-auto"
        >
          HAPUS SEMUA DATA SAYA
        </button>
      </div>
    </div>
  );
}
