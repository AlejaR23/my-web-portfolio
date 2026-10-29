import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowDown } from 'lucide-react';

interface Section {
  id: string;
  num: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', num: '01', label: 'Portada & Rol' },
  { id: 'exhibition', num: '02', label: 'Obras' },
  { id: 'method', num: '03', label: 'El Método' },
  { id: 'scaler', num: '04', label: 'Scaler' },
  { id: 'dispatches', num: '05', label: 'Bitácora' },
  { id: 'contact', num: '06', label: 'Contacto' },
];

export function SectionNavRail() {
  const [activeId, setActiveId] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getNextSectionId = () => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeId);
    if (currentIndex >= 0 && currentIndex < SECTIONS.length - 1) {
      return SECTIONS[currentIndex + 1].id;
    }
    return SECTIONS[0].id;
  };

  return (
    <>
      {/* Desktop Right Pinned Progress Rail */}
      <aside className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-3.5 select-none">
        {/* Progress Hairline */}
        <div className="w-[1.5px] h-28 bg-[var(--border)] rounded-none relative mb-1 overflow-hidden">
          <div
            className="w-full bg-[var(--text)] rounded-none transition-all duration-150"
            style={{ height: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
          />
        </div>

        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              aria-label={`Ir a la sección ${section.num}: ${section.label}`}
              className="group flex items-center gap-2.5 py-1 text-right transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)]"
            >
              <span
                className={`text-[11px] font-sans tracking-tight transition-opacity duration-200 ${
                  isActive
                    ? 'text-[var(--text)] font-medium opacity-100'
                    : 'text-[var(--text-muted)] opacity-0 group-hover:opacity-100'
                }`}
              >
                {section.label}
              </span>
              <span
                className={`font-mono text-[10px] w-6 h-6 flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[var(--text)] text-[var(--bg)] font-semibold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] border border-[var(--border)]'
                }`}
              >
                {section.num}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Floating Dynamic Slide-Down Guide Pill (Bottom Center) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => scrollTo(getNextSectionId())}
          aria-label={`Deslizar a la siguiente sección del portafolio`}
          className="inline-flex items-center gap-2.5 px-4 py-2 bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--border-hover)] shadow-lg backdrop-blur-xl text-xs font-sans transition-all cursor-pointer group active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)]"
          title="Deslizar a la siguiente sección"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--text)] inline-block" aria-hidden="true" />
          <span className="text-[var(--text-muted)] font-normal">
            Sección actual:
          </span>
          <span className="font-medium text-[var(--text)]">
            {SECTIONS.find((s) => s.id === activeId)?.label || 'Visión & Rol'}
          </span>
          <span className="text-[var(--border)]" aria-hidden="true">|</span>
          <span className="text-[var(--text)] flex items-center gap-1 group-hover:translate-y-0.5 transition-transform">
            <span>Siguiente</span>
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </button>
      </div>
    </>
  );
}

export function SlideDownTrigger({
  targetId,
  label = 'Desliza para explorar',
}: {
  targetId: string;
  label?: string;
}) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      className="group inline-flex items-center gap-3 text-xs font-sans tracking-tight text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer select-none py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)]"
    >
      <span className="w-8 h-px bg-[var(--border)] group-hover:w-12 group-hover:bg-[var(--text)] transition-all" aria-hidden="true" />
      <span className="font-normal">{label}</span>
      <span className="w-7 h-7 border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--text)] group-hover:text-[var(--text)] group-hover:translate-y-1 transition-all" aria-hidden="true">
        <ArrowDown className="w-3.5 h-3.5" />
      </span>
    </button>
  );
}
