import React from 'react';
import { Link } from '../context/RouterContext';
import { PacmanHero } from '../components/PacmanHero';
import { KonradLogoMarquee } from '../components/KonradLogoMarquee';
import { ExofaunaHeroArtwork } from '../components/ExofaunaHeroArtwork';
import { ProjectArtworkRenderer } from '../components/ProjectArtworks';
import { LiquidGlassProjectCard } from '../components/LiquidGlassProjectCard';
import { ScalerHomeLogoShowcase } from '../components/ScalerHomeLogoShowcase';
import { ScrollReveal } from '../components/ScrollReveal';
import { LetterScrollReveal } from '../components/LetterScrollReveal';
import { PROJECTS } from '../data/projectsData';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Mail
} from 'lucide-react';

export function HomePage() {
  const OUTLOOK_EMAIL = 'alejandrorr.castro23@outlook.com';

  const scrollToPortfolio = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    const target = document.getElementById('portfolio-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter 4 key spotlight projects for the 2-column Hypereffekt grid (excluding exofauna which has its own grand hero)
  const spotlightProjects = PROJECTS.filter(p => p.slug !== 'exofauna').slice(0, 4);

  return (
    <div className="w-full text-[var(--text)] font-sans bg-[var(--bg)] transition-colors duration-200">
      
      {/* =========================================================================
          1. PAC-MAN ARCADE INTERACTIVE HERO
          ========================================================================= */}
      <section className="relative w-full bg-[var(--bg)] transition-colors duration-200">
        <PacmanHero onScrollToPortfolio={scrollToPortfolio} />
      </section>

      {/* PORTFOLIO CONTENT CONTAINER: Single continuous solid background */}
      <div id="portfolio-content" className="relative z-20 bg-[var(--bg)] w-full">

        {/* =======================================================================
            2. OVERVIEW STATEMENT & BRAND LOGO CAROUSEL
            - Written centered text (text-align: center)
            - Carousel width is slightly narrower than the title's width
            - Uniform section spacing: py-14 sm:py-18 lg:py-20
            - Expansive container: max-w-[1920px] (~10% wider)
            ======================================================================= */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-18 lg:pb-20 bg-[var(--bg)]">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            
            {/* Centered Statement Headline (Written Centered) */}
            <div className="max-w-4xl mx-auto text-center px-4">
              <LetterScrollReveal
                as="h2"
                text="Un buen diseño no solo se ve bien: comunica con claridad y ayuda a que tu marca conecte."
                className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] leading-[1.14] text-balance text-center mx-auto"
                center={true}
                blur={14}
                yOffset={14}
              />
            </div>

            {/* Brand Collaborations Carousel: Slightly narrower than the title width */}
            <div className="mt-12 sm:mt-16 max-w-3xl lg:max-w-[800px] mx-auto px-4">
              <ScrollReveal blur={8} yOffset={16}>
                <KonradLogoMarquee variant="section" />
              </ScrollReveal>
            </div>

          </div>
        </section>

        {/* =======================================================================
            3. CASO DESTACADO: EXOFAUNA
            - Solid bg-[var(--bg)] (continuous, no darker striping)
            - Uniform section spacing: py-14 sm:py-18 lg:py-20
            - Expansive artwork card spanning wide across the screen (~10% wider)
            ======================================================================= */}
        <section 
          id="exofauna-destacado" 
          className="py-14 sm:py-18 lg:py-20 bg-[var(--bg)]"
        >
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            
            {/* Centered Header Block */}
            <ScrollReveal blur={8} yOffset={20} className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">
                Caso Destacado
              </span>
              <LetterScrollReveal
                as="h2"
                text="Exofauna: Hospital veterinario y fauna silvestre"
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[var(--text)] tracking-tight text-center leading-[1.08] mb-5"
                center={true}
              />
              <p className="text-base sm:text-lg lg:text-xl text-[var(--text-muted)] max-w-3xl mx-auto text-center leading-relaxed font-light mb-7 text-pretty">
                Identidad visual y manual de marca para un hospital veterinario especializado en animales no convencionales y rehabilitación de fauna silvestre. Una propuesta gráfica pensada para transmitir cuidado, confianza y respeto por la naturaleza.
              </p>
              <div className="flex items-center justify-center">
                <Link
                  to="/work/exofauna"
                  className="btn-bounce inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-[var(--primary-hover)] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
                >
                  <span>Ver caso completo</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Immersive Expansive Visual Artwork Card (~10% wider) */}
            <ScrollReveal blur={10} yOffset={28}>
              <div className="w-full bg-[var(--surface)] overflow-hidden rounded-xl sm:rounded-2xl shadow-xl group border border-[var(--border)]/30">
                <ExofaunaHeroArtwork />
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* =======================================================================
            4. SELECTED WORKS
            - Solid bg-[var(--bg)]
            - Uniform section spacing: py-14 sm:py-18 lg:py-20
            - Expansive 2-Column Grid spanning wide across the page (~10% wider)
            ======================================================================= */}
        <section className="py-14 sm:py-18 lg:py-20 bg-[var(--bg)]">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            
            {/* Centered Section Header */}
            <ScrollReveal blur={8} yOffset={20} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">
                Portafolio Seleccionado
              </span>
              <LetterScrollReveal
                as="h2"
                text="Proyectos seleccionados"
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] text-center mb-4 leading-none"
                center={true}
              />
              <p className="text-base sm:text-lg text-[var(--text-muted)] font-light leading-relaxed text-pretty">
                Una muestra de identidades, campañas y diseño digital en los que he trabajado.
              </p>
            </ScrollReveal>

            {/* 2-Column Grid with Floating Liquid Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
              {spotlightProjects.map((project) => (
                <ScrollReveal key={project.slug} blur={8} yOffset={24}>
                  <LiquidGlassProjectCard
                    project={project}
                    aspect="aspect-[16/11] min-h-[360px] sm:min-h-[440px] md:min-h-[480px]"
                  />
                </ScrollReveal>
              ))}
            </div>

            {/* Bottom Centered Explore CTA */}
            <ScrollReveal blur={6} yOffset={16} className="mt-14 sm:mt-18 text-center">
              <Link
                to="/work"
                className="btn-bounce inline-flex items-center gap-3 px-8 py-4 bg-[var(--surface)] hover:bg-[var(--surface-raised,var(--surface))] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full border border-[var(--border)] shadow-sm text-[var(--text)]"
              >
                <span>Ver todos los proyectos <span className="tabular-nums">({PROJECTS.length})</span></span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </ScrollReveal>

          </div>
        </section>

        {/* =======================================================================
            5. SERVICIOS Y ENFOQUE
            - Solid bg-[var(--bg)] (continuous)
            - Uniform section spacing: py-14 sm:py-18 lg:py-20
            - Clean editorial presentation (no card boxes per user request)
            ======================================================================= */}
        <section className="py-14 sm:py-18 lg:py-20 bg-[var(--bg)]">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 text-center">
            
            {/* Centered Section Header */}
            <ScrollReveal blur={8} yOffset={20} className="text-center max-w-4xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">
                Servicios & Enfoque
              </span>
              <LetterScrollReveal
                as="h2"
                text="¿En qué te puedo ayudar?"
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[var(--text)] tracking-tight text-center leading-[1.08] mb-5"
                center={true}
              />
              <p className="text-[var(--text-muted)] text-base sm:text-lg lg:text-xl leading-relaxed font-light text-pretty max-w-2xl mx-auto mb-8">
                Trabajo en proyectos puntuales o integrales, desde la creación de una marca hasta sus piezas de comunicación del día a día: identidad visual, campañas publicitarias y diseño digital de interfaces.
              </p>

              <div className="flex justify-center">
                <Link
                  to="/about"
                  className="btn-bounce inline-flex items-center gap-2 px-8 py-4 bg-[var(--surface)] hover:bg-[var(--surface-raised,var(--surface))] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full border border-[var(--border)] shadow-sm text-[var(--text)]"
                >
                  <span>Conocer más sobre mi enfoque & perfil</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* =======================================================================
            6. SECCIÓN WORKING ON (PROYECTO SCALER EN DESARROLLO)
            - Solid bg-[var(--bg)] (continuous, no darker striping)
            - Uniform section spacing: py-14 sm:py-18 lg:py-20
            - Expansive showcase spanning wide across the page (~10% wider)
            ======================================================================= */}
        <section className="py-14 sm:py-18 lg:py-20 bg-[var(--bg)]">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            
            {/* Centered Section Header */}
            <ScrollReveal blur={8} yOffset={20} className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">
                Working on · Proyecto en curso
              </span>
              <LetterScrollReveal
                as="h2"
                text="Scaler: Impulsando carreras y búsqueda de empleo"
                className="text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text)] text-center leading-[1.08] mb-5"
                center={true}
              />
              <p className="text-base sm:text-lg lg:text-xl text-[var(--text-muted)] leading-relaxed font-light max-w-3xl mx-auto text-center mb-7 text-pretty">
                Una plataforma diseñada para acompañar a las personas en su búsqueda laboral: optimización de perfil y currículum con IA, cover letters automatizadas, cursos, certificaciones y una ruta clara para alcanzar el empleo que buscan.
              </p>
              <div className="flex justify-center">
                <Link 
                  to="/working-on" 
                  className="btn-bounce inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-[var(--primary-hover)] shadow-md"
                >
                  <span>Ver proyecto en desarrollo (Scaler)</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Scaler Adaptive Showcase (Spanning wide across the container) */}
            <ScrollReveal blur={10} yOffset={24} className="w-full">
              <ScalerHomeLogoShowcase />
            </ScrollReveal>

          </div>
        </section>

        {/* =======================================================================
            7. BITÁCORA / ACTUALIZACIONES
            - Solid bg-[var(--bg)]
            - Uniform section spacing: py-14 sm:py-18 lg:py-20
            - Clean centered presentation (no card boxes per user request)
            ======================================================================= */}
        <section id="dispatches" className="py-14 sm:py-18 lg:py-20 bg-[var(--bg)]">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 text-center">
            
            {/* Centered Header & Content */}
            <ScrollReveal blur={8} yOffset={20} className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">
                Notas & Proceso
              </span>
              <LetterScrollReveal
                as="h2"
                text="Bitácora"
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] text-center mb-5 leading-none"
                center={true}
              />
              <p className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight mb-3 leading-snug">
                Próximamente se estarán subiendo actualizaciones a esta página.
              </p>
              <p className="text-base sm:text-lg text-[var(--text-muted)] font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                Espacio reservado para compartir notas de trabajo, procesos, aprendizajes de proyectos y nuevas publicaciones.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/updates"
                  className="btn-bounce inline-flex items-center gap-2 px-8 py-4 bg-[var(--surface)] text-[var(--text)] font-semibold text-xs tracking-wider uppercase rounded-full border border-[var(--border)] shadow-sm hover:bg-[var(--surface-raised,var(--surface))]"
                >
                  <span>Ir a la bitácora</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* =======================================================================
            8. CONTACTO / CIERRE
            - Solid bg-[var(--bg)]
            - Uniform section spacing: py-14 sm:py-18 lg:py-20
            - Direct centered actions (no card boxes per user request)
            ======================================================================= */}
        <section className="py-14 sm:py-18 lg:py-20 bg-[var(--bg)]">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 text-center">
            
            {/* Centered Header */}
            <ScrollReveal blur={8} yOffset={20} className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">
                Conversación
              </span>
              <LetterScrollReveal
                as="h2"
                text="¿Hablamos de tu proyecto?"
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] text-center leading-[1.04] mb-4"
                center={true}
              />
              <p className="text-base sm:text-lg lg:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto text-center font-light text-pretty">
                Si tienes una idea, necesitas una nueva identidad visual o quieres mejorar la comunicación de tu negocio, escríbeme. Conversemos sobre lo que necesitas, los tiempos y la mejor forma de abordarlo.
              </p>
            </ScrollReveal>

            {/* Direct Centered Actions (No Card Box, Rounded Pill Bounce Buttons) */}
            <ScrollReveal blur={8} yOffset={22} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={`mailto:${OUTLOOK_EMAIL}?subject=Consulta%20-%20Alejandro%20Rivera`} 
                  className="btn-bounce w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-full shadow-md hover:bg-[var(--primary-hover)]"
                >
                  <span>Contactar por correo</span>
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </a>

                <Link 
                  to="/contact" 
                  className="btn-bounce w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--surface)] text-[var(--text)] font-semibold text-xs tracking-wider uppercase rounded-full border border-[var(--border)] shadow-xs hover:bg-[var(--surface-raised,var(--surface))]"
                >
                  <span>Contacto</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="pt-8 text-center text-xs font-mono text-[var(--text-muted)]">
                <a
                  href="https://www.behance.net/gallery/254632137/PORTFOLIO-Graphic-Design-2026?platform=direct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text)] underline transition-colors"
                >
                  Ver portafolio en Behance ↗
                </a>
              </div>
            </ScrollReveal>

          </div>
        </section>

      </div>

    </div>
  );
}

export default HomePage;
