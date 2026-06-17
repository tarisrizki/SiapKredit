import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DashboardSimple } from './DashboardSimple';
import { DashboardPro } from './DashboardPro';

export function Dashboard() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <DashboardSimple /> : <DashboardPro />;
}
