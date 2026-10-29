import React from 'react';
import { Link } from '../context/RouterContext';
import { PROJECTS } from '../data/projectsData';
import { ProjectArtworkRenderer } from '../components/ProjectArtworks';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export function WorkPage() {
  const heroProject = PROJECTS[0];
  const gridProjects = PROJECTS.slice(1);

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <main className="pt-32 sm:pt-40 pb-36 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 w-full">
        
        {/* Grand Editorial Masthead (Clean, fluid, no dividing lines) */}
        <div className="pb-12 mb-14 w-full">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text)] mb-6 leading-none">
            Proyectos
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-muted)] leading-relaxed font-light">
            Selección de trabajos en identidad visual, campañas publicitarias y diseño digital.
          </p>
        </div>

        {/* Lead Showcase Case (Exofauna - Image fills 100% of available space, zero dead margins) */}
        {heroProject && (
          <div className="mb-20 w-full overflow-hidden group">
            {/* Full-width expansive hero image spanning all available space */}
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] bg-[var(--surface)] overflow-hidden relative min-h-[360px] sm:min-h-[480px] lg:min-h-[580px] rounded-[3px]">
              <ProjectArtworkRenderer project={heroProject} fullWidth />
            </div>

            {/* Editorial project details row below the full-bleed image */}
            <div className="pt-8 pb-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              <div className="lg:col-span-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] tracking-tight mb-3">
                  {heroProject.title}
                </h2>
                <p className="text-base sm:text-lg text-[var(--text)] font-medium leading-snug mb-3">
                  {heroProject.subtitle}
                </p>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-light max-w-3xl">
                  {heroProject.shortDescription}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4 pt-2">
                <Link
                  to={`/work/${heroProject.slug}`}
                  className="px-7 py-3.5 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-[3px] flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-xs"
                >
                  <span>Ver caso de estudio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Expansive Editorial Grid for All Remaining Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {gridProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--surface)] overflow-hidden rounded-[3px] flex flex-col justify-between group shadow-xs transition-colors"
            >
              <div>
                <div className="aspect-[16/10] w-full bg-[var(--bg)] relative overflow-hidden">
                  <ProjectArtworkRenderer project={project} />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[var(--text)] font-medium mb-4 leading-snug">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-light">
                    {project.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0">
                <div className="pt-4">
                  <Link
                    to={`/work/${project.slug}`}
                    className="w-full py-3.5 bg-[var(--surface-raised,var(--surface))] text-[var(--text)] font-semibold text-xs tracking-wider uppercase rounded-[3px] flex items-center justify-center gap-2 transition-colors active:scale-98"
                  >
                    <span>Ver proyecto</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default WorkPage;
