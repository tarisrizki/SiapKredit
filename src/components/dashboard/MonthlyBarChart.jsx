import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatRupiah, formatSingkat } from '../../utils/formatters';

export function MonthlyBarChart({ data }) {
  // Process data for chart
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by month
    const grouped = data.reduce((acc, trx) => {
      const d = new Date(trx.date);
      const monthYear = `${d.toLocaleString('id-ID', { month: 'short' })} ${d.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = { name: monthYear, Pemasukan: 0, Pengeluaran: 0, sortKey: d.getFullYear() * 100 + d.getMonth() };
      }
      
      if (trx.type === 'pemasukan') acc[monthYear].Pemasukan += trx.amount;
      else acc[monthYear].Pengeluaran += trx.amount;
      
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => a.sortKey - b.sortKey);
  }, [data]);

  if (chartData.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-gray-400">Belum ada data untuk chart</div>;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatRupiah(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6B7280' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickFormatter={(value) => formatSingkat(value)}
            width={60}
          />
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
          <Bar dataKey="Pemasukan" fill="#1B4D8E" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="Pengeluaran" fill="#DC2626" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
