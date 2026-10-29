import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { RollingText } from './RollingText';

export function Navbar() {
  const { path } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [path]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Proyectos', href: '/work' },
    { label: 'Scaler', href: '/scaler' },
    { label: 'Perfil', href: '/about' },
    { label: 'Bitácora', href: '/updates' },
    { label: 'Contacto', href: '/contact' },
  ];

  const isHomePage = path === '/' || path === '';
  const isTransparent = isHomePage && !scrolled && !mobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-4 sm:py-5 ${
          isTransparent
            ? 'bg-transparent text-white'
            : 'bg-[var(--bg)]/90 backdrop-blur-md text-[var(--text)]'
        }`}
      >
        <div className="w-full flex items-center justify-between flex-nowrap gap-4 sm:gap-8">
          
          {/* Brand Name / Signature */}
          <Link
            to="/"
            className={`flex items-center gap-2.5 group/brand focus-visible:outline-2 shrink-0 min-h-[38px] transition-colors ${
              isTransparent ? 'text-white' : 'text-[var(--text)]'
            }`}
            aria-label="Inicio Alejandro Rivera"
          >
            <span className="font-sans font-bold text-base sm:text-lg tracking-tight whitespace-nowrap">
              <RollingText 
                text="Alejandro Rivera" 
                lineClassName={`font-bold transition-colors ${isTransparent ? 'text-white' : 'text-[var(--text)]'}`} 
                duplicateClassName={`font-bold transition-colors ${isTransparent ? 'text-white/70' : 'text-[var(--text-muted)]'}`} 
              />
            </span>
          </Link>

          {/* Navigation Links: Restrained, sophisticated typography */}
          <nav
            className="hidden md:flex items-center shrink-0 gap-7 lg:gap-9 text-xs sm:text-[13px] tracking-tight font-medium"
            aria-label="Navegación principal"
          >
            {navLinks.map((item) => {
              const isActive = path === item.href || (item.href !== '/' && path.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`transition-colors py-1 relative flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? isTransparent
                        ? 'text-white font-semibold'
                        : 'text-[var(--text)] font-semibold'
                      : isTransparent
                        ? 'text-white/75 hover:text-white'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {isActive && (
                    <span 
                      className={`w-1.5 h-1.5 rounded-full inline-block transition-colors ${
                        isTransparent ? 'bg-white' : 'bg-[var(--text)]'
                      }`} 
                      aria-hidden="true" 
                    />
                  )}
                  <RollingText 
                    text={item.label} 
                    lineClassName="transition-colors"
                    duplicateClassName={
                      isTransparent
                        ? 'text-white font-semibold'
                        : isActive 
                          ? 'text-[var(--text)] font-semibold' 
                          : 'text-[var(--text)]'
                    } 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side controls: Theme switch, CTA button, Mobile hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                isTransparent
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/40'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--text)]'
              } hover:scale-105 active:scale-95`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </button>

            {/* CTA Button: Friendly, natural */}
            <Link
              to="/contact"
              className={`hidden sm:inline-flex items-center text-xs font-semibold px-4 py-2 min-h-[38px] rounded-[3px] transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer ${
                isTransparent
                  ? 'bg-white text-black hover:bg-neutral-200 shadow-sm'
                  : 'bg-[var(--primary)] text-[var(--on-accent)] hover:bg-[var(--primary-hover)] shadow-xs'
              }`}
            >
              <RollingText 
                text="Hablemos" 
                lineClassName="font-semibold"
                duplicateClassName={isTransparent ? 'text-black' : 'text-[var(--on-accent)]'} 
              />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden min-h-[40px] min-w-[40px] flex items-center justify-center p-1.5 cursor-pointer shrink-0 transition-colors ${
                isTransparent ? 'text-white' : 'text-[var(--text)]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Clean full-screen overlay experience matching Hypereffekt) */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[var(--bg)] text-[var(--text)] flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 overflow-y-auto animate-in fade-in duration-200 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil"
        >
          <nav className="flex flex-col space-y-4 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2 block">
              Navegación
            </span>
            {navLinks.map((item, idx) => {
              const isActive = path === item.href || (item.href !== '/' && path.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl sm:text-3xl font-bold tracking-tight py-2 border-b border-[var(--border)] flex items-center justify-between transition-colors ${
                    isActive ? 'text-[var(--text)] pl-2 border-l-2 border-l-[var(--text)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-40" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-[var(--border)] space-y-4">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3.5 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              Hablemos
            </Link>
            
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-2">
              <span>Alejandro Rivera</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 hover:text-[var(--text)]"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
