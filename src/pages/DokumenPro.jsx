import React from 'react';
import { useAppContext } from '../context/AppContext';
import { documentList } from '../data/documentList';
import { DocumentItem } from '../components/documents/DocumentItem';
import { DocumentProgress } from '../components/documents/DocumentProgress';
import { Info } from 'lucide-react';

export function Dokumen() {
  const { state, dispatch } = useAppContext();
  const { dokumen } = state;
  const total = documentList.length;
  const completed = documentList.filter(doc => dokumen[doc.id]).length;
  const percentage = Math.round((completed / total) * 100);

  const handleToggle = (id) => {
    dispatch({ 
      type: 'UPDATE_DOKUMEN', 
      payload: { [id]: !dokumen[id] } 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Checklist Dokumen KUR</h1>
        <p className="text-gray-500 text-sm mt-1">Lengkapi dokumen-dokumen di bawah ini untuk meningkatkan peluang persetujuan kredit Anda.</p>
      </div>

      <DocumentProgress dokumen={dokumen} documentList={documentList} />

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 mb-6">
        <Info className="text-brand-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-semibold text-brand-800 text-sm">Penting untuk diketahui</h4>
          <p className="text-brand-700 text-sm mt-1 leading-relaxed">
            Lebih dari 50% pengajuan KUR UMKM ditolak di awal karena ketidaklengkapan dokumen legalitas (terutama NIB). Pastikan dokumen wajib telah Anda miliki sebelum datang ke Bank.
          </p>
        </div>
      </div>

      <div className="space-y-1">
        {documentList.map((doc) => (
          <DocumentItem 
            key={doc.id}
            doc={doc}
            isDone={dokumen[doc.id]}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
