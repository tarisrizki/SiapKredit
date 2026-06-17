import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Dashboard as DashboardSimple } from './DashboardSimple';
import { Dashboard as DashboardPro } from './DashboardPro';

export function Dashboard() {
  const { state } = useAppContext();
  return state.uiMode === 'simple' ? <DashboardSimple /> : <DashboardPro />;
}
