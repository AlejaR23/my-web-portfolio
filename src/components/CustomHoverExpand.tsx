import React from 'react';
import { HoverExpand_001 } from "@/components/v1/skiper52";
import { getProjectDefaultImage } from '../utils/projectArtworkImages';

/**
 * CustomHoverExpand: Implementation of the HoverExpand_001 carousel
 * for the "Exploración de Obras" section of Alejandro Rivera's portfolio.
 * 
 * Features:
 * - Direct implementation of the user's HoverExpand_001 pattern
 * - Supports custom images uploaded via placeholders (stored persistently)
 * - Full-bleed photos with no obstructive cards or heavy glass layers
 * - Smooth hover expansion with spring physics
 */
export const CustomHoverExpand = ({ className = "" }: { className?: string }) => {
  const images = [
    {
      src: getProjectDefaultImage('exofauna'),
      alt: "Exofauna: Hospital Veterinario & Rescate Silvestre",
      title: "Exofauna",
      subtitle: "Libro de Marca",
      slug: "exofauna",
      slotId: "SLOT-01",
      href: "/work/exofauna",
    },
    {
      src: getProjectDefaultImage('tempo'),
      alt: "Tempo: Plataforma Ciclista & Interfaz HUD",
      title: "Tempo",
      subtitle: "Diseño de Interfaz & Telemetría",
      slug: "tempo",
      slotId: "SLOT-02",
      href: "/work/tempo",
    },
    {
      src: getProjectDefaultImage('se-vale-avisar'),
      alt: "Se Vale Avisar: Campaña Nacional de Comunicación",
      title: "Se Vale Avisar",
      subtitle: "Campaña de Comunicación",
      slug: "se-vale-avisar",
      slotId: "SLOT-03",
      href: "/work/se-vale-avisar",
    },
    {
      src: getProjectDefaultImage('the-traveling-chicken'),
      alt: "The Traveling Chicken: Food Truck Móvil & Branding",
      title: "The Traveling Chicken",
      subtitle: "Identidad & Emblema",
      slug: "the-traveling-chicken",
      slotId: "SLOT-04",
      href: "/work/the-traveling-chicken",
    },
    {
      src: getProjectDefaultImage('vault-clothing'),
      alt: "VAULT: Moda Urbana Minimalista",
      title: "VAULT",
      subtitle: "Identidad & Monograma",
      slug: "vault-clothing",
      slotId: "SLOT-05",
      href: "/work/vault-clothing",
    },
    {
      src: getProjectDefaultImage('tazza-cafe'),
      alt: "Taza (Tazza Cafe): Café de Especialidad & Origen Botánico",
      title: "Taza (Tazza Cafe)",
      subtitle: "Identidad & Marca Gráfica",
      slug: "tazza-cafe",
      slotId: "SLOT-06",
      href: "/work/tazza-cafe",
    },
    {
      src: getProjectDefaultImage('kiem-university'),
      alt: "Kiem (KIEM University): Identidad Universitaria & Monograma",
      title: "Kiem (KIEM)",
      subtitle: "Identidad Universitaria",
      slug: "kiem-university",
      slotId: "SLOT-07",
      href: "/work/kiem-university",
    },
  ];

  return <HoverExpand_001 images={images} className={className} />;
};

export default CustomHoverExpand;
