import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';
import { Store, Settings, LogOut, Database } from 'lucide-react';

export function ProfilUsaha() {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState(state.profil);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_PROFIL', payload: formData });
    toast.success('Profil berhasil diperbarui');
  };

  const handleReset = () => {
    if (window.confirm('PERINGATAN: Semua data transaksi, dokumen, dan riwayat akan dihapus. Lanjutkan?')) {
      dispatch({ type: 'RESET_DATA' });
      toast.success('Data telah direset');
      // Update local form state too
      setFormData({
         namaUsaha: '',
         jenisUsaha: 'Lainnya',
         lamaUsaha: '<6 bulan',
         kota: '',
         omsetPerBulan: '<1 juta',
         keuanganTerpisah: false,
         setupDone: true
      });
    }
  };
  
  const handleLoadSample = () => {
    if (window.confirm('Muat data contoh? Data transaksi Anda saat ini akan ditambahkan/ditimpa.')) {
      dispatch({ type: 'LOAD_SAMPLE_DATA' });
      toast.success('Data contoh berhasil dimuat');
      // It's better to force reload or re-sync state, but for simplicity:
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profil Usaha</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola informasi dasar mengenai bisnis Anda.</p>
      </div>

      <Card className="mb-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-gray-100">
            <Store size={20} className="text-brand-500" />
            <h2 className="font-semibold text-gray-900">Informasi Dasar</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha Anda</label>
            <input 
              type="text" 
              name="namaUsaha"
              value={formData.namaUsaha}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 outline-none"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Usaha</label>
              <select 
                name="jenisUsaha"
                value={formData.jenisUsaha}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 outline-none"
              >
                <option value="Perdagangan">Perdagangan (Toko, Warung)</option>
                <option value="Makanan & Minuman">Makanan & Minuman</option>
                <option value="Jasa">Jasa (Laundry, Bengkel, dll)</option>
                <option value="Pertanian">Pertanian / Peternakan</option>
                <option value="Kerajinan">Kerajinan / Produksi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lama Berjalan</label>
              <select 
                name="lamaUsaha"
                value={formData.lamaUsaha}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 outline-none"
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
                value={formData.omsetPerBulan}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 outline-none"
              >
                <option value="<1 juta">&lt; Rp 1 juta</option>
                <option value="1–5 juta">Rp 1–5 juta</option>
                <option value="5–20 juta">Rp 5–20 juta</option>
                <option value="20–50 juta">Rp 20–50 juta</option>
                <option value=">50 juta">&gt; Rp 50 juta</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kota / Kabupaten</label>
              <input 
                type="text" 
                name="kota"
                value={formData.kota}
                onChange={handleChange}
                placeholder="Contoh: Bandung"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="flex items-start p-4 border border-brand-100 bg-brand-50/50 rounded-lg cursor-pointer">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  name="keuanganTerpisah"
                  checked={formData.keuanganTerpisah}
                  onChange={handleChange}
                  className="h-5 w-5 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="font-medium text-gray-900 block mb-1">Keuangan Usaha Sudah Terpisah</span>
                <span className="text-gray-500">Saya memiliki rekening bank yang terpisah khusus untuk operasional usaha, tidak dicampur dengan kebutuhan pribadi.</span>
              </div>
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit">Simpan Profil</Button>
          </div>
        </form>
      </Card>

      <Card className="border-danger-200">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <Settings size={20} className="text-gray-500" />
          <h2 className="font-semibold text-gray-900">Pengaturan Lanjutan</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1 justify-center border-gray-300 hover:bg-gray-50" onClick={handleLoadSample}>
            <Database size={16} className="mr-2 text-gray-500" /> Muat Data Contoh
          </Button>
          <Button variant="danger" className="flex-1 justify-center" onClick={handleReset}>
            <LogOut size={16} className="mr-2" /> Reset Semua Data
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Data tersimpan secara lokal di browser Anda (Offline). Tidak ada data yang dikirim ke server.
        </p>
      </Card>
    </div>
  );
}
