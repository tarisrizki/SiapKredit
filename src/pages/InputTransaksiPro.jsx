import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatRupiah } from '../utils/formatters';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowUpRight, ArrowDownRight, Save, Calendar, Tag, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export function InputTransaksiPro() {
  const { state, dispatch } = useAppContext();
  
  const [formData, setFormData] = useState({
    type: 'pemasukan', // pemasukan | pengeluaran
    amount: '',
    category: 'Penjualan',
    title: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      category: type === 'pemasukan' ? 'Penjualan' : 'Operasional'
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.amount || parseInt(formData.amount) <= 0) {
      toast.error('Nominal harus lebih dari 0');
      return;
    }

    const newTrx = {
      id: `trx-${Date.now()}`,
      createdAt: Date.now(),
      date: formData.date,
      type: formData.type,
      amount: parseInt(formData.amount),
      category: formData.category,
      title: formData.title || formData.category,
      isManual: true
    };

    dispatch({ type: 'ADD_TRANSAKSI', payload: newTrx });
    toast.success('Transaksi berhasil dicatat');

    // Reset
    setFormData({
      type: 'pemasukan',
      amount: '',
      category: 'Penjualan',
      title: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const kategoriMasuk = ['Penjualan', 'Pendanaan', 'Lain-lain'];
  const kategoriKeluar = ['Operasional', 'Bahan Baku', 'Gaji Karyawan', 'Pajak', 'Lain-lain'];
  const categories = formData.type === 'pemasukan' ? kategoriMasuk : kategoriKeluar;

  // Ringkasan Hari Ini
  const trxToday = state.transaksi.filter(t => t.date === new Date().toISOString().split('T')[0]);
  const inToday = trxToday.filter(t => t.type === 'pemasukan').reduce((a, b) => a + b.amount, 0);
  const outToday = trxToday.filter(t => t.type === 'pengeluaran').reduce((a, b) => a + b.amount, 0);

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 p-4 sm:p-6 pb-24">
      
      {/* Form Area */}
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Pencatatan Keuangan</h1>
          <p className="text-muted-foreground text-sm mt-1">Gunakan formulir ini untuk mencatat jurnal transaksi secara presisi.</p>
        </div>

        <Card className="p-6 shadow-sm border-2">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Type Selector */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleTypeChange('pemasukan')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 font-bold transition-all ${
                  formData.type === 'pemasukan' 
                    ? 'border-success-500 bg-success-50 text-success-700' 
                    : 'border-border bg-transparent text-muted-foreground hover:bg-muted'
                }`}
              >
                <ArrowUpRight size={20} />
                Pemasukan (Kredit)
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('pengeluaran')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 font-bold transition-all ${
                  formData.type === 'pengeluaran' 
                    ? 'border-danger-500 bg-danger-50 text-danger-700' 
                    : 'border-border bg-transparent text-muted-foreground hover:bg-muted'
                }`}
              >
                <ArrowDownRight size={20} />
                Pengeluaran (Debit)
              </button>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Nominal Transaksi (Rp)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">Rp</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 text-lg font-bold border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <Tag size={16} /> Kategori Buku Besar
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border-2 border-border rounded-xl focus:border-primary outline-none transition-all bg-transparent"
                  required
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Tanggal Transaksi
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border-2 border-border rounded-xl focus:border-primary outline-none transition-all bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                <FileText size={16} /> Keterangan (Opsional)
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm border-2 border-border rounded-xl focus:border-primary outline-none transition-all"
                placeholder="Contoh: Pembayaran invoice #001"
              />
            </div>

            <Button type="submit" className="w-full py-4 text-base font-bold rounded-xl flex items-center justify-center gap-2">
              <Save size={18} /> Simpan Transaksi
            </Button>
          </form>
        </Card>
      </div>

      {/* Sidebar Summary */}
      <div className="w-full md:w-80">
        <div className="sticky top-24">
          <Card className="p-5 border-2 shadow-sm bg-muted/30">
            <h3 className="font-bold text-foreground mb-4">Ringkasan Hari Ini</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                <span className="text-sm text-muted-foreground font-medium">In (Kredit)</span>
                <span className="font-bold text-success-600">{formatRupiah(inToday)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                <span className="text-sm text-muted-foreground font-medium">Out (Debit)</span>
                <span className="font-bold text-danger-600">{formatRupiah(outToday)}</span>
              </div>
              <div className="pt-4 border-t-2 border-border flex justify-between items-center">
                <span className="text-sm font-bold text-foreground">Net Hari Ini</span>
                <span className={`font-black ${inToday - outToday >= 0 ? 'text-primary' : 'text-danger-600'}`}>
                  {formatRupiah(inToday - outToday)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
