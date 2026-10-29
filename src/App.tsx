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
    if (path === '/scaler' || path === '/working-on') {
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
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-bounce inline-flex items-center px-8 py-3.5 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-full shadow-md hover:bg-[var(--primary-hover)]"
          >
            Volver al inicio
          </Link>
          <Link
            to="/work"
            className="btn-bounce inline-flex items-center px-8 py-3.5 bg-[var(--surface)] text-[var(--text)] font-semibold text-xs tracking-wider uppercase rounded-full border border-[var(--border)] shadow-xs hover:bg-[var(--surface-raised,var(--surface))]"
          >
            Explorar proyectos
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent text-[var(--text)] flex flex-col justify-between relative transition-colors duration-200">
      {/* Skip to Content Link for Keyboard and Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--primary)] text-[var(--on-accent)] rounded-full shadow-xl outline-none ring-2 ring-[var(--text)] ring-offset-2 ring-offset-[var(--bg)] text-xs font-mono font-medium"
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
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[var(--surface)]/90 text-[var(--text)] border border-[var(--border)] shadow-xl backdrop-blur-xl hover:scale-105 active:scale-95 transition-[transform,background-color,border-color,box-shadow] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
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
