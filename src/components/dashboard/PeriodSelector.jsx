import React from 'react';

export function PeriodSelector({ selected, onChange }) {
  const periods = [
    { id: '7H', label: '7 Hari' },
    { id: '30H', label: '30 Hari' },
    { id: '3B', label: '3 Bulan' },
    { id: '6B', label: '6 Bulan' },
    { id: 'Semua', label: 'Semua' }
  ];

  return (
    <div className="inline-flex bg-gray-100 p-1 rounded-lg no-print overflow-x-auto max-w-full">
      {periods.map(period => (
        <button
          key={period.id}
          onClick={() => onChange(period.id)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
            selected === period.id 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
