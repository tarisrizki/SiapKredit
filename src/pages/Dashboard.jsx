import React from 'react';
import { usePeriodFilter } from '../hooks/usePeriodFilter';
import { useAppContext } from '../context/AppContext';
import { formatRupiah } from '../utils/formatters';
import { MetricCard } from '../components/dashboard/MetricCard';
import { MonthlyBarChart } from '../components/dashboard/MonthlyBarChart';
import { CategoryPieChart } from '../components/dashboard/CategoryPieChart';
import { PeriodSelector } from '../components/dashboard/PeriodSelector';
import { PrintableReport } from '../components/dashboard/PrintableReport';
import { TransactionList } from '../components/transaction/TransactionList';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowUpCircle, ArrowDownCircle, Wallet, FileText, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export function Dashboard() {
  const { period, filteredTransactions, setPeriod } = usePeriodFilter();
  const { state, dispatch } = useAppContext();

  const totalIn = filteredTransactions.filter(t => t.type === 'pemasukan').reduce((a, b) => a + b.amount, 0);
  const totalOut = filteredTransactions.filter(t => t.type === 'pengeluaran').reduce((a, b) => a + b.amount, 0);
  const net = totalIn - totalOut;

  const handleDelete = (id) => {
    if (window.confirm('Hapus transaksi ini?')) {
      dispatch({ type: 'DELETE_TRANSAKSI', payload: id });
      toast.success('Transaksi dihapus');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Keuangan</h1>
            <p className="text-gray-500 text-sm mt-1">{state.profil.namaUsaha}</p>
          </div>
          
          <PeriodSelector selected={period} onChange={setPeriod} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard 
            title="Pemasukan" 
            value={formatRupiah(totalIn)} 
            icon={ArrowUpCircle}
            subtitle="Total diterima"
          />
          <MetricCard 
            title="Pengeluaran" 
            value={formatRupiah(totalOut)} 
            icon={ArrowDownCircle}
            subtitle="Total dibayar"
          />
          <MetricCard 
            title="Laba / Rugi" 
            value={formatRupiah(net)} 
            icon={Wallet}
            trend={net > 0 ? 1 : net < 0 ? -1 : 0}
            subtitle={net > 0 ? 'Untung' : net < 0 ? 'Rugi' : 'Impas'}
          />
          <MetricCard 
            title="Total Transaksi" 
            value={`${filteredTransactions.length} trx`} 
            icon={FileText}
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <h3 className="font-bold text-gray-900 mb-6">Arus Kas Bulanan</h3>
            <MonthlyBarChart data={filteredTransactions} />
          </Card>
          
          <Card>
            <h3 className="font-bold text-gray-900 mb-6">Kategori Pengeluaran</h3>
            <CategoryPieChart data={filteredTransactions} />
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Trx */}
          <Card className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Transaksi Terbaru</h3>
              <Link to="/input" className="text-sm font-medium text-brand-600 hover:text-brand-800">+ Tambah</Link>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[400px] pr-2">
              <TransactionList 
                transactions={filteredTransactions.slice(0, 10)} 
                onDelete={handleDelete} 
              />
            </div>
            {filteredTransactions.length > 10 && (
              <p className="text-center text-xs text-gray-500 mt-4 pt-2 border-t border-gray-100">
                Menampilkan 10 dari {filteredTransactions.length} transaksi
              </p>
            )}
          </Card>

          {/* Quick Actions */}
          <div className="space-y-4">
             <Card className="bg-gradient-to-br from-brand-500 to-brand-700 text-white border-0">
               <h3 className="font-bold text-xl mb-2">Lihat Skor Kredit Anda</h3>
               <p className="text-brand-100 mb-6 text-sm">Cek apakah catatan keuangan dan dokumen Anda sudah memenuhi syarat untuk pengajuan KUR.</p>
               <Link to="/skor" className="inline-flex items-center justify-center font-medium rounded-lg px-4 py-2 bg-white text-brand-600 hover:bg-gray-50 w-full sm:w-auto">
                 Cek Skor Sekarang <ArrowRight size={16} className="ml-2" />
               </Link>
             </Card>

             <Card>
               <h3 className="font-bold text-gray-900 mb-2">Laporan Keuangan</h3>
               <p className="text-gray-500 text-sm mb-4">Cetak laporan laba rugi dan daftar transaksi untuk keperluan bank atau arsip pribadi.</p>
               <Button variant="outline" className="w-full" onClick={handlePrint}>
                 <FileText size={16} className="mr-2" /> Cetak Laporan (PDF)
               </Button>
             </Card>
          </div>
        </div>
      </div>

      {/* Print Only Content */}
      <PrintableReport 
        data={filteredTransactions} 
        profil={state.profil} 
        periodLabel={period} 
      />
    </div>
  );
}
