import React from 'react';
import { useAppContext } from '../context/AppContext';
import { InputTransaksi as InputTransaksiSimple } from './InputTransaksiSimple';
import { InputTransaksiPro } from './InputTransaksiPro';

export function InputTransaksi() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <InputTransaksiSimple /> : <InputTransaksiPro />;
}
