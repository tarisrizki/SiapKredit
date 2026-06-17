import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Check, Edit2 } from 'lucide-react';
import { formatRupiah, formatTanggalPanjang } from '../../utils/formatters';

export function ParsedPreview({ parsedData, onSave, onEdit }) {
  if (!parsedData) return null;

  return (
    <div className="flex w-full mb-4 justify-start">
      <Card className="w-full max-w-[85%] sm:max-w-[75%] border-brand-200 shadow-sm bg-blue-50/30">
        <div className="flex items-center gap-2 mb-3 text-brand-700 font-medium text-sm">
          <Check size={16} />
          <span>Ini yang saya tangkap:</span>
        </div>
        
        <div className="space-y-2 text-sm mb-4 bg-white p-3 rounded-lg border border-gray-100">
          <div className="grid grid-cols-[80px_1fr] gap-2">
            <span className="text-gray-500">Tipe</span>
            <span className="font-medium capitalize text-gray-900">
              {parsedData.type === 'pemasukan' ? (
                <span className="text-success-600">Pemasukan</span>
              ) : (
                <span className="text-danger-600">Pengeluaran</span>
              )}
            </span>
            
            <span className="text-gray-500">Jumlah</span>
            <span className="font-medium text-gray-900">{formatRupiah(parsedData.amount)}</span>
            
            <span className="text-gray-500">Kategori</span>
            <span className="font-medium text-gray-900">{parsedData.category}</span>
            
            <span className="text-gray-500">Keterangan</span>
            <span className="font-medium text-gray-900">{parsedData.description}</span>
            
            <span className="text-gray-500">Tanggal</span>
            <span className="font-medium text-gray-900">{formatTanggalPanjang(parsedData.date)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 text-sm h-10" onClick={onEdit}>
            <Edit2 size={14} className="mr-1" /> Edit
          </Button>
          <Button variant="primary" className="flex-1 text-sm h-10" onClick={() => onSave(parsedData)}>
            <Check size={16} className="mr-1" /> Simpan
          </Button>
        </div>
      </Card>
    </div>
  );
}
