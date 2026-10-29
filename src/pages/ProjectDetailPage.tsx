import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { PROJECTS } from '../data/projectsData';
import { ProjectArtworkRenderer } from '../components/ProjectArtworks';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { ScrollReveal } from '../components/ScrollReveal';
import { LetterScrollReveal } from '../components/LetterScrollReveal';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Share2,
  Rows,
  Grid
} from 'lucide-react';

const PROJECT_UPLOADED_IMAGE_COUNTS: Record<string, number> = {
  exofauna: 6,
  tempo: 10,
  'se-vale-avisar': 12,
  'the-traveling-chicken': 3,
  'vault-clothing': 8,
  'kiem-university': 3,
};

export function ProjectDetailPage() {
  const { params } = useRouter();
  const slug = params.slug;

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex] || PROJECTS[0];

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];

  const [copied, setCopied] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'grid'>('editorial');

  // Exact number of real uploaded images for this project
  const [slotCount, setSlotCount] = useState<number>(() => {
    return PROJECT_UPLOADED_IMAGE_COUNTS[project.slug] || 0;
  });

  // Update slotCount when switching projects
  useEffect(() => {
    setSlotCount(PROJECT_UPLOADED_IMAGE_COUNTS[project.slug] || 0);
  }, [project.slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <article className="pt-32 sm:pt-40 pb-36 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Top Breadcrumb & Share Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-10 w-full">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] rounded-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              <span>Volver a Proyectos</span>
            </Link>

            <button
              onClick={handleShare}
              aria-label="Copiar enlace del proyecto"
              className="btn-bounce inline-flex items-center gap-2 text-xs font-mono text-[var(--text)] px-4 py-2 bg-[var(--surface)] rounded-full border border-[var(--border)] transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)]"
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
          <ScrollReveal blur={10} yOffset={24} className="w-full mb-14 bg-[var(--surface)] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-[var(--border)] min-h-[360px] sm:min-h-[500px]">
            <ProjectArtworkRenderer project={project} fullWidth />
          </ScrollReveal>

          {/* =======================================================================
              2. TÍTULO Y DESCRIPCIÓN (Written Centered)
              ======================================================================= */}
          <ScrollReveal blur={8} yOffset={20} className="mb-20 max-w-4xl mx-auto text-center">
            <div className="mb-3 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                {project.category} · <span className="tabular-nums">{project.year}</span>
              </span>
            </div>

            <LetterScrollReveal
              as="h1"
              text={project.title}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text)] mb-6 leading-none text-center"
              center={true}
            />

            <p className="text-xl sm:text-2xl lg:text-3xl text-[var(--text-muted)] font-light leading-relaxed mb-8 text-center text-pretty">
              {project.subtitle}
            </p>

            <div className="pt-2 text-base sm:text-lg lg:text-xl text-[var(--text)] font-light leading-relaxed text-center max-w-3xl mx-auto">
              <p>
                {project.fullOverview || project.shortDescription}
              </p>
            </div>
          </ScrollReveal>

        {/* =======================================================================
            3. GALERÍA DE IMÁGENES DEL PROYECTO
            - Formato amplio de gran impacto en pantalla (1 y 2 columnas).
            - Imágenes acopladas a sus dimensiones reales sin marcos muertos.
            - Distribución dinámica equilibrada (masonry).
            ======================================================================= */}
        {slotCount > 0 && (
          <section className="mb-28 w-full">
            {/* Header & Controls Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 border-b border-[var(--border)]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
                  Galería del proyecto
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-light">
                  Registro visual y piezas de diseño de {project.title}.
                </p>
              </div>

              {/* Layout Switcher: 1 Columna (Gran Formato) o 2 Columnas (Mosaico Dinámico) */}
              <div className="inline-flex items-center p-1 bg-[var(--surface)] rounded-full border border-[var(--border)] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setLayoutMode('editorial')}
                  className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] ${
                    layoutMode === 'editorial'
                      ? 'bg-[var(--text)] text-[var(--bg)] font-medium shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                  title="Vista 1 Columna (Gran Formato, centrada)"
                >
                  <Rows className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>1 Columna</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] ${
                    layoutMode === 'grid'
                      ? 'bg-[var(--text)] text-[var(--bg)] font-medium shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                  title="Vista 2 Columnas (Mosaico adaptativo)"
                >
                  <Grid className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>2 Columnas</span>
                </button>
              </div>
            </div>

            {/* Gallery Images List / Grid: wide format, tight zero-dead-space fit, dynamic masonry */}
            <div
              className={
                layoutMode === 'editorial'
                  ? 'w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24'
                  : 'w-full max-w-[1780px] mx-auto columns-1 md:columns-2 gap-8 lg:gap-12 [column-fill:_balance]'
              }
            >
              {Array.from({ length: slotCount }).map((_, idx) => (
                <div
                  key={idx}
                  className={
                    layoutMode === 'editorial'
                      ? 'w-full flex justify-center'
                      : 'break-inside-avoid mb-8 lg:mb-12 w-full inline-block align-top'
                  }
                >
                  <ScrollReveal blur={6} yOffset={18} className="w-full">
                    <ImagePlaceholder
                      slotId={`${project.slug}_image_${idx + 1}`}
                      label={`${project.title} · Imagen ${idx + 1 < 10 ? `0${idx + 1}` : idx + 1}`}
                      aspect="16:9"
                      className="rounded-xl sm:rounded-2xl shadow-sm"
                    />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =======================================================================
            4. NAVEGACIÓN ENTRE PROYECTOS
            ======================================================================= */}
        <nav aria-label="Navegación entre proyectos" className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs border-t border-[var(--border)]">
          <Link
            to={`/work/${prevProject.slug}`}
            className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <div className="text-left">
              <span className="text-[10px] uppercase text-[var(--text-muted)] block">Anterior</span>
              <span className="font-sans font-bold text-base text-[var(--text)]">{prevProject.title}</span>
            </div>
          </Link>

          <Link
            to="/work"
            className="btn-bounce px-6 py-3 bg-[var(--surface)] hover:bg-[var(--surface-raised,var(--surface))] text-[var(--text)] uppercase tracking-wider text-[11px] rounded-full border border-[var(--border)] shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)]"
          >
            Todos los Proyectos
          </Link>

          <Link
            to={`/work/${nextProject.slug}`}
            className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] rounded-sm"
          >
            <div className="text-right">
              <span className="text-[10px] uppercase text-[var(--text-muted)] block">Siguiente</span>
              <span className="font-sans font-bold text-base text-[var(--text)]">{nextProject.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </nav>

        </div>
      </article>
    </div>
  );
}

export default ProjectDetailPage;
