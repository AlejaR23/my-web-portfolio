import React from 'react';
import { Link } from '../context/RouterContext';
import { ArrowLeft } from 'lucide-react';

export function UpdatesPage() {
  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <main className="pt-32 sm:pt-40 pb-36 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 w-full">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Grand Editorial Masthead */}
        <div className="pb-12 mb-14 w-full border-b border-[var(--border)]">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[var(--text)] tracking-tight mb-6 leading-none">
            Bitácora
          </h1>

          <p className="text-xl sm:text-2xl text-[var(--text-muted)] leading-relaxed font-light max-w-2xl">
            Próximamente se estarán subiendo actualizaciones a esta página.
          </p>
        </div>

        {/* Notice Card */}
        <div className="p-8 sm:p-14 bg-[var(--surface)] rounded-[3px] border border-[var(--border)] shadow-xs">
          <div className="max-w-xl">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-3">
              En preparación
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight mb-4 leading-snug">
              Próximamente se estarán subiendo actualizaciones a esta página.
            </h2>
            <p className="text-base text-[var(--text-muted)] font-light leading-relaxed">
              Este espacio está reservado para compartir notas de trabajo, procesos, aprendizajes de proyectos y nuevas publicaciones.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default UpdatesPage;
