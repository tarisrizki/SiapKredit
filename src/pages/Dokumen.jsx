import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Dokumen as DokumenSimple } from './DokumenSimple';
import { Dokumen as DokumenPro } from './DokumenPro';

export function Dokumen() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <DokumenSimple /> : <DokumenPro />;
}
