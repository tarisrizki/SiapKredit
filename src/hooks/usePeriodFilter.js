import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';

export function usePeriodFilter() {
  const { state, dispatch } = useAppContext();
  const { transaksi, ui: { period } } = state;

  const filteredTransactions = useMemo(() => {
    if (!transaksi || transaksi.length === 0) return [];
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    
    let pastDate = new Date();
    pastDate.setHours(0, 0, 0, 0);

    if (period === '7H') {
      pastDate.setDate(now.getDate() - 7);
    } else if (period === '30H') {
      pastDate.setDate(now.getDate() - 30);
    } else if (period === '3B') {
      pastDate.setMonth(now.getMonth() - 3);
    } else if (period === '6B') {
      pastDate.setMonth(now.getMonth() - 6);
    } else {
      pastDate.setFullYear(2000); // Semua data
    }

    return transaksi.filter(t => {
      const d = new Date(t.date);
      return d >= pastDate && d <= now;
    }).sort((a, b) => new Date(b.date) - new Date(a.date) || b.createdAt - a.createdAt);
  }, [transaksi, period]);

  const setPeriod = (newPeriod) => {
    dispatch({ type: 'SET_PERIOD', payload: newPeriod });
  };

  return { period, filteredTransactions, setPeriod };
}
