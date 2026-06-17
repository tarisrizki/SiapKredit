import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SkorKredit as SkorKreditSimple } from './SkorKreditSimple';
import { SkorKredit as SkorKreditPro } from './SkorKreditPro';

export function SkorKredit() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <SkorKreditSimple /> : <SkorKreditPro />;
}
