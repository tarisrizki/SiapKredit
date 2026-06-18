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
  kategoriCustomMasuk: [],
  kategoriCustomKeluar: [],
  uiMode: 'simple', // 'simple' or 'pro'
  ui: {
    isOnboarded: false,
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_KATEGORI':
      if (action.payload.type === 'pemasukan') {
        return { ...state, kategoriCustomMasuk: [...new Set([...(state.kategoriCustomMasuk || []), action.payload.name])] };
      }
      return { ...state, kategoriCustomKeluar: [...new Set([...(state.kategoriCustomKeluar || []), action.payload.name])] };
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

import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    try {
      const savedMode = window.localStorage.getItem('siapkredit_uimode');
      if (savedMode === 'simple' || savedMode === 'pro') {
        return { ...initial, uiMode: savedMode };
      }
    } catch (error) {
      console.error("Gagal membaca uiMode dari localStorage:", error);
    }
    return initial;
  });

  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      if (!isSupabaseConfigured()) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [txRes, profRes, dokRes] = await Promise.all([
        supabase.from('transaksi').select('*').order('date', { ascending: false }),
        supabase.from('profil').select('*').single(),
        supabase.from('dokumen').select('*').single()
      ]);

      if (txRes.data) {
        dispatch({ type: 'INIT_STATE', payload: { ...state, transaksi: txRes.data } });
      }
      
      let newProfil = initialState.profil;
      if (profRes.data) {
        newProfil = { ...initialState.profil, ...profRes.data, setupDone: true };
      }
      
      let newDokumen = initialState.dokumen;
      if (dokRes.data) {
        newDokumen = { ...initialState.dokumen, ...dokRes.data };
      }

      dispatch({ type: 'INIT_STATE', payload: { ...state, transaksi: txRes.data || [], profil: newProfil, dokumen: newDokumen } });
    }
    loadData();
  }, []);

  // Simpan uiMode ke local storage setiap kali berubah
  useEffect(() => {
    try {
      window.localStorage.setItem('siapkredit_uimode', state.uiMode);
    } catch (error) {
      console.error("Gagal menyimpan uiMode:", error);
    }
  }, [state.uiMode]);

  // Middleware Dispatch
  const asyncDispatch = async (action) => {
    // 1. Lakukan perubahan lokal secara optimis (agar UI cepat merespons)
    dispatch(action);

    // 2. Jika Supabase tidak dikonfigurasi, cukup sampai di sini
    if (!isSupabaseConfigured()) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    try {
      if (action.type === 'ADD_TRANSAKSI') {
        await supabase.from('transaksi').insert({
          id: action.payload.id,
          user_id: session.user.id,
          type: action.payload.type,
          amount: action.payload.amount,
          category: action.payload.category,
          description: action.payload.description,
          date: action.payload.date
        });
      } else if (action.type === 'DELETE_TRANSAKSI') {
        await supabase.from('transaksi').delete().eq('id', action.payload);
      } else if (action.type === 'UPDATE_PROFIL') {
        const newProfil = { ...state.profil, ...action.payload };
        await supabase.from('profil').upsert({
          id: session.user.id,
          namaUsaha: newProfil.namaUsaha,
          jenisUsaha: newProfil.jenisUsaha,
          lamaUsaha: newProfil.lamaUsaha,
          kota: newProfil.kota,
          omsetPerBulan: newProfil.omsetPerBulan,
          keuanganTerpisah: newProfil.keuanganTerpisah
        });
      } else if (action.type === 'UPDATE_DOKUMEN') {
        const newDokumen = { ...state.dokumen, ...action.payload };
        await supabase.from('dokumen').upsert({
          id: session.user.id,
          ktp: newDokumen.ktp,
          kk: newDokumen.kk,
          nib: newDokumen.nib,
          npwp: newDokumen.npwp,
          fotoUsaha: newDokumen.fotoUsaha,
          rekeningBank: newDokumen.rekeningBank,
          bpjsTK: newDokumen.bpjsTK
        });
      }
    } catch (err) {
      console.error("Supabase Sync Error:", err);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch: asyncDispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
