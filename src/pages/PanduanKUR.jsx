import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PanduanKURSimple } from './PanduanKURSimple';
import { PanduanKURPro } from './PanduanKURPro';

export function PanduanKUR() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <PanduanKURSimple /> : <PanduanKURPro />;
}
