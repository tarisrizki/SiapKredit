import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PanduanKUR as PanduanKURSimple } from './PanduanKURSimple';
import { PanduanKUR as PanduanKURPro } from './PanduanKURPro';

export function PanduanKUR() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <PanduanKURSimple /> : <PanduanKURPro />;
}
