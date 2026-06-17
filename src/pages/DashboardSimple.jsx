import React from 'react';
import { usePeriodFilter } from '../hooks/usePeriodFilter';
import { useAppContext } from '../context/AppContext';
import { formatRupiah } from '../utils/formatters';
import { MonthlyBarChart } from '../components/dashboard/MonthlyBarChart';
import { TransactionList } from '../components/transaction/TransactionList';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  const { period, filteredTransactions, setPeriod } = usePeriodFilter();
  const { state } = useAppContext();

  const totalIn = filteredTransactions.filter(t => t.type === 'pemasukan').reduce((a, b) => a + b.amount, 0);
  const totalOut = filteredTransactions.filter(t => t.type === 'pengeluaran').reduce((a, b) => a + b.amount, 0);
  const net = totalIn - totalOut;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-foreground mb-1">Catatan Keuangan</h1>
        <p className="text-xl font-medium text-muted-foreground">{state.profil.namaUsaha || 'Usaha Anda'}</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="bg-primary text-primary-foreground border-0 shadow-xl rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Wallet size={120} />
          </div>
          <p className="text-lg font-medium opacity-90 mb-1">Sisa Uang Anda (Laba Bersih)</p>
          <p className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            {formatRupiah(net)}
          </p>
          
          <div className="flex gap-4">
            <Link to="/input" className="bg-white text-primary px-6 py-3 rounded-2xl font-black text-lg hover:bg-gray-100 transition-colors shadow-sm">
              + Catat Uang Baru
            </Link>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-5 border-2 border-success-200 bg-success-50 rounded-3xl flex flex-col items-center text-center">
          <ArrowUpCircle className="text-success-500 mb-2" size={40} />
          <p className="text-muted-foreground font-bold text-lg mb-1">Total Masuk</p>
          <p className="text-2xl font-black text-success-700">{formatRupiah(totalIn)}</p>
        </Card>
        
        <Card className="p-5 border-2 border-danger-200 bg-danger-50 rounded-3xl flex flex-col items-center text-center">
          <ArrowDownCircle className="text-danger-500 mb-2" size={40} />
          <p className="text-muted-foreground font-bold text-lg mb-1">Total Keluar</p>
          <p className="text-2xl font-black text-danger-700">{formatRupiah(totalOut)}</p>
        </Card>
      </div>

      <Card className="p-6 rounded-3xl border-2 mb-8">
        <h3 className="text-2xl font-black text-foreground mb-6">Grafik Uang Masuk & Keluar</h3>
        <MonthlyBarChart data={filteredTransactions} />
      </Card>

      <Card className="p-6 rounded-3xl border-2 mb-8 bg-brand-50 border-brand-200 text-center">
        <Target size={48} className="text-brand-500 mx-auto mb-4" />
        <h3 className="text-2xl font-black text-foreground mb-3">Ingin Pinjam Uang Bank?</h3>
        <p className="text-lg text-muted-foreground mb-6">
          Kami bisa bantu hitung seberapa besar peluang Anda disetujui oleh Bank (KUR).
        </p>
        <Link to="/skor" className="inline-block bg-brand-500 text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-brand-600 transition-colors shadow-md w-full">
          Cek Peluang Saya
        </Link>
      </Card>

    </div>
  );
}
