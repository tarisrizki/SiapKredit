import React from 'react';
import { useAppContext } from '../context/AppContext';
import { InputTransaksi as InputTransaksiSimple } from './InputTransaksiSimple';
import { InputTransaksi as InputTransaksiPro } from './InputTransaksiPro';

export function InputTransaksi() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <InputTransaksiSimple /> : <InputTransaksiPro />;
}
