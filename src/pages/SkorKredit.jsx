import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SkorKreditSimple } from './SkorKreditSimple';
import { SkorKreditPro } from './SkorKreditPro';

export function SkorKredit() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <SkorKreditSimple /> : <SkorKreditPro />;
}
