import React from 'react';
import { formatRupiah, formatTanggalSingkat } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function TransactionRow({ transaction, onDelete, readOnly = false }) {
  const isPemasukan = transaction.type === 'pemasukan';

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isPemasukan ? 'bg-success-100 text-success-600' : 'bg-danger-100 text-danger-600'}`}>
          {isPemasukan ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm line-clamp-1">{transaction.description}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500">{formatTanggalSingkat(transaction.date)}</span>
            <span className="text-gray-300 text-xs">•</span>
            <Badge variant="gray" className="text-[10px] px-1.5">{transaction.category}</Badge>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className={`font-semibold text-sm ${isPemasukan ? 'text-success-600' : 'text-gray-900'}`}>
          {isPemasukan ? '+' : '-'}{formatRupiah(transaction.amount)}
        </span>
        {!readOnly && onDelete && (
          <button 
            onClick={() => onDelete(transaction.id)}
            className="text-gray-400 hover:text-danger-500 p-1"
            title="Hapus transaksi"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
