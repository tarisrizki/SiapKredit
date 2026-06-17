import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { sampleTransactions, sampleProfile, sampleDocuments } from '../utils/sampleData';

const AppContext = createContext();

const initialState = {
  transaksi: [],
  dokumen: {
    ktp: false,
    kk: false,
    nib: false,
    npwp: false,
    sku: false,
    laporanKeuangan: false,
    nota: false,
    fotoUsaha: false,
  },
  profil: {
    namaUsaha: '',
    jenisUsaha: 'Lainnya',
    lamaUsaha: '<6 bulan',
    kota: '',
    omsetPerBulan: '<1 juta',
    keuanganTerpisah: false,
    setupDone: false
  },
  chatHistory: [
    { sender: 'sistem', text: 'Halo! Saya asisten SiapKredit. Catat pengeluaran dan pemasukan harian Anda di sini ya. Contoh: "Jual 5 porsi soto @15rb" atau "Beli token listrik 50.000".' }
  ],
  uiMode: 'simple', // 'simple' or 'pro'
  ui: {
    isOnboarded: false,
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_UI_MODE':
      return { ...state, uiMode: state.uiMode === 'simple' ? 'pro' : 'simple' };
    case 'ADD_TRANSAKSI':
      return { ...state, transaksi: [action.payload, ...state.transaksi] };
    case 'DELETE_TRANSAKSI':
      return { ...state, transaksi: state.transaksi.filter(t => t.id !== action.payload) };
    case 'UPDATE_PROFIL':
      return { ...state, profil: { ...state.profil, ...action.payload } };
    case 'UPDATE_DOKUMEN':
      return { ...state, dokumen: { ...state.dokumen, ...action.payload } };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatHistory: [...state.chatHistory, action.payload] };
    case 'SET_PERIOD':
      return { ...state, ui: { ...state.ui, period: action.payload } };
    case 'SET_ONBOARDED':
      return { ...state, ui: { ...state.ui, isOnboarded: action.payload } };
    case 'RESET_DATA':
      return { ...initialState, ui: { ...initialState.ui, isOnboarded: true }, profil: { ...initialState.profil, setupDone: true } };
    case 'LOAD_SAMPLE_DATA':
      return {
        ...state,
        transaksi: sampleTransactions,
        profil: { ...sampleProfile, setupDone: true },
        dokumen: sampleDocuments,
        ui: { ...state.ui, isOnboarded: true },
        chatHistory: [
          ...state.chatHistory,
          { sender: 'sistem', text: 'Data contoh Warung Bu Siti telah dimuat.' }
        ]
      };
    case 'INIT_STATE':
      return action.payload;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  // Use lazy initialization to load from localStorage
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    try {
      const item = window.localStorage.getItem('siapkredit_data');
      return item ? JSON.parse(item) : initial;
    } catch (error) {
      console.error(error);
      return initial;
    }
  });

  // Save to localStorage on every state change
  useEffect(() => {
    try {
      window.localStorage.setItem('siapkredit_data', JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
