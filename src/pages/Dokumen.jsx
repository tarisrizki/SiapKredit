import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DokumenSimple } from './DokumenSimple';
import { DokumenPro } from './DokumenPro';

export function Dokumen() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <DokumenSimple /> : <DokumenPro />;
}
