import React, { useState } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import { LetterScrollReveal } from '../components/LetterScrollReveal';
import { 
  Mail, 
  ArrowUpRight, 
  Check, 
  Copy,
  ExternalLink,
  Clock
} from 'lucide-react';

export function ContactPage() {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const OUTLOOK_EMAIL = 'alejandrorr.castro23@outlook.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OUTLOOK_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      console.error('No se pudo copiar:', e);
    }
  };

  const handleContactByEmail = () => {
    setEmailRevealed(true);
    const subject = encodeURIComponent('Consulta - Alejandro Rivera');
    window.location.href = `mailto:${OUTLOOK_EMAIL}?subject=${subject}`;
  };

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <main className="pt-32 sm:pt-40 pb-36 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Masthead */}
          <ScrollReveal blur={8} yOffset={20} className="pb-12 mb-12 w-full text-center max-w-3xl mx-auto">
            <LetterScrollReveal
              as="h1"
              text="Hablemos"
              className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[var(--text)] tracking-tight mb-6 leading-none text-center"
              center={true}
            />

            <p className="text-xl sm:text-2xl text-[var(--text-muted)] leading-relaxed font-light text-center">
              Conversemos sobre tu proyecto o tu marca. Escríbeme directamente por correo y vemos cómo trabajar juntos.
            </p>
          </ScrollReveal>

          {/* Centered Hub Layout */}
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Primary Contact Card: Direct Email */}
            <ScrollReveal blur={8} yOffset={22}>
              <div className="p-8 sm:p-12 bg-[var(--surface)] rounded-2xl shadow-xs border border-[var(--border)]/30 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--bg)] rounded-xl flex items-center justify-center text-[var(--text)] shadow-xs shrink-0 mt-1">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                      Correo electrónico
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--text-muted)] font-light leading-relaxed">
                      Escríbeme para cotizaciones de diseño publicitario, desarrollo de identidad visual o colaboraciones creativas. Suelo responder en menos de 24 horas.
                    </p>
                  </div>
                </div>

                {!emailRevealed ? (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleContactByEmail}
                      className="btn-bounce w-full sm:w-auto px-8 py-4 bg-[var(--primary)] text-[var(--on-accent)] text-xs font-semibold uppercase tracking-wider hover:bg-[var(--primary-hover)] inline-flex items-center justify-center gap-2.5 rounded-full shadow-md cursor-pointer transition-colors"
                      aria-label="Contactar por correo electrónico"
                    >
                      <span>Contactar por correo</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 pt-2">
                    <div className="p-4 sm:p-5 bg-[var(--bg)] border border-[var(--border)]/60 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block font-medium mb-0.5">
                          Dirección de correo
                        </span>
                        <span className="text-base sm:text-lg font-semibold text-[var(--text)] font-mono select-all break-all">
                          {OUTLOOK_EMAIL}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="btn-bounce px-4 py-2.5 bg-[var(--surface)] hover:bg-[var(--surface-raised,var(--surface))] text-xs font-mono rounded-lg border border-[var(--border)] text-[var(--text)] inline-flex items-center gap-2 cursor-pointer transition-colors shrink-0"
                        aria-label="Copiar dirección de correo al portapapeles"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                            <span className="text-emerald-500 font-semibold">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copiar correo</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <a
                        href={`mailto:${OUTLOOK_EMAIL}?subject=Consulta%20-%20Alejandro%20Rivera`}
                        className="btn-bounce px-6 py-3 bg-[var(--primary)] text-[var(--on-accent)] text-xs font-semibold uppercase tracking-wider hover:bg-[var(--primary-hover)] inline-flex items-center gap-2 rounded-full shadow-xs"
                      >
                        <span>Abrir app de correo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setEmailRevealed(false)}
                        className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] transition-colors underline cursor-pointer"
                      >
                        Ocultar correo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Secondary Grid: Behance & Work details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Behance Feature */}
              <ScrollReveal blur={8} yOffset={24}>
                <div className="p-8 bg-[var(--surface)] rounded-2xl shadow-xs border border-[var(--border)]/30 space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block font-medium">
                      Portafolio en línea
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text)] tracking-tight">
                      Behance 2026
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed">
                      Revisa casos completos de diseño gráfico, marcas y piezas publicitarias con mayor detalle visual.
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="https://www.behance.net/gallery/254632137/PORTFOLIO-Graphic-Design-2026?platform=direct"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-bounce inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text)] hover:text-[var(--primary)] transition-colors font-mono"
                    >
                      <span>Ver Behance 2026</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Availability & Turnaround */}
              <ScrollReveal blur={8} yOffset={26}>
                <div className="p-8 bg-[var(--surface)] rounded-2xl shadow-xs border border-[var(--border)]/30 space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block font-medium">
                      Disponibilidad
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text)] tracking-tight">
                      Proyectos & Tiempos
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-muted)] font-light pt-1">
                      <li className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
                        <span>Respuesta en menos de 24 horas</span>
                      </li>
                      <li>
                        <strong className="text-[var(--text)] font-medium">Modalidad:</strong> Proyectos locales y remotos
                      </li>
                      <li>
                        <strong className="text-[var(--text)] font-medium">Enfoque:</strong> Identidad, dirección de arte y publicidad
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-[var(--text-muted)]">
                    San José, Costa Rica · 2026
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default ContactPage;
