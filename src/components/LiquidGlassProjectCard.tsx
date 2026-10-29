import React from 'react';
import { Link } from '../context/RouterContext';
import { Project } from '../types';
import { ProjectArtworkRenderer } from './ProjectArtworks';
import { ArrowRight } from 'lucide-react';

export interface LiquidGlassProjectCardProps {
  project: Project;
  aspect?: string;
  className?: string;
  fullWidth?: boolean;
}

/**
 * LiquidGlassProjectCard
 * 
 * Renders a full-bleed project artwork card with an ultra-sheer, borderless
 * liquid glass badge in the top-left corner.
 * 
 * - Rest state: compact top-left glass box displaying only the project name.
 *   Extremely sheer and transparent with zero borders ("apenas se nota").
 * - Hover / Focus state: smoothly unfolds context, year, category, and "Ver proyecto →".
 */
export function LiquidGlassProjectCard({
  project,
  aspect = 'aspect-[16/11]',
  className = '',
  fullWidth = false,
}: LiquidGlassProjectCardProps) {
  return (
    <Link
      to={`/work/${project.slug}`}
      aria-label={`Ver proyecto ${project.title} · ${project.subtitle || project.category}`}
      className={`group relative block w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[var(--surface)] shadow-md border border-[var(--border)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)] transition-all duration-500 hover:shadow-2xl ${aspect} ${className}`}
    >
      {/* 1. Underlying Artwork Container (Smooth zoom on card hover) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectArtworkRenderer project={project} fullWidth={fullWidth} />
        </div>
      </div>

      {/* 2. Top-Left Ultra-Sheer Liquid Glass Badge (Borderless, minimal footprint) */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-auto">
        <div className="w-fit max-w-[calc(100%-1.5rem)] sm:max-w-md rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white bg-black/10 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-black/35 group-hover:backdrop-blur-xl shadow-xs group-hover:shadow-xl">
          
          {/* Rest State Header: Cuadrito minimalista exclusivamente con el nombre */}
          <div className="flex items-center">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] truncate">
              {project.title}
            </h3>
          </div>

          {/* Expandable Accordion Drawer: Se despliega suavemente hacia abajo en hover */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="overflow-hidden">
              <div className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out delay-75 pt-2.5">
                
                {/* Context / Subtitle */}
                {(project.subtitle || project.shortDescription) && (
                  <p className="text-xs sm:text-sm text-white/95 font-light leading-relaxed mb-2.5 line-clamp-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    {project.subtitle || project.shortDescription}
                  </p>
                )}

                {/* Metadata & Direct Link CTA */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] sm:text-xs font-mono text-white/80 tabular-nums">
                  <div className="flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    <span className="text-white/90">{project.category}</span>
                    <span>·</span>
                    <span>{project.year || '2025–2026'}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-white font-medium group-hover:translate-x-1 transition-transform duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    <span>Ver proyecto</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default LiquidGlassProjectCard;
