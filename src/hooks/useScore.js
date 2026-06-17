import { useMemo } from 'react';
import { hitungSkor } from '../utils/scoreCalculator';
import { useAppContext } from '../context/AppContext';

export function useScore() {
  const { state } = useAppContext();
  
  const scoreResult = useMemo(() => {
    return hitungSkor(state.transaksi, state.profil, state.dokumen);
  }, [state.transaksi, state.profil, state.dokumen]);

  const getTier = (skor) => {
    if (skor <= 30) return { label: 'Belum Siap', color: 'text-danger-500', bg: 'bg-danger-50', stroke: '#DC2626' };
    if (skor <= 50) return { label: 'Mulai Siap', color: 'text-warning-500', bg: 'bg-warning-50', stroke: '#F59E0B' };
    if (skor <= 70) return { label: 'Siap Kredit', color: 'text-yellow-600', bg: 'bg-yellow-50', stroke: '#CA8A04' }; // kuning-hijau
    if (skor <= 85) return { label: 'Sangat Siap', color: 'text-success-500', bg: 'bg-success-50', stroke: '#28A745' };
    return { label: 'Bankable', color: 'text-success-600', bg: 'bg-success-100', stroke: '#16A34A' };
  };

  const tier = getTier(scoreResult.total);

  return { ...scoreResult, tier };
}
