import React from 'react';
import { ProgressBar } from '../ui/ProgressBar';

export function DocumentProgress({ dokumen, documentList }) {
  const totalWajib = documentList.filter(d => d.wajib).length;
  const completedWajib = documentList.filter(d => d.wajib && dokumen[d.id]).length;
  
  const total = documentList.length;
  const completed = documentList.filter(doc => dokumen[doc.id]).length;
  
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">Kelengkapan Dokumen</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            <span className="font-medium text-gray-700">{completed} dari {total}</span> terkumpul 
            ({completedWajib}/{totalWajib} dokumen wajib)
          </p>
        </div>
        <span className="text-xl font-bold text-brand-600">{percentage}%</span>
      </div>
      <ProgressBar value={completed} max={total} colorClass={percentage === 100 ? 'bg-success-500' : 'bg-brand-500'} />
    </div>
  );
}
