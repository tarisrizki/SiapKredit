import React from 'react';
import { TransactionRow } from './TransactionRow';
import { EmptyState } from '../ui/EmptyState';
import { Receipt } from 'lucide-react';

export function TransactionList({ transactions, onDelete, readOnly = false }) {
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState 
        icon={Receipt}
        title="Belum ada transaksi"
        description="Data transaksi Anda akan muncul di sini. Mulai catat pemasukan dan pengeluaran Anda."
      />
    );
  }

  // Group by date logic could be added here if needed, 
  // but for now we just map them directly.

  return (
    <div className="space-y-1">
      {transactions.map(trx => (
        <TransactionRow 
          key={trx.id} 
          transaction={trx} 
          onDelete={onDelete}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}
