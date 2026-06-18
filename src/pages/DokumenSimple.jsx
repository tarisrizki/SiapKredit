import React from 'react';
import { useAppContext } from '../context/AppContext';
import { documentList } from '../data/documentList';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dokumen() {
  const { state, dispatch } = useAppContext();
  const { dokumen } = state;

  const handleToggle = (id) => {
    dispatch({ 
      type: 'UPDATE_DOKUMEN', 
      payload: { [id]: !dokumen[id] } 
    });
  };

  const total = documentList.length;
  const completed = documentList.filter(doc => dokumen[doc.id]).length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Surat & Dokumen</h1>
        <p className="text-base text-muted-foreground">Centang yang sudah Anda punya.</p>
      </div>

      <div className="bg-white p-5 rounded-2xl border shadow-sm mb-6 text-center">
        <p className="text-muted-foreground font-semibold text-base mb-2">Terkumpul {completed} dari {total}</p>
        <div className="mb-3">
          <ProgressBar value={percentage} className="h-5" colorClass={percentage === 100 ? 'bg-success-500' : 'bg-primary'} />
        </div>
        <p className="text-2xl font-bold text-primary">{percentage}% Lengkap</p>
      </div>

      <div className="space-y-4">
        {documentList.map((doc) => {
          const isDone = dokumen[doc.id];
          return (
            <motion.button 
              key={doc.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggle(doc.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 shadow-sm ${
                isDone 
                  ? 'border-success-500 bg-success-50' 
                  : 'border-border bg-white hover:border-primary/50'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 size={32} className="text-success-500" />
                ) : (
                  <Circle size={32} className="text-muted-foreground/30" />
                )}
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-0.5 ${isDone ? 'text-success-800' : 'text-foreground'}`}>
                  {doc.name}
                </h3>
                {doc.wajib && (
                  <span className="inline-block bg-danger-100 text-danger-700 text-xs font-bold px-2 py-0.5 rounded-full mb-1.5">
                    WAJIB ADA
                  </span>
                )}
                <p className={`text-sm leading-snug ${isDone ? 'text-success-700/80' : 'text-muted-foreground'}`}>
                  {doc.alasan}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
