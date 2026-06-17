import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, HashRouter, useLocation } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Lazy load pages for Code Splitting (optimizes bundle size and load time)
const Landing = lazy(() => import('./pages/Landing').then(m => ({ default: m.Landing })));
const InputTransaksi = lazy(() => import('./pages/InputTransaksi').then(m => ({ default: m.InputTransaksi })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const SkorKredit = lazy(() => import('./pages/SkorKredit').then(m => ({ default: m.SkorKredit })));
const Dokumen = lazy(() => import('./pages/Dokumen').then(m => ({ default: m.Dokumen })));
const PanduanKUR = lazy(() => import('./pages/PanduanKUR').then(m => ({ default: m.PanduanKUR })));
const ProfilUsaha = lazy(() => import('./pages/ProfilUsaha').then(m => ({ default: m.ProfilUsaha })));

// Loading Fallback Component
const PageLoading = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <Loader2 className="animate-spin text-primary w-8 h-8" />
  </div>
);

function OnboardingGate({ children }) {
  const { state } = useAppContext();
  return (
    <>
      {!state.profil.setupDone && <OnboardingWizard />}
      {children}
    </>
  );
}

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/input" element={<PageWrapper><InputTransaksi /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/skor" element={<PageWrapper><SkorKredit /></PageWrapper>} />
        <Route path="/dokumen" element={<PageWrapper><Dokumen /></PageWrapper>} />
        <Route path="/kur" element={<PageWrapper><PanduanKUR /></PageWrapper>} />
        <Route path="/profil" element={<PageWrapper><ProfilUsaha /></PageWrapper>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        <OnboardingGate>
          <Navbar />
          <main className="flex-1 flex flex-col relative">
            <Suspense fallback={<PageLoading />}>
              <AnimatedRoutes />
            </Suspense>
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
                  background: 'var(--success-50, #F0FDF4)',
                  color: 'var(--success-600, #16A34A)',
                  border: '1px solid var(--success-200, #BBF7D0)',
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
