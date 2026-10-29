import React, { useEffect, useState } from 'react';
import { RouterProvider, useRouter, Link } from './context/RouterContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { AtelierBackdrop } from './components/AtelierBackdrop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ScalerPage } from './pages/ScalerPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { ContactPage } from './pages/ContactPage';
import { ArrowUp } from 'lucide-react';

function AppContent() {
  const { path } = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching
  const renderCurrentPage = () => {
    if (path === '/' || path === '') {
      return <HomePage />;
    }
    if (path === '/about') {
      return <AboutPage />;
    }
    if (path === '/work') {
      return <WorkPage />;
    }
    if (path.startsWith('/work/')) {
      return <ProjectDetailPage />;
    }
    if (path === '/scaler') {
      return <ScalerPage />;
    }
    if (path === '/updates') {
      return <UpdatesPage />;
    }
    if (path === '/contact') {
      return <ContactPage />;
    }

    // 404 Fallback
    return (
      <div className="pt-40 pb-32 px-6 text-center max-w-2xl mx-auto min-h-[70vh] flex flex-col items-center justify-center font-sans">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 mb-4 block">
          404 • PÁGINA NO ENCONTRADA
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-black dark:text-white mb-6">
          Página no encontrada
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-8 leading-relaxed">
          La ruta solicitada no existe o ha sido reubicada dentro del portafolio.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flat-btn-primary !bg-[#1D4ED8] !border-[#1D4ED8] !text-white hover:!bg-[#1e40af]"
          >
            Volver al inicio
          </Link>
          <Link
            to="/work"
            className="flat-btn-secondary"
          >
            Explorar proyectos
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 selection:bg-[#1D4ED8] selection:text-white dark:selection:bg-[#1D4ED8] dark:selection:text-white flex flex-col justify-between relative transition-colors duration-200">
      {/* Skip to Content Link for Keyboard and Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#111215] text-white dark:bg-white dark:text-black rounded-full shadow-xl outline-none ring-2 ring-[#1D4ED8] text-xs font-mono font-medium"
      >
        Saltar al contenido principal
      </a>

      {/* Architectural Atelier Canvas Backdrop */}
      <AtelierBackdrop />

      <CustomCursor />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {renderCurrentPage()}
      </main>

      <Footer />

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-neutral-900/[0.1] dark:border-white/[0.12] shadow-xl backdrop-blur-xl hover:scale-110 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] dark:focus-visible:ring-[#3B82F6]"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
}
export default App;
