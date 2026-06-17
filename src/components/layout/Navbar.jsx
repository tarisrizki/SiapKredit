import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Menu, X, MessageSquare, LayoutDashboard, Award, FileCheck, BookOpen, Settings, Zap } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useAppContext();

  const toggleMode = () => {
    dispatch({ type: 'TOGGLE_UI_MODE' });
  };

  const navLinks = [
    { name: 'Input Transaksi', path: '/input', icon: <MessageSquare size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Skor Kredit', path: '/skor', icon: <Award size={18} /> },
    { name: 'Dokumen', path: '/dokumen', icon: <FileCheck size={18} /> },
    { name: 'Panduan KUR', path: '/kur', icon: <BookOpen size={18} /> },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="bg-brand-500 text-white p-1.5 rounded-lg">
                  <TrendingUp size={24} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">SiapKredit</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <div className="flex bg-muted/50 p-1 rounded-full items-center mr-2 border border-border">
            <button 
              onClick={() => state.uiMode !== 'simple' && toggleMode()}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${state.uiMode === 'simple' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              title="Mode Awam"
            >
              <Zap size={14} />
              Simple
            </button>
            <button 
              onClick={() => state.uiMode !== 'pro' && toggleMode()}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${state.uiMode === 'pro' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              title="Mode Lengkap"
            >
              <Settings size={14} />
              Pro
            </button>
          </div>
          
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 min-w-[44px] min-h-[44px]"
              >
                <span className="sr-only">Buka menu utama</span>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-gray-900/50 flex md:hidden">
          <div className="bg-white w-3/4 max-w-sm h-full shadow-xl flex flex-col animate-slide-in">
            <div className="px-4 pt-5 pb-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                 <div className="bg-brand-500 text-white p-1.5 rounded-lg">
                  <TrendingUp size={20} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-lg text-gray-900">SiapKredit</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none min-w-[44px] min-h-[44px]"
              >
                <X size={24} />
              </button>
            </div>
            <div className="pt-2 pb-4 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium mx-4 ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              <div className="flex bg-muted/50 p-1 rounded-full items-center mx-4 mt-4 border border-border">
                <button 
                  onClick={() => { if(state.uiMode !== 'simple') toggleMode(); setIsOpen(false); }}
                  className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all flex justify-center items-center gap-1.5 ${state.uiMode === 'simple' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                >
                  <Zap size={16} /> Simple
                </button>
                <button 
                  onClick={() => { if(state.uiMode !== 'pro') toggleMode(); setIsOpen(false); }}
                  className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all flex justify-center items-center gap-1.5 ${state.uiMode === 'pro' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                >
                  <Settings size={16} /> Pro
                </button>
              </div>
              <div className="mt-8 px-4">
                 <Link
                  to="/profil"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Profil Usaha
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}
