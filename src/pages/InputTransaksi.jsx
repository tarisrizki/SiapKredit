import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { ChatBubble } from '../components/transaction/ChatBubble';
import { ParsedPreview } from '../components/transaction/ParsedPreview';
import { parseTransaction } from '../utils/transactionParser';
import { formatRupiah } from '../utils/formatters';
import { Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export function InputTransaksi() {
  const { state, dispatch } = useAppContext();
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedResult, setParsedResult] = useState(null);
  
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory, parsedResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing || parsedResult) return;

    const userText = inputText.trim();
    setInputText('');
    
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: { sender: 'user', text: userText }
    });

    setIsProcessing(true);
    
    setTimeout(() => {
      const result = parseTransaction(userText);
      setIsProcessing(false);

      if (result) {
        setParsedResult(result);
      } else {
        dispatch({
          type: 'ADD_CHAT_MESSAGE',
          payload: { 
            sender: 'sistem', 
            text: 'Hmm, saya kurang mengerti nominal atau transaksinya. Coba format seperti: "Jual baju 50rb" atau "Bayar listrik 150.000".' 
          }
        });
      }
    }, 600);
  };

  const handleSave = (data) => {
    const newTrx = {
      ...data,
      id: `trx-${Date.now()}`,
      createdAt: Date.now(),
      isManual: false
    };

    dispatch({ type: 'ADD_TRANSAKSI', payload: newTrx });
    setParsedResult(null);
    
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: { sender: 'sistem', text: `Sip! Transaksi ${data.type} sebesar ${formatRupiah(data.amount)} berhasil dicatat.` }
    });

    toast.success('Transaksi disimpan! Skor kredit Anda diperbarui.');
  };

  const handleEdit = () => {
    setParsedResult(null);
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: { sender: 'sistem', text: 'Baik, silakan ketik ulang detail transaksinya.' }
    });
  };

  const today = new Date().toISOString().split('T')[0];
  const trxToday = state.transaksi.filter(t => t.date === today);
  const inToday = trxToday.filter(t => t.type === 'pemasukan').reduce((a, b) => a + b.amount, 0);
  const outToday = trxToday.filter(t => t.type === 'pengeluaran').reduce((a, b) => a + b.amount, 0);
  const netToday = inToday - outToday;

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-64px)] flex flex-col md:flex-row bg-background sm:border-x shadow-sm">
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-full">
        <div className="p-4 border-b bg-background/80 backdrop-blur sticky top-0 z-10 flex justify-between items-center shadow-sm">
           <div>
             <h2 className="font-bold text-foreground">Catat Transaksi</h2>
             <p className="text-xs text-muted-foreground">Ketik dengan bahasa sehari-hari</p>
           </div>
           <div className="md:hidden text-right">
              <p className="text-xs font-medium text-success-600">In: {formatRupiah(inToday)}</p>
              <p className="text-xs font-medium text-danger-600">Out: {formatRupiah(outToday)}</p>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
          <AnimatePresence>
            {state.chatHistory.map((msg, idx) => (
              <ChatBubble key={idx} message={msg} />
            ))}
            
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex w-full mb-4 justify-start"
              >
                <div className="bg-card px-4 py-3 rounded-2xl rounded-tl-sm border shadow-sm flex gap-2 items-center">
                  <Loader2 size={16} className="animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Sedang memproses...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {parsedResult && (
            <ParsedPreview 
              parsedData={parsedResult} 
              onSave={handleSave} 
              onEdit={handleEdit} 
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-background border-t">
           <div className="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar">
             <button onClick={() => setInputText('Jual ... Rp ...')} className="shrink-0 text-xs bg-muted hover:bg-muted/80 text-foreground py-1.5 px-3 rounded-full transition-colors">+ Penjualan</button>
             <button onClick={() => setInputText('Bayar listrik ...')} className="shrink-0 text-xs bg-muted hover:bg-muted/80 text-foreground py-1.5 px-3 rounded-full transition-colors">+ Pengeluaran</button>
             <button onClick={() => setInputText('Beli stok bahan ...')} className="shrink-0 text-xs bg-muted hover:bg-muted/80 text-foreground py-1.5 px-3 rounded-full transition-colors">+ HPP</button>
           </div>

          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <div className="flex-1 bg-muted/50 rounded-2xl border border-transparent focus-within:border-primary focus-within:bg-background transition-all overflow-hidden shadow-sm">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ketik transaksi di sini..."
                className="w-full bg-transparent p-3 max-h-32 min-h-[48px] resize-none focus:outline-none text-sm"
                rows={1}
                disabled={parsedResult !== null}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!inputText.trim() || parsedResult !== null}
              className="bg-primary text-primary-foreground p-3.5 rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-md"
            >
              <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
            </motion.button>
          </form>
        </div>
      </div>

      {/* Sidebar Summary (Desktop) */}
      <div className="hidden md:flex flex-col w-72 bg-card border-l p-5">
        <h3 className="font-bold text-foreground mb-4">Ringkasan Hari Ini</h3>
        
        <div className="space-y-4">
          <div className="bg-background p-4 rounded-xl border shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">Pemasukan</p>
            <p className="text-lg font-bold text-success-600">{formatRupiah(inToday)}</p>
          </div>
          
          <div className="bg-background p-4 rounded-xl border shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">Pengeluaran</p>
            <p className="text-lg font-bold text-danger-600">{formatRupiah(outToday)}</p>
          </div>
          
          <div className={`p-4 rounded-xl border ${netToday >= 0 ? 'bg-primary/5 border-primary/20' : 'bg-destructive/5 border-destructive/20'}`}>
            <p className="text-xs font-medium text-muted-foreground mb-1">Saldo Bersih</p>
            <p className={`text-2xl font-black tracking-tight ${netToday >= 0 ? 'text-primary' : 'text-destructive'}`}>
              {formatRupiah(netToday)}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
