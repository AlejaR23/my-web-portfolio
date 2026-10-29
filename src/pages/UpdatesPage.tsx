import React from 'react';
import { Link } from '../context/RouterContext';
import { LetterScrollReveal } from '../components/LetterScrollReveal';
import { ArrowLeft } from 'lucide-react';

export function UpdatesPage() {
  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <main className="pt-32 sm:pt-40 pb-36 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Navigation Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] rounded-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Volver al inicio</span>
            </Link>
          </div>

          {/* Grand Editorial Masthead (Written Centered) */}
          <div className="pb-12 mb-14 w-full border-b border-[var(--border)] text-center max-w-4xl mx-auto">
            <LetterScrollReveal
              as="h1"
              text="Bitácora"
              className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[var(--text)] tracking-tight mb-6 leading-none text-center"
              center={true}
            />

            <p className="text-xl sm:text-2xl text-[var(--text-muted)] leading-relaxed font-light max-w-2xl mx-auto text-center">
              Próximamente se estarán subiendo actualizaciones a esta página.
            </p>
          </div>

          {/* Clean Editorial Status Presentation (No Boxed Card) */}
          <div className="max-w-3xl mx-auto text-center py-8">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest block mb-4">
              En preparación
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight mb-4 leading-snug">
              Próximamente se estarán subiendo actualizaciones a esta página.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Este espacio está reservado para compartir notas de trabajo, procesos, aprendizajes de proyectos y nuevas publicaciones.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/work"
                className="btn-bounce inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-full shadow-md hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                <span>Ver Proyectos</span>
              </Link>

              <Link
                to="/contact"
                className="btn-bounce inline-flex items-center gap-2 px-8 py-4 bg-[var(--surface)] text-[var(--text)] font-semibold text-xs tracking-wider uppercase rounded-full border border-[var(--border)] shadow-xs hover:bg-[var(--surface-raised,var(--surface))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                <span>Contacto</span>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default UpdatesPage;
