import React from 'react';
import { useScore } from '../hooks/useScore';
import { useAppContext } from '../context/AppContext';
import { ScoreHeader } from '../components/score/ScoreHeader';
import { DimensionBreakdown } from '../components/score/DimensionBreakdown';
import { BankRecommendation } from '../components/score/BankRecommendation';
import { ActionPlan } from '../components/score/ActionPlan';
import { motion } from 'framer-motion';

export function SkorKredit() {
  const scoreResult = useScore();
  const { state } = useAppContext();

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground">Analisis Kesiapan Kredit</h1>
        <p className="text-muted-foreground text-sm mt-1">Mengukur seberapa siap usaha Anda mendapat fasilitas pinjaman bank berdasarkan standar umum perbankan.</p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants}>
          <ScoreHeader score={scoreResult.total} tier={scoreResult.tier} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <DimensionBreakdown breakdown={scoreResult.breakdown} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <BankRecommendation score={scoreResult.total} dokumen={state.dokumen} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ActionPlan scoreResult={scoreResult} dokumen={state.dokumen} profil={state.profil} />
        </motion.div>
      </motion.div>
    </div>
  );
}
