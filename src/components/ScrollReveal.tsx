import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  blur?: number; // Starting blur radius in px (default: 8)
  yOffset?: number; // Starting translateY displacement in px (default: 20)
  scale?: number; // Starting scale (default: 1)
  as?: React.ElementType;
}

/**
 * ScrollReveal: Componente que hace que cualquier elemento (texto, imagen, tarjeta, sección)
 * aparezca progresivamente con un efecto de difuminado y opacidad conforme el usuario
 * hace scroll hacia abajo, alcanzando el 100% de color sólido y nitidez al entrar al viewport.
 */
export function ScrollReveal({
  children,
  className = '',
  blur = 8,
  yOffset = 20,
  scale = 1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Rango de scroll relativo a la posición del elemento en pantalla:
  // - 'start 96%': el borde superior del elemento apenas entra por la parte inferior de la ventana
  // - 'start 68%': el borde superior alcanza el tercio inferior de la pantalla (ya en posición óptima de lectura)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 96%', 'start 68%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const blurValue = useTransform(scrollYProgress, [0, 1], [blur, 0]);
  const filter = useTransform(blurValue, (v) => (v <= 0.2 ? 'none' : `blur(${v.toFixed(1)}px)`));
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);
  const s = useTransform(scrollYProgress, [0, 1], [scale, 1]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        filter,
        y,
        scale: s,
        willChange: 'opacity, filter, transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
