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

  const isHomePage = path === '/' || path === '';
  const isTransparent = isHomePage && !scrolled && !mobileMenuOpen;
  const isDarkHeroTransparent = isTransparent && theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        const portfolioContent = document.getElementById('portfolio-content');
        if (portfolioContent) {
          const rect = portfolioContent.getBoundingClientRect();
          // Navbar height is ~72px. When portfolio-content reaches the top of viewport, navbar adapts to mode
          setScrolled(rect.top <= 72);
        } else {
          setScrolled(window.scrollY > window.innerHeight * 2.2);
        }
      } else {
        setScrolled(window.scrollY > 30);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [path, isHomePage]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [path]);

  // Handle Escape key to close mobile menu per WAI-ARIA APG
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
    { label: 'Working on', href: '/working-on' },
    { label: 'Perfil', href: '/about' },
    { label: 'Bitácora', href: '/updates' },
    { label: 'Contacto', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 border-b ${
          isTransparent
            ? 'bg-transparent border-transparent'
            : 'bg-[var(--bg)]/90 backdrop-blur-md border-[var(--border)]/40 shadow-xs'
        } ${isDarkHeroTransparent ? 'text-white' : 'text-[var(--text)]'}`}
      >
        <div className="max-w-[1920px] mx-auto w-full flex items-center justify-between flex-nowrap gap-4 sm:gap-8">
          
          {/* Brand Name / Signature */}
          <Link
            to="/"
            className={`flex items-center gap-2.5 group/brand focus-visible:outline-2 shrink-0 min-h-[44px] transition-colors ${
              isDarkHeroTransparent ? 'text-white' : 'text-[var(--text)]'
            }`}
            aria-label="Inicio Alejandro Rivera"
          >
            <span className="font-sans font-bold text-base sm:text-lg tracking-tight whitespace-nowrap">
              <RollingText 
                text="Alejandro Rivera" 
                lineClassName={`font-bold transition-colors ${isDarkHeroTransparent ? 'text-white' : 'text-[var(--text)]'}`} 
                duplicateClassName={`font-bold transition-colors ${isDarkHeroTransparent ? 'text-white/70' : 'text-[var(--text-muted)]'}`} 
              />
            </span>
          </Link>

          {/* Navigation Links: Restrained, sophisticated typography */}
          <nav
            className="hidden md:flex items-center shrink-0 gap-7 lg:gap-9 text-xs sm:text-[13px] tracking-tight font-medium"
            aria-label="Navegación principal"
          >
            {navLinks.map((item) => {
              const isActive =
                path === item.href ||
                (item.href === '/working-on' && (path === '/working-on' || path === '/scaler')) ||
                (item.href !== '/' && path.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`transition-colors py-1 relative flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? isDarkHeroTransparent
                        ? 'text-white font-semibold'
                        : 'text-[var(--text)] font-semibold'
                      : isDarkHeroTransparent
                        ? 'text-white/75 hover:text-white'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {isActive && (
                    <span 
                      className={`w-1.5 h-1.5 rounded-full inline-block transition-colors ${
                        isDarkHeroTransparent ? 'bg-white' : 'bg-[var(--text)]'
                      }`} 
                      aria-hidden="true" 
                    />
                  )}
                  <RollingText 
                    text={item.label} 
                    lineClassName="transition-colors"
                    duplicateClassName={
                      isDarkHeroTransparent
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
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-[transform,background-color,border-color] duration-200 cursor-pointer shrink-0 border ${
                isDarkHeroTransparent
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/40'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--text)]'
              } hover:scale-105 active:scale-95`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>

            {/* CTA Button: Friendly, natural */}
            <Link
              to="/contact"
              className={`hidden sm:inline-flex items-center text-xs font-semibold px-4 py-2 min-h-[38px] rounded-full transition-[background-color,color,transform] active:scale-95 whitespace-nowrap shrink-0 cursor-pointer ${
                isDarkHeroTransparent
                  ? 'bg-white text-black hover:bg-neutral-200 shadow-sm'
                  : 'bg-[var(--primary)] text-[var(--on-accent)] hover:bg-[var(--primary-hover)] shadow-xs'
              }`}
            >
              <RollingText 
                text="Hablemos" 
                lineClassName="font-semibold"
                duplicateClassName={isDarkHeroTransparent ? 'text-black' : 'text-[var(--on-accent)]'} 
              />
            </Link>

            {/* Mobile Hamburger Toggle (Touch target >= 44x44px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 cursor-pointer shrink-0 transition-colors ${
                isDarkHeroTransparent ? 'text-white' : 'text-[var(--text)]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Overscroll contained, modal semantics per APG) */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[var(--bg)] text-[var(--text)] flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 overflow-y-auto overscroll-contain animate-in fade-in duration-200 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil"
        >
          <nav className="flex flex-col space-y-4 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2 block">
              Navegación
            </span>
            {navLinks.map((item, idx) => {
              const isActive =
                path === item.href ||
                (item.href === '/working-on' && (path === '/working-on' || path === '/scaler')) ||
                (item.href !== '/' && path.startsWith(item.href));
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
                  <ArrowUpRight className="w-5 h-5 opacity-40" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-[var(--border)] space-y-4">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-bounce w-full flex items-center justify-center py-4 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-full shadow-md"
            >
              Hablemos
            </Link>
            
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-2">
              <span>Alejandro Rivera</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 hover:text-[var(--text)] py-2"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" aria-hidden="true" /> : <Moon className="w-3.5 h-3.5" aria-hidden="true" />}
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
