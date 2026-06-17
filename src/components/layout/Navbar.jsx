import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Menu, X, MessageSquare, LayoutDashboard, Award, FileCheck, BookOpen } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                    location.pathname === link.path
                      ? 'border-brand-500 text-brand-500'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
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
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium ${
                    location.pathname === link.path
                      ? 'text-brand-600 bg-brand-50 border-l-4 border-brand-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
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
