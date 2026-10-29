import React from 'react';
import { PROJECTS } from '../data/projectsData';
import { LiquidGlassProjectCard } from '../components/LiquidGlassProjectCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { LetterScrollReveal } from '../components/LetterScrollReveal';

export function WorkPage() {
  const heroProject = PROJECTS[0];
  const gridProjects = PROJECTS.slice(1);

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <main className="pt-32 sm:pt-40 pb-36 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Grand Editorial Masthead (Written Centered) */}
          <ScrollReveal blur={8} yOffset={20} className="pb-12 mb-16 w-full text-center max-w-4xl mx-auto">
            <LetterScrollReveal
              as="h1"
              text="Proyectos"
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text)] mb-6 leading-none text-center"
              center={true}
            />
            <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-muted)] leading-relaxed font-light text-center">
              Selección de trabajos en identidad visual, campañas publicitarias y diseño digital.
            </p>
          </ScrollReveal>

          {/* Lead Showcase Case (Exofauna with Full-Bleed Liquid Glass Card) */}
          {heroProject && (
            <ScrollReveal blur={10} yOffset={24} className="mb-14 sm:mb-20 w-full">
              <LiquidGlassProjectCard
                project={heroProject}
                aspect="aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] min-h-[360px] sm:min-h-[480px] lg:min-h-[560px]"
                fullWidth
              />
            </ScrollReveal>
          )}

          {/* Expansive Editorial Grid for All Remaining Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {gridProjects.map((project) => (
              <ScrollReveal
                key={project.id}
                blur={8}
                yOffset={22}
              >
                <LiquidGlassProjectCard
                  project={project}
                  aspect="aspect-[16/11] min-h-[340px] sm:min-h-[400px]"
                />
              </ScrollReveal>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default WorkPage;
