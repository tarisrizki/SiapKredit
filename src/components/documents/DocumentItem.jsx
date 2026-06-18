import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';

export function DocumentItem({ doc, isDone, onToggle }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card noPadding className={`mb-3 transition-colors ${isDone ? 'border-success-200 bg-success-50/10' : 'border-gray-200'}`}>
      <div 
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-6 h-6 rounded border ${isDone ? 'bg-success-500 border-success-600' : 'bg-white border-gray-300'}`}>
            {isDone && <Check size={16} className="text-white" />}
          </div>
          <div>
            <h4 className={`font-semibold ${isDone ? 'text-gray-900' : 'text-gray-700'}`}>{doc.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              {doc.poin > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isDone ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-500'}`}>
                  {doc.poin} poin
                </span>
              )}
              {doc.wajib && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-warning-50 text-warning-700 border border-warning-200">
                  WAJIB
                </span>
              )}
              {isDone && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-success-50 text-success-700 border border-success-200">
                  SELESAI
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-gray-400">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-sm animate-fade-in">
          <div className="mb-4">
            <h5 className="font-semibold text-gray-900 mb-1">Kenapa dibutuhkan bank:</h5>
            <p className="text-gray-600 leading-relaxed">{doc.alasan}</p>
          </div>
          
          <div className="mb-4">
            <h5 className="font-semibold text-gray-900 mb-1">Cara mendapatkan/memperbarui:</h5>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{doc.cara}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(doc.id); }}
              className={`flex-1 font-medium py-2 px-4 rounded-lg border transition-colors ${
                isDone 
                  ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' 
                  : 'bg-brand-500 border-brand-600 text-white hover:bg-brand-600'
              }`}
            >
              {isDone ? 'Batalkan Centang' : 'Tandai Sudah Punya ✓'}
            </button>
            
            {doc.link && (
              <a
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex justify-center items-center gap-2 font-medium py-2 px-4 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Buka {doc.link.replace('https://', '')} <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
