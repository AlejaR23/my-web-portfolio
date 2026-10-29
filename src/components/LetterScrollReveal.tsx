import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export interface LetterScrollRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  blur?: number; // Starting blur radius in px (default: 14)
  yOffset?: number; // Starting translateY displacement in px (default: 14)
  offset?: [string, string]; // Scroll trigger range (default: ['start 92%', 'start 45%'])
  center?: boolean; // Ensures written centered alignment (default: true)
}

interface LetterItemProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: any;
  maxBlur: number;
  yOffset: number;
  prefersReduced: boolean | null;
}

function LetterItem({
  char,
  index,
  total,
  scrollYProgress,
  maxBlur,
  yOffset,
  prefersReduced,
}: LetterItemProps) {
  // Distribute start times across 0% to 70% of the total scroll progress window,
  // allowing each character a generous 30% transition slice to unblur into solid color.
  const spread = 0.70;
  const slice = total > 1 ? (spread / total) : spread;
  const start = index * slice;
  const end = Math.min(1, start + 0.30);

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const blurVal = useTransform(scrollYProgress, [start, end], [maxBlur, 0]);
  const filter = useTransform(blurVal, (v) => (v <= 0.2 ? 'none' : `blur(${v.toFixed(1)}px)`));
  const y = useTransform(scrollYProgress, [start, end], [yOffset, 0]);

  if (prefersReduced) {
    return <span className="inline-block">{char}</span>;
  }

  return (
    <motion.span
      style={{
        opacity,
        filter,
        y,
        willChange: 'opacity, filter, transform',
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
}

/**
 * LetterScrollReveal: Revela títulos letra por letra de forma progresiva con el scroll.
 * En un inicio el texto permanece 100% invisible y difuminado, y conforme el usuario
 * baja con el mouse, cada letra aparece y se aclara hasta formar la frase completa en color sólido.
 * Por defecto aplica alineación centrada (text-center) para que el texto esté escrito centrado.
 */
export function LetterScrollReveal({
  text,
  className = '',
  as: Component = 'h2',
  blur = 14,
  yOffset = 14,
  offset = ['start 92%', 'start 45%'],
  center = true,
}: LetterScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  // Calculate total visible characters to normalize the stagger sequence
  const words = text.split(' ');
  let charCounter = 0;
  const totalChars = text.replace(/\s+/g, '').length || 1;

  const alignmentClasses = center ? 'text-center mx-auto' : '';

  if (prefersReduced) {
    return (
      <Component className={`${alignmentClasses} ${className}`}>
        {text}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef}
      className={`${alignmentClasses} ${className}`}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className={center ? 'inline-block text-center w-full' : 'inline'}
      >
        {words.map((word, wordIdx) => {
          const letters = Array.from(word);
          return (
            <React.Fragment key={`word-${wordIdx}`}>
              <span className="inline-block whitespace-nowrap">
                {letters.map((char, charIdx) => {
                  const currentIdx = charCounter++;
                  return (
                    <LetterItem
                      key={`char-${wordIdx}-${charIdx}`}
                      char={char}
                      index={currentIdx}
                      total={totalChars}
                      scrollYProgress={scrollYProgress}
                      maxBlur={blur}
                      yOffset={yOffset}
                      prefersReduced={prefersReduced}
                    />
                  );
                })}
              </span>
              {wordIdx < words.length - 1 && (
                <span className="inline-block select-none">&nbsp;</span>
              )}
            </React.Fragment>
          );
        })}
      </span>
    </Component>
  );
}

export default LetterScrollReveal;
