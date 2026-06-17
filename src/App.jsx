import React from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { Toaster } from 'react-hot-toast';

// Pages
import { Landing } from './pages/Landing';
import { InputTransaksi } from './pages/InputTransaksi';
import { Dashboard } from './pages/Dashboard';
import { SkorKredit } from './pages/SkorKredit';
import { Dokumen } from './pages/Dokumen';
import { PanduanKUR } from './pages/PanduanKUR';
import { ProfilUsaha } from './pages/ProfilUsaha';

function OnboardingGate({ children }) {
  const { state } = useAppContext();
  
  return (
    <>
      {!state.profil.setupDone && <OnboardingWizard />}
      {children}
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans bg-[#F8F9FA] text-[#111827]">
        <OnboardingGate>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/input" element={<InputTransaksi />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/skor" element={<SkorKredit />} />
              <Route path="/dokumen" element={<Dokumen />} />
              <Route path="/kur" element={<PanduanKUR />} />
              <Route path="/profil" element={<ProfilUsaha />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#F0FDF4',
                  color: '#16A34A',
                  border: '1px solid #BBF7D0',
                },
              },
            }}
          />
        </OnboardingGate>
      </div>
    </HashRouter>
  );
}

export default App;
