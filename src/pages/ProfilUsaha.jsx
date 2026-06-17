import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ProfilUsahaSimple } from './ProfilUsahaSimple';
import { ProfilUsahaPro } from './ProfilUsahaPro';

export function ProfilUsaha() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <ProfilUsahaSimple /> : <ProfilUsahaPro />;
}
