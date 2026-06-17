import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ProfilUsaha as ProfilUsahaSimple } from './ProfilUsahaSimple';
import { ProfilUsaha as ProfilUsahaPro } from './ProfilUsahaPro';

export function ProfilUsaha() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <ProfilUsahaSimple /> : <ProfilUsahaPro />;
}
