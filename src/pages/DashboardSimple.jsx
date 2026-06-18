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
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Catatan Keuangan</h1>
        <p className="text-lg font-medium text-muted-foreground">{state.profil.namaUsaha || 'Usaha Anda'}</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="bg-primary text-primary-foreground border-0 shadow-md rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <Wallet size={80} />
          </div>
          <p className="text-base font-medium opacity-90 mb-1">Sisa Uang Anda (Laba Bersih)</p>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
            {formatRupiah(net)}
          </p>
          
          <div className="flex gap-4">
            <Link to="/input" className="bg-white text-primary px-4 py-2.5 rounded-xl font-bold text-base hover:bg-gray-100 transition-colors shadow-sm">
              + Catat Uang Baru
            </Link>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 border border-success-200 bg-success-50 rounded-2xl flex flex-col items-center text-center">
          <ArrowUpCircle className="text-success-500 mb-1" size={32} />
          <p className="text-muted-foreground font-semibold text-base mb-1">Total Masuk</p>
          <p className="text-xl font-bold text-success-700">{formatRupiah(totalIn)}</p>
        </Card>
        
        <Card className="p-4 border border-danger-200 bg-danger-50 rounded-2xl flex flex-col items-center text-center">
          <ArrowDownCircle className="text-danger-500 mb-1" size={32} />
          <p className="text-muted-foreground font-semibold text-base mb-1">Total Keluar</p>
          <p className="text-xl font-bold text-danger-700">{formatRupiah(totalOut)}</p>
        </Card>
      </div>

      <Card className="p-5 rounded-2xl border mb-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Grafik Uang Masuk & Keluar</h3>
        <MonthlyBarChart data={filteredTransactions} />
      </Card>

      <Card className="p-5 rounded-2xl border mb-6 bg-brand-50 border-brand-200 text-center">
        <Target size={40} className="text-brand-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-foreground mb-2">Ingin Pinjam Uang Bank?</h3>
        <p className="text-base text-muted-foreground mb-5">
          Kami bisa bantu hitung seberapa besar peluang Anda disetujui oleh Bank (KUR).
        </p>
        <Link to="/skor" className="inline-block bg-brand-500 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-brand-600 transition-colors shadow-sm w-full">
          Cek Peluang Saya
        </Link>
      </Card>

    </div>
  );
}
