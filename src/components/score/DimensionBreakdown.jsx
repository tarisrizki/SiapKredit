import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

export function DimensionBreakdown({ breakdown }) {
  const dimensions = [
    { id: 'dokumen', title: 'Kelengkapan Dokumen', score: breakdown.dokumen, max: 25, color: 'bg-blue-500' },
    { id: 'catatan', title: 'Catatan Keuangan', score: breakdown.catatan, max: 30, color: 'bg-emerald-500' },
    { id: 'konsistensi', title: 'Konsistensi Pencatatan', score: breakdown.konsistensi, max: 25, color: 'bg-purple-500' },
    { id: 'profil', title: 'Profil Usaha', score: breakdown.profil, max: 20, color: 'bg-orange-500' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {dimensions.map(dim => (
        <Card key={dim.id} className="h-full flex flex-col p-4 sm:p-5">
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-sm font-semibold text-gray-700 leading-tight pr-2">{dim.title}</h3>
            <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
              {dim.score} <span className="text-gray-400 font-normal">/ {dim.max}</span>
            </span>
          </div>
          <div className="mt-auto pt-2">
            <ProgressBar value={dim.score} max={dim.max} colorClass={dim.color} />
          </div>
        </Card>
      ))}
    </div>
  );
}
