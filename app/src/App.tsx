import { useState, useCallback } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import AnimatedOrbs from '@/components/AnimatedOrbs';
import LoadingScreen from '@/components/LoadingScreen';
import OrderModal from '@/components/OrderModal';
import FloatingButtons from '@/components/FloatingButtons';
import Toast from '@/components/Toast';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Steps from '@/sections/Steps';
import Packages from '@/sections/Packages';
import Payment from '@/sections/Payment';
import Footer from '@/sections/Footer';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>();
  const [toast, setToast] = useState({ message: '', visible: false });

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const openModal = useCallback((pkgName?: string) => {
    setSelectedPackage(pkgName);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedPackage(undefined);
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-[#F0E6D3] overflow-x-hidden font-cairo">
      <AnimatedOrbs />
      <Header onOrderClick={() => openModal()} />
      
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Steps />
        <div className="section-divider" />
        <Packages onOrderClick={openModal} />
        <Payment />
      </main>

      <Footer />
      <FloatingButtons />
      
      <OrderModal
        isOpen={modalOpen}
        onClose={closeModal}
        selectedPackage={selectedPackage}
      />
      
      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={hideToast}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
