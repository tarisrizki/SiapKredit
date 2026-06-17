import React from 'react';
import { useScore } from '../hooks/useScore';
import { useAppContext } from '../context/AppContext';
import { ScoreHeader } from '../components/score/ScoreHeader';
import { DimensionBreakdown } from '../components/score/DimensionBreakdown';
import { BankRecommendation } from '../components/score/BankRecommendation';
import { ActionPlan } from '../components/score/ActionPlan';

export function SkorKredit() {
  const scoreResult = useScore();
  const { state } = useAppContext();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analisis Kesiapan Kredit</h1>
        <p className="text-gray-500 text-sm mt-1">Mengukur seberapa siap usaha Anda mendapat fasilitas pinjaman bank berdasarkan standar umum perbankan.</p>
      </div>

      <ScoreHeader score={scoreResult.total} tier={scoreResult.tier} />
      
      <DimensionBreakdown breakdown={scoreResult.breakdown} />
      
      <BankRecommendation score={scoreResult.total} dokumen={state.dokumen} />
      
      <ActionPlan scoreResult={scoreResult} dokumen={state.dokumen} profil={state.profil} />
      
    </div>
  );
}
