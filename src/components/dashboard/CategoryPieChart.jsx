import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { formatRupiah } from '../../utils/formatters';

export function CategoryPieChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Filter only pengeluaran
    const pengeluaran = data.filter(t => t.type === 'pengeluaran');
    
    const grouped = pengeluaran.reduce((acc, trx) => {
      acc[trx.category] = (acc[trx.category] || 0) + trx.amount;
      return acc;
    }, {});

    return Object.keys(grouped).map(key => ({
      name: key,
      value: grouped[key]
    })).sort((a, b) => b.value - a.value); // Sort desc
  }, [data]);

  if (chartData.length === 0) {
    return <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">Tidak ada data pengeluaran</div>;
  }

  // Tailwind Colors
  const COLORS = ['#F59E0B', '#DC2626', '#3B82F6', '#8B5CF6', '#10B981', '#EC4899', '#6B7280'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-lg text-sm">
          <p className="font-semibold" style={{ color: payload[0].payload.fill }}>{payload[0].name}</p>
          <p className="text-gray-900">{formatRupiah(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
