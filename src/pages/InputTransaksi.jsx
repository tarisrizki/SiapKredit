import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { ChatBubble } from '../components/transaction/ChatBubble';
import { ParsedPreview } from '../components/transaction/ParsedPreview';
import { parseTransaction } from '../utils/transactionParser';
import { formatRupiah } from '../utils/formatters';
import { Send, Edit3, Loader2 } from 'lucide-react';
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
    
    // Add User Message
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: { sender: 'user', text: userText }
    });

    setIsProcessing(true);
    
    // Simulate slight delay for "AI" processing feel
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
    // Ideally this opens a full form modal.
    // For simplicity, we just reject it and ask user to type again.
    setParsedResult(null);
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: { sender: 'sistem', text: 'Baik, silakan ketik ulang detail transaksinya.' }
    });
  };

  // Hitung ringkasan hari ini
  const today = new Date().toISOString().split('T')[0];
  const trxToday = state.transaksi.filter(t => t.date === today);
  const inToday = trxToday.filter(t => t.type === 'pemasukan').reduce((a, b) => a + b.amount, 0);
  const outToday = trxToday.filter(t => t.type === 'pengeluaran').reduce((a, b) => a + b.amount, 0);
  const netToday = inToday - outToday;

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-64px)] flex flex-col md:flex-row bg-white sm:border-x sm:border-gray-200 shadow-sm">
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-full">
        <div className="p-4 border-b border-gray-100 bg-white/80 backdrop-blur sticky top-0 z-10 flex justify-between items-center">
           <div>
             <h2 className="font-bold text-gray-900">Catat Transaksi</h2>
             <p className="text-xs text-gray-500">Ketik apa saja dengan bahasa sehari-hari</p>
           </div>
           {/* Mobile summary quick peek */}
           <div className="md:hidden text-right">
              <p className="text-xs font-medium text-success-600">In: {formatRupiah(inToday)}</p>
              <p className="text-xs font-medium text-danger-600">Out: {formatRupiah(outToday)}</p>
           </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          {state.chatHistory.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} />
          ))}
          
          {isProcessing && (
            <div className="flex w-full mb-4 justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm">
                <Loader2 size={18} className="animate-spin text-brand-500" />
              </div>
            </div>
          )}

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
        <div className="p-3 bg-white border-t border-gray-200">
           {/* Quick shortcuts */}
           <div className="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar">
             <button onClick={() => setInputText('Jual ... Rp ...')} className="shrink-0 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-full transition-colors">+ Penjualan</button>
             <button onClick={() => setInputText('Bayar listrik ...')} className="shrink-0 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-full transition-colors">+ Pengeluaran</button>
             <button onClick={() => setInputText('Beli stok bahan ...')} className="shrink-0 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-full transition-colors">+ HPP</button>
           </div>

          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <div className="flex-1 bg-gray-100 rounded-2xl border border-transparent focus-within:border-brand-500 focus-within:bg-white transition-all overflow-hidden">
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
                className="w-full bg-transparent p-3 max-h-32 min-h-[44px] resize-none focus:outline-none text-sm"
                rows={1}
                disabled={parsedResult !== null}
              />
            </div>
            <button
              type="submit"
              disabled={!inputText.trim() || parsedResult !== null}
              className="bg-brand-500 text-white p-3 rounded-full hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar Summary (Desktop) */}
      <div className="hidden md:flex flex-col w-64 bg-gray-50 border-l border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4">Hari Ini</h3>
        
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Pemasukan</p>
            <p className="text-lg font-bold text-success-600">{formatRupiah(inToday)}</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Pengeluaran</p>
            <p className="text-lg font-bold text-danger-600">{formatRupiah(outToday)}</p>
          </div>
          
          <div className={`p-3 rounded-lg border ${netToday >= 0 ? 'bg-brand-50 border-brand-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-xs text-gray-600 mb-1">Saldo Bersih</p>
            <p className={`text-xl font-bold ${netToday >= 0 ? 'text-brand-700' : 'text-danger-700'}`}>
              {formatRupiah(netToday)}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
