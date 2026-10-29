import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { PROJECTS } from '../data/projectsData';
import { ProjectArtworkRenderer } from '../components/ProjectArtworks';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Share2,
  Plus,
  Minus,
  Rows,
  Grid
} from 'lucide-react';

export function ProjectDetailPage() {
  const { params } = useRouter();
  const slug = params.slug;

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex] || PROJECTS[0];

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];

  const [copied, setCopied] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'grid'>('editorial');

  // Slot count per project (defaults to 6, persisted in localStorage)
  const [slotCount, setSlotCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`ar_slot_count_${project.slug}`);
      if (saved) {
        const num = parseInt(saved, 10);
        if (!isNaN(num) && num > 0) return num;
      }
    } catch {
      // ignore
    }
    return 6;
  });

  // Update slotCount when switching projects
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`ar_slot_count_${project.slug}`);
      if (saved) {
        const num = parseInt(saved, 10);
        if (!isNaN(num) && num > 0) setSlotCount(num);
      } else {
        setSlotCount(6);
      }
    } catch {
      setSlotCount(6);
    }
  }, [project.slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddSlot = () => {
    setSlotCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(`ar_slot_count_${project.slug}`, next.toString());
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleRemoveSlot = () => {
    if (slotCount <= 1) return;
    setSlotCount((prev) => {
      const next = Math.max(1, prev - 1);
      try {
        localStorage.setItem(`ar_slot_count_${project.slug}`, next.toString());
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <article className="pt-32 sm:pt-40 pb-36 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 w-full">
        
        {/* Top Breadcrumb & Share Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-10 w-full">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a Proyectos</span>
          </Link>

          <button
            onClick={handleShare}
            aria-label="Copiar enlace del proyecto"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text)] px-4 py-2 bg-[var(--surface)] rounded-[3px] transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <span aria-live="polite" className="inline-flex items-center gap-1.5">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                  <span className="text-emerald-500 font-medium">Enlace Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[var(--text)]" aria-hidden="true" />
                  <span>Compartir</span>
                </>
              )}
            </span>
          </button>
        </div>

        {/* =======================================================================
            1. FOTO DE PORTADA
            (Permite cargar, cambiar o restaurar la foto de portada para cualquier proyecto)
            ======================================================================= */}
        <div className="w-full mb-14 bg-[var(--surface)] rounded-[3px] overflow-hidden shadow-xs border border-[var(--border)] min-h-[360px] sm:min-h-[500px]">
          <ProjectArtworkRenderer project={project} fullWidth />
        </div>

        {/* =======================================================================
            2. TÍTULO Y DESCRIPCIÓN
            (Sin viñetas de entregables, sin decisiones de diseño, sin paletas ni tipografías)
            ======================================================================= */}
        <header className="mb-20 max-w-4xl">
          <div className="mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
              {project.category} · {project.year}
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text)] mb-6 leading-none">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-[var(--text-muted)] font-light leading-relaxed mb-8">
            {project.subtitle}
          </p>

          <div className="pt-2 text-base sm:text-lg lg:text-xl text-[var(--text)] font-light leading-relaxed">
            <p>
              {project.fullOverview || project.shortDescription}
            </p>
          </div>
        </header>

        {/* =======================================================================
            3. PLACEHOLDERS PARA IMÁGENES
            - Todas del mismo tamaño inicial (aspect 16:9).
            - Al subir una imagen, se adapta al tamaño real sin distorsión.
            - Distribución centrada y ordenada para que ninguna quede desalineada.
            ======================================================================= */}
        <section className="mb-28 w-full">
          {/* Header & Controls Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 border-b border-[var(--border)]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
                Imágenes del proyecto
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-light">
                Ranuras de presentación. Puedes arrastrar o cargar imágenes; se adaptan al tamaño sin distorsionarse.
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2.5">
              {/* Layout Switcher: 1 Columna (Editorial) o 2 Columnas (Cuadrícula) */}
              <div className="inline-flex items-center p-1 bg-[var(--surface)] rounded-[3px] border border-[var(--border)] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setLayoutMode('editorial')}
                  className={`px-3 py-1.5 rounded-[2px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                    layoutMode === 'editorial'
                      ? 'bg-[var(--text)] text-[var(--bg)] font-medium shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                  title="Vista 1 Columna (Editorial, centrada y sin desalineación)"
                >
                  <Rows className="w-3.5 h-3.5" />
                  <span>1 Columna</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  className={`px-3 py-1.5 rounded-[2px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                    layoutMode === 'grid'
                      ? 'bg-[var(--text)] text-[var(--bg)] font-medium shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                  title="Vista 2 Columnas (Cuadrícula simétrica)"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>2 Columnas</span>
                </button>
              </div>

              {/* Add slot button */}
              <button
                type="button"
                onClick={handleAddSlot}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] border border-[var(--border)] rounded-[3px] text-xs font-mono transition-colors cursor-pointer shadow-xs"
                title="Añadir otra ranura para imagen"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir ranura</span>
              </button>

              {/* Remove last slot button */}
              {slotCount > 1 && (
                <button
                  type="button"
                  onClick={handleRemoveSlot}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] hover:text-red-500 text-[var(--text-muted)] border border-[var(--border)] rounded-[3px] text-xs font-mono transition-colors cursor-pointer shadow-xs"
                  title="Quitar la última ranura"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>Quitar</span>
                </button>
              )}
            </div>
          </div>

          {/* Placeholders List / Grid: perfectly ordered, aligned, zero distortion */}
          <div
            className={
              layoutMode === 'editorial'
                ? 'w-full max-w-5xl mx-auto space-y-12 sm:space-y-16'
                : 'w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'
            }
          >
            {Array.from({ length: slotCount }).map((_, idx) => (
              <div key={idx} className="w-full flex justify-center">
                <ImagePlaceholder
                  slotId={`${project.slug}_image_${idx + 1}`}
                  label={`Imagen ${idx + 1 < 10 ? `0${idx + 1}` : idx + 1}`}
                  sublabel="Cargar o arrastrar imagen"
                  aspect="16:9"
                  dimensions="Se adapta a tu imagen"
                  className="rounded-[3px] shadow-xs"
                />
              </div>
            ))}
          </div>
        </section>

        {/* =======================================================================
            4. NAVEGACIÓN ENTRE PROYECTOS
            ======================================================================= */}
        <nav className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs border-t border-[var(--border)]">
          <Link
            to={`/work/${prevProject.slug}`}
            className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] uppercase text-[var(--text-muted)] block">Anterior</span>
              <span className="font-sans font-bold text-base text-[var(--text)]">{prevProject.title}</span>
            </div>
          </Link>

          <Link
            to="/work"
            className="px-5 py-2.5 bg-[var(--surface)] hover:bg-[var(--surface-raised,var(--surface))] text-[var(--text)] transition-colors uppercase tracking-wider text-[11px] rounded-[3px]"
          >
            Todos los Proyectos
          </Link>

          <Link
            to={`/work/${nextProject.slug}`}
            className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-2 group"
          >
            <div className="text-right">
              <span className="text-[10px] uppercase text-[var(--text-muted)] block">Siguiente</span>
              <span className="font-sans font-bold text-base text-[var(--text)]">{nextProject.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>

      </article>
    </div>
  );
}

export default ProjectDetailPage;
