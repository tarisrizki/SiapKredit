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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-foreground mb-2">Data Warung / Usaha</h1>
        <p className="text-lg text-muted-foreground">Ubah informasi usaha Anda di sini.</p>
      </div>

      <Card className="p-6 rounded-3xl border-2 mb-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-8">
          
          <div>
            <label className="block text-xl font-bold text-foreground mb-3">Nama Usaha/Warung Anda:</label>
            <input 
              type="text" 
              name="namaUsaha"
              value={formData.namaUsaha}
              onChange={(e) => handleChange('namaUsaha', e.target.value)}
              className="w-full px-6 py-4 text-xl border-2 border-border rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
              placeholder="Contoh: Warung Nasi Bu Siti"
              required
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-foreground mb-3">Jenis Jualan:</label>
            <div className="grid grid-cols-2 gap-3">
              {['Perdagangan', 'Makanan/Minuman', 'Jasa', 'Lainnya'].map(jenis => (
                <button
                  type="button"
                  key={jenis}
                  onClick={() => handleChange('jenisUsaha', jenis)}
                  className={`px-4 py-4 rounded-2xl text-lg font-bold border-2 transition-all ${
                    formData.jenisUsaha === jenis || (jenis === 'Lainnya' && !['Perdagangan', 'Makanan/Minuman', 'Jasa'].includes(formData.jenisUsaha))
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'bg-background border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {jenis}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xl font-bold text-foreground mb-3">Sudah Berjalan Berapa Lama?</label>
            <div className="grid grid-cols-2 gap-3">
              {['<6 bulan', '6–11 bulan', '1–2 tahun', '>2 tahun'].map(lama => (
                <button
                  type="button"
                  key={lama}
                  onClick={() => handleChange('lamaUsaha', lama)}
                  className={`px-4 py-4 rounded-2xl text-lg font-bold border-2 transition-all ${
                    formData.lamaUsaha === lama
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'bg-background border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {lama.replace('<', 'Kurang dari ').replace('>', 'Lebih dari ')}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t-2 border-border">
            <label className={`flex flex-col sm:flex-row gap-4 p-6 rounded-2xl border-4 cursor-pointer transition-all ${
              formData.keuanganTerpisah ? 'border-success-500 bg-success-50' : 'border-border bg-white hover:border-primary/50'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center shrink-0 ${
                  formData.keuanganTerpisah ? 'border-success-500 bg-success-500' : 'border-muted-foreground/30 bg-transparent'
                }`}>
                  {formData.keuanganTerpisah && <div className="w-4 h-4 bg-white rounded-full"></div>}
                </div>
                <span className="text-xl font-bold text-foreground">Rekening Bank Sudah Dipisah</span>
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={formData.keuanganTerpisah}
                onChange={(e) => handleChange('keuanganTerpisah', e.target.checked)}
              />
              <p className="text-lg text-muted-foreground sm:pl-14">
                Uang jualan tidak dicampur dengan uang belanja keluarga.
              </p>
            </label>
          </div>

          <Button type="submit" className="w-full py-8 text-2xl font-black rounded-2xl shadow-xl">
            SIMPAN DATA
          </Button>
        </form>
      </Card>

      <div className="text-center mt-12 mb-6">
        <h3 className="text-xl font-bold text-danger-700 mb-4">Pengaturan Bahaya</h3>
        <button 
          onClick={handleReset}
          className="bg-danger-50 text-danger-700 border-2 border-danger-200 px-6 py-4 rounded-2xl font-bold text-lg hover:bg-danger-100 transition-colors w-full sm:w-auto"
        >
          HAPUS SEMUA DATA SAYA
        </button>
      </div>
    </div>
  );
}
