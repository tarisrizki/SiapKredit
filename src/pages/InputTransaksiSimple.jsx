import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatRupiah } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowDownCircle, ArrowUpCircle, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export function InputTransaksiSimple() {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState(null); // 'masuk' or 'keluar'
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customCatText, setCustomCatText] = useState('');
  
  const handleTypeSelect = (type) => {
    setActiveTab(type);
    setAmount('');
    setCategory(type === 'masuk' ? 'Penjualan' : 'Operasional');
    setIsAddingCustom(false);
    setCustomCatText('');
  };

  const handleNumClick = (num) => {
    if (amount === '0') setAmount(num);
    else setAmount(amount + num);
  };

  const handleDelete = () => {
    setAmount(amount.slice(0, -1));
  };

  const handleSaveCustomCat = () => {
    if(customCatText.trim()) {
      dispatch({ 
        type: 'ADD_KATEGORI', 
        payload: { type: activeTab, name: customCatText.trim() } 
      });
      setCategory(customCatText.trim());
      setIsAddingCustom(false);
      setCustomCatText('');
    }
  };

  const handleSave = () => {
    if (!amount || parseInt(amount) === 0) {
      toast.error('Masukkan jumlah uang terlebih dahulu!');
      return;
    }

    const typeStr = activeTab === 'masuk' ? 'pemasukan' : 'pengeluaran';
    
    const newTrx = {
      id: `trx-${Date.now()}`,
      createdAt: Date.now(),
      date: new Date().toISOString().split('T')[0],
      type: typeStr,
      amount: parseInt(amount),
      category: category,
      title: category, // Sederhana
      isManual: true
    };

    dispatch({ type: 'ADD_TRANSAKSI', payload: newTrx });
    
    toast.success(`Berhasil mencatat uang ${activeTab}!`, {
      icon: <CheckCircle2 className="text-success-600" size={30} />,
      style: {
        padding: '16px',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    });

    // Reset
    setActiveTab(null);
    setAmount('');
  };

  // Kategori
  const baseMasuk = ['Penjualan', 'Pinjaman'];
  const baseKeluar = ['Operasional', 'Bahan Baku', 'Gaji', 'Listrik/Air'];
  
  const customMasuk = state.kategoriCustomMasuk || [];
  const customKeluar = state.kategoriCustomKeluar || [];

  const categories = activeTab === 'masuk' 
    ? [...baseMasuk, ...customMasuk] 
    : [...baseKeluar, ...customKeluar];

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 pb-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Catat Uang</h1>
        <p className="text-lg text-muted-foreground">Apa yang terjadi hari ini?</p>
      </div>

      <AnimatePresence mode="wait">
        {!activeTab ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-6 mt-8"
          >
            <button 
              onClick={() => handleTypeSelect('masuk')}
              className="bg-success-50 hover:bg-success-100 border border-success-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all shadow-md active:scale-95"
            >
              <div className="bg-success-500 text-white p-3 rounded-full">
                <ArrowUpCircle size={48} />
              </div>
              <span className="text-2xl font-bold text-success-700">Uang Masuk</span>
              <span className="text-success-600 font-medium text-base">Contoh: Jualan, Terima Uang</span>
            </button>

            <button 
              onClick={() => handleTypeSelect('keluar')}
              className="bg-danger-50 hover:bg-danger-100 border border-danger-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all shadow-md active:scale-95"
            >
              <div className="bg-danger-500 text-white p-3 rounded-full">
                <ArrowDownCircle size={48} />
              </div>
              <span className="text-2xl font-bold text-danger-700">Uang Keluar</span>
              <span className="text-danger-600 font-medium text-base">Contoh: Beli Barang, Bayar Gaji</span>
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="input-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
          >
            <div className="flex justify-between items-center mb-2">
              <button onClick={() => setActiveTab(null)} className="text-muted-foreground p-2 rounded-full hover:bg-muted text-base font-bold">
                ← Kembali
              </button>
              <span className={`text-lg font-bold px-3 py-1 rounded-full ${activeTab === 'masuk' ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700'}`}>
                {activeTab === 'masuk' ? 'UANG MASUK' : 'UANG KELUAR'}
              </span>
            </div>

            <Card className="p-5 border shadow-sm">
              <p className="text-center text-muted-foreground font-bold mb-1">Jumlah (Rupiah)</p>
              <div className="text-center text-3xl sm:text-4xl font-black text-foreground mb-4 overflow-x-auto whitespace-nowrap">
                {amount ? formatRupiah(parseInt(amount)) : 'Rp 0'}
              </div>

              {/* Simple Numpad */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {['1','2','3','4','5','6','7','8','9','000','0'].map((num) => (
                  <button 
                    key={num} 
                    onClick={() => handleNumClick(num)}
                    className="bg-muted hover:bg-muted/80 active:bg-muted/50 rounded-xl p-3 text-xl font-bold text-foreground transition-colors"
                  >
                    {num}
                  </button>
                ))}
                <button 
                  onClick={handleDelete}
                  className="bg-danger-50 hover:bg-danger-100 text-danger-600 rounded-xl p-3 flex items-center justify-center transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-5">
                <p className="font-bold text-base mb-2">Pilih Kategori:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setIsAddingCustom(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all border ${
                        category === cat 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-background border-border text-muted-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  
                  {!isAddingCustom && (
                    <button
                      onClick={() => setIsAddingCustom(true)}
                      className="px-3 py-2 rounded-lg text-sm font-semibold border border-dashed border-border text-muted-foreground hover:bg-muted transition-all flex items-center gap-1"
                    >
                      <Plus size={16} /> Lainnya
                    </button>
                  )}
                </div>

                {isAddingCustom && (
                  <div className="mt-3 flex gap-2">
                    <input 
                      type="text" 
                      value={customCatText}
                      onChange={(e) => setCustomCatText(e.target.value)}
                      placeholder="Ketik kategori baru..."
                      className="flex-1 px-3 py-2 text-sm font-semibold border border-border rounded-lg focus:border-primary outline-none"
                      autoFocus
                    />
                    <button 
                      onClick={handleSaveCustomCat}
                      className="bg-primary text-white font-semibold px-3 py-2 rounded-lg text-sm"
                    >
                      Simpan
                    </button>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleSave} 
                className={`w-full py-4 text-xl font-bold rounded-xl shadow-md ${activeTab === 'masuk' ? 'bg-success-500 hover:bg-success-600' : 'bg-danger-500 hover:bg-danger-600'}`}
              >
                SIMPAN CATATAN
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
