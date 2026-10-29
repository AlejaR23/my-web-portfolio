import React, { useState } from 'react';
import { 
  Mail, 
  ArrowUpRight, 
  Send, 
  Check 
} from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const OUTLOOK_EMAIL = 'alejandrorr.castro23@outlook.com';

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Por favor ingresa tu nombre.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Por favor ingresa tu correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'El formato del correo no es válido.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Por favor escribe tu mensaje.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-200 overflow-x-hidden font-sans bg-[var(--bg)]">
      <main className="pt-32 sm:pt-40 pb-36 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 w-full">
        
        {/* Masthead */}
        <div className="pb-12 mb-16 w-full">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[var(--text)] tracking-tight mb-6 leading-none">
            Hablemos
          </h1>

          <p className="text-xl sm:text-2xl text-[var(--text-muted)] leading-relaxed font-light">
            Conversemos sobre tu proyecto o tu marca. Escríbeme y vemos cómo trabajar juntos.
          </p>
        </div>

        {/* Expansive 12-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight mb-3">
                Canales directos
              </h2>
              <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed">
                Puedes escribirme directamente por correo electrónico o revisar mis proyectos en Behance. Suelo contestar en menos de un día.
              </p>
            </div>

            {/* Direct Email Box */}
            <div className="p-8 bg-[var(--surface)] rounded-[3px] space-y-4 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-[var(--bg)] rounded-[3px] flex items-center justify-center text-[var(--text)] shadow-xs shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block font-medium">
                    Correo electrónico
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[var(--text)] block truncate">
                    Mensaje directo
                  </span>
                </div>
              </div>
              <a
                href={`mailto:${OUTLOOK_EMAIL}?subject=Consulta%20-%20Alejandro%20Rivera`}
                className="w-full py-3.5 bg-[var(--primary)] text-[var(--on-accent)] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 rounded-[3px] shadow-xs active:scale-95"
              >
                <span>Contactar por correo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Behance Link */}
            <div className="p-8 bg-[var(--surface)] rounded-[3px] space-y-3 shadow-xs text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)] uppercase">Portafolio en Behance</span>
                <a
                  href="https://www.behance.net/gallery/254632137/PORTFOLIO-Graphic-Design-2026?platform=direct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--text)] hover:underline inline-flex items-center gap-1 text-sm font-sans"
                >
                  <span>Ver Behance 2026</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-[var(--surface)] rounded-[3px] shadow-xs">
            <div className="pb-6 mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                Enviar un mensaje
              </h3>
            </div>

            {submitted ? (
              <div className="p-8 bg-[var(--bg)] rounded-[3px] flex items-start gap-4 text-emerald-500 shadow-xs" role="status">
                <Check className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-base text-[var(--text)] mb-1">Mensaje Enviado</h4>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans font-light">
                    Gracias por tu mensaje, <strong className="text-[var(--text)]">{formData.name}</strong>. Alejandro Rivera se pondrá en contacto a la brevedad.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre o empresa"
                    className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-[3px] text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--text)] transition-colors"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1 font-mono">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu.correo@ejemplo.com"
                    className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-[3px] text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--text)] transition-colors"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 font-mono">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribe aquí los detalles de tu consulta o proyecto…"
                    className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-[3px] text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--text)] transition-colors resize-y"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1 font-mono">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[var(--primary)] text-[var(--on-accent)] font-semibold text-xs tracking-wider uppercase rounded-[3px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 shadow-xs active:scale-98"
                  >
                    {loading ? (
                      <span>Enviando…</span>
                    ) : (
                      <>
                        <span>Enviar Mensaje</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

export default ContactPage;
