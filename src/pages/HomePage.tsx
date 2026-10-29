import React from 'react';
import { Link } from '../context/RouterContext';
import { FullScreenVideoHero } from '../components/FullScreenVideoHero';
import { KonradLogoMarquee } from '../components/KonradLogoMarquee';
import { ExofaunaHeroArtwork } from '../components/ExofaunaHeroArtwork';
import { ProjectArtworkRenderer } from '../components/ProjectArtworks';
import { ScalerHomeLogoShowcase } from '../components/ScalerHomeLogoShowcase';
import { PROJECTS } from '../data/projectsData';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Mail, 
  FileText,
  Layers,
  Sparkles,
  Palette
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
          1. AUDIOVISUAL FULL-VIEWPORT HERO (Hypereffekt style)
          ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-black">
        <FullScreenVideoHero onScrollToPortfolio={scrollToPortfolio} />
      </section>

      {/* =========================================================================
          2. BRAND COLLABORATIONS CAROUSEL (Hypereffekt logo strip)
          ========================================================================= */}
      <div className="bg-[var(--surface)]/50">
        <KonradLogoMarquee variant="section" />
      </div>

      {/* PORTFOLIO CONTENT CONTAINER */}
      <div id="portfolio-content" className="relative z-20 bg-[var(--bg)] w-full">

        {/* =======================================================================
            3. OVERVIEW / PRESENTACIÓN
            ======================================================================= */}
        <section className="py-24 sm:py-32 lg:py-40">
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] leading-[1.08] max-w-4xl mb-12 text-balance">
              Un buen diseño no solo se ve bien: comunica con claridad y ayuda a que tu marca conecte.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              <div className="lg:col-span-7 space-y-6 text-base sm:text-lg lg:text-xl text-[var(--text)] font-light leading-relaxed">
                <p>
                  Me gusta trabajar de cerca con cada cliente para entender bien qué necesita su proyecto. No me quedo solo en hacer un logo bonito: cuido que todo funcione bien en el mundo real, ya sea en un cartel de calle, en un post de redes o en la pantalla de una app.
                </p>
                <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal">
                  Acompaño el proceso desde la idea inicial hasta las piezas finales, cuidando la tipografía, los colores y los formatos para que todo tenga coherencia.
                </p>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4 font-mono text-xs text-[var(--text-muted)]">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[var(--text)] font-semibold uppercase">Modalidad</span>
                    <span>Proyectos locales y remotos</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[var(--text)] font-semibold uppercase">Disponibilidad</span>
                    <span>Abierto a nuevos proyectos</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[var(--text)] group hover:opacity-75 transition-opacity"
                  >
                    <span>Conoce más sobre mí</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =======================================================================
            4. CASO DESTACADO: EXOSAUNA
            ======================================================================= */}
        <section 
          id="exofauna-destacado" 
          className="py-24 sm:py-32 lg:py-40 bg-[var(--surface)]/30"
        >
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 gap-6">
              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] tracking-tight">
                  Exofauna: Hospital veterinario y fauna silvestre
                </h2>
              </div>
              <Link
                to="/work/exofauna"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-[3px] transition-colors hover:bg-[var(--primary-hover)] shrink-0 shadow-xs"
              >
                <span>Ver caso completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-muted)] max-w-4xl leading-relaxed mb-10 font-light">
              Identidad visual y manual de marca para un hospital veterinario especializado en animales no convencionales y rehabilitación de fauna silvestre. Una propuesta gráfica pensada para transmitir cuidado, confianza y respeto por la naturaleza.
            </p>

            {/* Immersive Visual Artwork */}
            <div className="w-full bg-[var(--surface)] overflow-hidden rounded-[3px] shadow-xs group">
              <ExofaunaHeroArtwork />
            </div>

          </div>
        </section>

        {/* =======================================================================
            5. SELECTED WORKS (Hypereffekt 2-Column Editorial Grid, Aspect ~1.44)
            ======================================================================= */}
        <section className="py-24 sm:py-32 lg:py-40">
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-12 gap-6">
              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)]">
                  Proyectos seleccionados
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md font-normal leading-relaxed">
                Una muestra de identidades, campañas y diseño digital en los que he trabajado.
              </p>
            </div>

            {/* 2-Column Grid matching Hypereffekt work items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              {spotlightProjects.map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className="group flex flex-col space-y-4 focus-visible:outline-none"
                >
                  {/* Image Container with aspect ratio ~ 1.44 */}
                  <div className="w-full aspect-[16/11] bg-[var(--surface)] overflow-hidden rounded-[3px] relative shadow-xs">
                    <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <ProjectArtworkRenderer project={project} />
                    </div>
                  </div>

                  {/* Text & Metadata Container */}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)] group-hover:opacity-80 transition-opacity">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors shrink-0" />
                    </div>

                    <p className="text-sm text-[var(--text-muted)] line-clamp-2 font-light leading-relaxed">
                      {project.subtitle || project.shortDescription}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-subtle)] pt-1">
                      <span>{project.category}</span>
                      <span>·</span>
                      <span>{project.year || '2024–2026'}</span>
                      <span>·</span>
                      <span className="text-[var(--text)] font-medium">Ver proyecto →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Full-Width Explore CTA */}
            <Link
              to="/work"
              className="mt-16 w-full py-5 bg-[var(--surface)] hover:bg-[var(--surface-hover,var(--surface))] flex items-center justify-between px-6 sm:px-8 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors rounded-[3px]"
            >
              <span>Ver todos los proyectos ({PROJECTS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>
        </section>

        {/* =======================================================================
            6. SERVICIOS Y ENFOQUE
            ======================================================================= */}
        <section className="py-24 sm:py-32 lg:py-40 bg-[var(--surface)]/20">
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
            
            <div className="max-w-4xl mb-16 space-y-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] tracking-tight leading-[1.08]">
                ¿En qué te puedo ayudar?
              </h2>
              <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-2xl font-light pt-2">
                Trabajo en proyectos puntuales o integrales, desde la creación de una marca hasta sus piezas de comunicación del día a día.
              </p>
            </div>

            {/* 3-Column Clean Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Pillar 1: Branding & Identidad */}
              <div className="p-8 sm:p-10 bg-[var(--surface)] rounded-[3px] flex flex-col justify-between space-y-8 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
                      Identidad & Marca
                    </span>
                    <Palette className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--text)]">
                    Identidad visual y manuales
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed font-light">
                    Logotipos, tipografía, paletas de color y guías claras para que tu marca se aplique siempre con coherencia y orden.
                  </p>
                </div>

                <div className="pt-4 space-y-2 text-xs text-[var(--text-muted)]">
                  <div>· Logotipos y variantes</div>
                  <div>· Guías de estilo y aplicación</div>
                  <div>· Paletas de color y tipografía</div>
                  <div>· Papelería y material corporativo</div>
                </div>
              </div>

              {/* Pillar 2: Campañas & Publicidad */}
              <div className="p-8 sm:p-10 bg-[var(--surface)] rounded-[3px] flex flex-col justify-between space-y-8 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
                      Publicidad & Campañas
                    </span>
                    <FileText className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--text)]">
                    Campañas y piezas de comunicación
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed font-light">
                    Concepto creativo y diseño para anuncios en vía pública, vallas, cartelería y contenido para redes sociales.
                  </p>
                </div>

                <div className="pt-4 space-y-2 text-xs text-[var(--text-muted)]">
                  <div>· Vallas de carretera y mupis</div>
                  <div>· Cartelería y señalización</div>
                  <div>· Gráficas para redes sociales</div>
                  <div>· Animación y piezas audiovisuales</div>
                </div>
              </div>

              {/* Pillar 3: Interfaz & Diseño Digital */}
              <div className="p-8 sm:p-10 bg-[var(--surface)] rounded-[3px] flex flex-col justify-between space-y-8 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
                      Digital & Interfaces
                    </span>
                    <Layers className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--text)]">
                    Diseño de interfaces y prototipos
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed font-light">
                    Estructuración de pantallas en Figma, prototipos interactivos y sistemas visuales listos para pasar a desarrollo.
                  </p>
                </div>

                <div className="pt-4 space-y-2 text-xs text-[var(--text-muted)]">
                  <div>· Diseño de pantallas en Figma</div>
                  <div>· Prototipos navegables</div>
                  <div>· Componentes y tokens visuales</div>
                  <div>· Entrega ordenada para desarrolladores</div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =======================================================================
            7. PROYECTO SCALER
            ======================================================================= */}
        <section className="py-24 sm:py-32 lg:py-40 bg-[var(--surface)]">
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text)] leading-[1.08]">
                  Scaler: Impulsando carreras y búsqueda de empleo
                </h2>
                <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-light max-w-xl">
                  Una plataforma diseñada para acompañar a las personas en su búsqueda laboral: optimización de perfil y currículum con IA, cover letters automatizadas, cursos, certificaciones y una ruta clara para alcanzar el empleo que buscan.
                </p>
                <div className="pt-2">
                  <Link 
                    to="/scaler" 
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-[3px] transition-colors hover:bg-[var(--primary-hover)] active:scale-95 shadow-xs"
                  >
                    <span>Ver proyecto Scaler</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Scaler Adaptive Dual-Theme Logo Showcase */}
              <div className="lg:col-span-6">
                <ScalerHomeLogoShowcase />
              </div>

            </div>
          </div>
        </section>

        {/* =======================================================================
            8. BITÁCORA / ACTUALIZACIONES
            ======================================================================= */}
        <section id="dispatches" className="py-24 sm:py-32 lg:py-40">
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-10 gap-6 border-b border-[var(--border)]">
              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)]">
                  Bitácora
                </h2>
              </div>
              <Link
                to="/updates"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[var(--text)] hover:opacity-75 transition-opacity shrink-0"
              >
                <span>Ir a la bitácora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Coming Soon Notice Card */}
            <div className="p-8 sm:p-14 bg-[var(--surface)] rounded-[3px] border border-[var(--border)] shadow-xs">
              <div className="max-w-2xl">
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-3">
                  En preparación
                </span>
                <p className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight mb-4 leading-snug">
                  Próximamente se estarán subiendo actualizaciones a esta página.
                </p>
                <p className="text-base text-[var(--text-muted)] font-light leading-relaxed">
                  Espacio reservado para compartir notas de trabajo, procesos, aprendizajes de proyectos y nuevas publicaciones.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* =======================================================================
            9. CONTACTO / CIERRE
            ======================================================================= */}
        <section className="py-24 sm:py-32 lg:py-40 bg-[var(--bg)]">
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] leading-[1.04]">
                  ¿Hablamos de tu proyecto?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-[var(--text-muted)] leading-relaxed max-w-xl font-light">
                  Si tienes una idea, necesitas una nueva identidad visual o quieres mejorar la comunicación de tu negocio, escríbeme. Suelo responder en menos de un día.
                </p>
              </div>

              {/* Direct Actions Card */}
              <div className="lg:col-span-5 p-8 sm:p-12 bg-[var(--surface)] flex flex-col justify-between shadow-xs rounded-[3px] space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--text)]">Escríbeme</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6 font-light leading-relaxed">
                    Conversemos sobre lo que necesitas, los tiempos y la mejor forma de abordarlo.
                  </p>
                  
                  <div className="space-y-3.5">
                    <a 
                      href={`mailto:${OUTLOOK_EMAIL}?subject=Consulta%20-%20Alejandro%20Rivera`} 
                      className="w-full flex items-center justify-between px-6 py-3.5 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-[3px] transition-colors hover:bg-[var(--primary-hover)] active:scale-95 shadow-xs"
                    >
                      <span>Contactar por correo</span>
                      <Mail className="w-4 h-4" />
                    </a>

                    <Link 
                      to="/contact" 
                      className="w-full flex items-center justify-between px-6 py-3.5 bg-[var(--surface-raised,var(--surface))] text-[var(--text)] font-semibold text-xs tracking-wider uppercase rounded-[3px] transition-colors active:scale-95"
                    >
                      <span>Ir al formulario de contacto</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end text-xs font-mono text-[var(--text-muted)]">
                  <a
                    href="https://www.behance.net/gallery/254632137/PORTFOLIO-Graphic-Design-2026?platform=direct"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--text)] underline transition-colors"
                  >
                    Ver portafolio en Behance ↗
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

    </div>
  );
}

export default HomePage;
