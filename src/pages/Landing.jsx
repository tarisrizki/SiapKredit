import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { TrendingUp, MessageSquare, PieChart, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export function Landing() {
  const { state } = useAppContext();

  if (state.ui.isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-background -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/50 via-transparent to-transparent -z-10" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-8">
            <TrendingUp size={32} className="text-primary" />
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            Pintar Kelola Keuangan, <br className="hidden md:block"/> Siap Ajukan Pinjaman.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground mx-auto mb-10">
            SiapKredit membantu UMKM mencatat transaksi semudah mengetik kalkulator, dan menghitung kesiapan Anda untuk mendapat Kredit Usaha Rakyat (KUR).
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex justify-center gap-4">
             <Button size="lg" className="rounded-full font-bold px-8 shadow-lg hover:shadow-xl transition-all">
               Mulai Gratis Sekarang <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="py-16 md:py-24 bg-card/50 border-t">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-blue-100 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300">
                <MessageSquare size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Input Semudah Kalkulator</h3>
              <p className="text-muted-foreground">Cukup ketik nominal uang di layar seperti menggunakan kalkulator, dan laporan Anda akan otomatis tersusun.</p>
            </div>
            
            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-green-100 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300">
                <PieChart size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Laporan Otomatis</h3>
              <p className="text-muted-foreground">Pantau laba rugi, tren pemasukan, dan arus kas harian tanpa perlu pusing soal akuntansi.</p>
            </div>
            
            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-orange-100 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300">
                <ShieldCheck size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Skor Kesiapan Bank</h3>
              <p className="text-muted-foreground">Ketahui apakah dokumen dan catatan keuangan Anda sudah memenuhi standar bank (KUR).</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
