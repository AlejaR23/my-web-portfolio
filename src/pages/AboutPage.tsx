import React from 'react';
import { Link } from '../context/RouterContext';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { ScrollReveal } from '../components/ScrollReveal';
import { LetterScrollReveal } from '../components/LetterScrollReveal';
import { 
  ArrowRight, 
  BookOpen,
  Megaphone,
  Palette
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <main className="pt-32 sm:pt-40 pb-36 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Editorial Masthead (Written Centered) */}
          <ScrollReveal blur={8} yOffset={20} className="pb-12 mb-16 w-full text-center max-w-4xl mx-auto">
            <LetterScrollReveal
              as="h1"
              text="Sobre mí"
              className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[var(--text)] tracking-tight mb-6 leading-none text-center"
              center={true}
            />
            <p className="text-xl sm:text-2xl md:text-3xl text-[var(--text-muted)] leading-relaxed font-light text-center">
              Diseño marcas, publicidad y piezas visuales con un enfoque práctico y cercano.
            </p>
          </ScrollReveal>

          {/* Main Grid: Narrative & Quick Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 items-start">
            
            {/* Narrative Column */}
            <ScrollReveal blur={8} yOffset={22} className="lg:col-span-7 xl:col-span-8 space-y-8 text-[var(--text-muted)] font-sans text-base sm:text-lg leading-relaxed font-light">
              <div className="p-8 sm:p-10 bg-[var(--surface)] rounded-2xl border border-[var(--border)]/30 shadow-xs">
                <p className="text-xl sm:text-2xl text-[var(--text)] font-normal leading-relaxed">
                  Soy <strong className="text-[var(--text)] font-bold">Alejandro Rivera Castro</strong>, diseñador publicitario. Concluí mi formación en <span className="tabular-nums">2026</span> y me dedico a crear identidades de marca, campañas publicitarias, contenido digital y edición de video o animación.
                </p>
              </div>

              <p>
                Para mí el buen diseño no se trata de complicar las cosas, sino de ordenar las ideas para que el mensaje llegue claro a las personas. Me gusta que cada pieza tenga una razón de ser, desde un cartel en la calle hasta un post en redes o la pantalla de una aplicación.
              </p>

              <p>
                En este espacio reúno proyectos donde he aplicado ese enfoque: la identidad visual de <strong className="text-[var(--text)] font-medium">Exofauna</strong> para un hospital veterinario de animales no convencionales, el prototipo interactivo en Figma de <strong className="text-[var(--text)] font-medium">Tempo</strong> para ciclistas, y la campaña <strong className="text-[var(--text)] font-medium">Se Vale Avisar</strong>, que utiliza señales ocupacionales para hablar de salud mental y descanso.
              </p>
            </ScrollReveal>

            {/* Right Column: Portrait & Details */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-8">
              
              {/* Portrait Image Placeholder */}
              <ScrollReveal blur={10} yOffset={24} className="overflow-hidden rounded-2xl shadow-xs">
                <ImagePlaceholder
                  slotId="SLOT-BIO-01"
                  label="Alejandro Rivera"
                  aspect="3:4"
                />
              </ScrollReveal>

              {/* Details Card */}
              <ScrollReveal blur={8} yOffset={20} className="p-8 bg-[var(--surface)] rounded-2xl space-y-6 shadow-xs border border-[var(--border)]/30">
                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <span className="text-[var(--text-muted)] block mb-1 font-mono text-[10px] uppercase">FORMACIÓN</span>
                    <span className="text-[var(--text)] font-medium text-sm">
                      Diseño Publicitario (<span className="tabular-nums">2026</span>)
                    </span>
                  </div>

                  <div>
                    <span className="text-[var(--text-muted)] block mb-1 font-mono text-[10px] uppercase">ÁREAS DE ENFOQUE</span>
                    <span className="text-[var(--text)] font-medium leading-relaxed block text-sm">
                      Identidad de marca, publicidad, piezas digitales, video y motion graphics
                    </span>
                  </div>

                  <div>
                    <span className="text-[var(--text-muted)] block mb-1 font-mono text-[10px] uppercase">DISPONIBILIDAD</span>
                    <span className="text-[var(--text)] font-medium text-sm">
                      Abierto a nuevos proyectos y encargos
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="btn-bounce w-full py-4 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
                  >
                    <span>Hablemos de tu proyecto</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </ScrollReveal>

            </div>
          </div>

          {/* Disciplines Section */}
          <section className="mb-20">
            <ScrollReveal blur={8} yOffset={20} className="pb-8 mb-12 text-center max-w-3xl mx-auto">
              <LetterScrollReveal
                as="h2"
                text="Áreas de trabajo"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] tracking-tight text-center"
                center={true}
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal blur={8} yOffset={20} className="p-8 bg-[var(--surface)] rounded-2xl flex flex-col justify-between shadow-xs border border-[var(--border)]/30">
                <div>
                  <div className="w-10 h-10 bg-[var(--bg)] rounded-xl flex items-center justify-center text-[var(--text)] mb-6 shadow-xs">
                    <Megaphone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)] mb-3">
                    Campañas publicitarias
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-light">
                    Ideas creativas, dirección de arte para vallas y cartelería exterior, y piezas adaptadas para redes sociales.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-4">
                  <div>· Vallas de carretera y mupis</div>
                  <div>· Gráficas para redes</div>
                  <div>· Mensajes y llamadas a la acción</div>
                </div>
              </ScrollReveal>

              <ScrollReveal blur={8} yOffset={20} className="p-8 bg-[var(--surface)] rounded-2xl flex flex-col justify-between shadow-xs border border-[var(--border)]/30">
                <div>
                  <div className="w-10 h-10 bg-[var(--bg)] rounded-xl flex items-center justify-center text-[var(--text)] mb-6 shadow-xs">
                    <Palette className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)] mb-3">
                    Identidad y marca
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-light">
                    Logotipos, manuales normativos y sistemas gráficos pensados para aplicarse sin problemas en cualquier soporte.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-4">
                  <div>· Logotipos y marcas gráficas</div>
                  <div>· Manuales de normas visuales</div>
                  <div>· Colores y tipografía</div>
                </div>
              </ScrollReveal>

              <ScrollReveal blur={8} yOffset={20} className="p-8 bg-[var(--surface)] rounded-2xl flex flex-col justify-between shadow-xs border border-[var(--border)]/30">
                <div>
                  <div className="w-10 h-10 bg-[var(--bg)] rounded-xl flex items-center justify-center text-[var(--text)] mb-6 shadow-xs">
                    <BookOpen className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)] mb-3">
                    Diseño digital e interfaces
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-light">
                    Estructuración de pantallas en Figma, prototipos interactivos y diseño de piezas digitales para marcas.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-4">
                  <div>· Prototipos en Figma</div>
                  <div>· Organización visual de pantallas</div>
                  <div>· Contenido para plataformas digitales</div>
                </div>
              </ScrollReveal>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default AboutPage;
