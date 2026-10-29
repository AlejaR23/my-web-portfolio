/**
 * ============================================================================
 * IMÁGENES PERMANENTES FIJADAS EN EL CÓDIGO FUENTE
 * ============================================================================
 * Todas las imágenes cargadas por el usuario ahora forman parte integral
 * del repositorio y del bundle de la aplicación.
 * 
 * Se importan directamente como assets estáticos para garantizar disponibilidad
 * offline, en modo incógnito, tras limpiar cookies/almacenamiento, o en nuevos navegadores.
 */

import imgExofauna from '../assets/uploads/SLOT-01-exofauna.jpg';
import imgTempo from '../assets/uploads/SLOT-02-tempo.jpg';
import imgSeValeAvisar from '../assets/uploads/SLOT-03-se-vale-avisar.jpg';
import imgTravelingChicken from '../assets/uploads/SLOT-04-the-traveling-chicken.png';
import imgVaultClothing from '../assets/uploads/SLOT-05-vault-clothing.png';
import imgTazzaCafe from '../assets/uploads/SLOT-06-tazza-cafe.png';
import imgKiemUniversity from '../assets/uploads/SLOT-07-kiem-university.png';

import imgScaler01 from '../assets/uploads/SLOT-SCALER-01.png';
import imgScaler02 from '../assets/uploads/SLOT-SCALER-02.png';
import imgScaler03 from '../assets/uploads/SLOT-SCALER-03.png';

import imgBio01 from '../assets/uploads/SLOT-BIO-01.jpg';

import imgScalerHomeDark from '../assets/uploads/SLOT-SCALER-HOME-DARK.jpg';
import imgScalerHomeLight from '../assets/uploads/SLOT-SCALER-HOME-LIGHT.jpg';
import imgScalerLogoColor from '../assets/uploads/SLOT-SCALER-LOGO-COLOR.jpg';
import imgScalerLogoWhite from '../assets/uploads/SLOT-SCALER-LOGO-WHITE.jpg';
import imgScalerLogoBlack from '../assets/uploads/scaler-logo-black.jpg';

import imgBrandExofauna from '../assets/uploads/brand-logo-exofauna.png';
import imgBrandTempo from '../assets/uploads/brand-logo-tempo.png';
import imgBrandSevale from '../assets/uploads/brand-logo-sevale.png';
import imgBrandScaler from '../assets/uploads/brand-logo-scaler.png';
import imgBrandBaul from '../assets/uploads/brand-logo-baul.png';
import imgBrandTaza from '../assets/uploads/brand-logo-taza.png';
import imgBrandKiem from '../assets/uploads/brand-logo-kiem.png';
import imgBrandTraveling from '../assets/uploads/brand-logo-traveling.png';

import uploadedManifest from './uploadedManifest.json';

export const PERMANENT_ASSET_MAP: Record<string, string> = {
  // Exofauna (SLOT-01)
  'exofauna': imgExofauna,
  'SLOT-01': imgExofauna,
  'exofauna-slot-01': imgExofauna,
  'exofauna_cover': imgExofauna,
  'exofauna-card': imgExofauna,

  // Tempo (SLOT-02)
  'tempo': imgTempo,
  'SLOT-02': imgTempo,
  'tempo-slot-01': imgTempo,
  'tempo_cover': imgTempo,
  'tempo-card': imgTempo,

  // Se Vale Avisar (SLOT-03)
  'se-vale-avisar': imgSeValeAvisar,
  'SLOT-03': imgSeValeAvisar,
  'se-vale-avisar-slot-01': imgSeValeAvisar,
  'se-vale-avisar_cover': imgSeValeAvisar,
  'se-vale-avisar-card': imgSeValeAvisar,

  // The Traveling Chicken (SLOT-04)
  'the-traveling-chicken': imgTravelingChicken,
  'traveling-chicken': imgTravelingChicken,
  'SLOT-04': imgTravelingChicken,
  'the-traveling-chicken-card': imgTravelingChicken,
  'the-traveling-chicken_cover': imgTravelingChicken,
  'the-traveling-chicken-slot-01': imgTravelingChicken,
  'SLOT-THE-TRAVELING-CHICKEN-01': imgTravelingChicken,

  // Vault Clothing (SLOT-05)
  'vault-clothing': imgVaultClothing,
  'vault': imgVaultClothing,
  'baul': imgVaultClothing,
  'SLOT-05': imgVaultClothing,
  'vault-clothing-card': imgVaultClothing,
  'vault-clothing_cover': imgVaultClothing,
  'vault-clothing-slot-01': imgVaultClothing,
  'SLOT-VAULT-CLOTHING-01': imgVaultClothing,

  // Tazza Cafe (SLOT-06)
  'tazza-cafe': imgTazzaCafe,
  'taza': imgTazzaCafe,
  'SLOT-06': imgTazzaCafe,
  'tazza-cafe-card': imgTazzaCafe,
  'tazza-cafe_cover': imgTazzaCafe,
  'tazza-cafe-slot-01': imgTazzaCafe,
  'SLOT-TAZZA-CAFE-01': imgTazzaCafe,

  // Kiem University (SLOT-07)
  'kiem-university': imgKiemUniversity,
  'kiem': imgKiemUniversity,
  'SLOT-07': imgKiemUniversity,
  'kiem-university-card': imgKiemUniversity,
  'kiem-university_cover': imgKiemUniversity,
  'kiem-university-slot-01': imgKiemUniversity,
  'SLOT-KIEM-UNIVERSITY-01': imgKiemUniversity,

  // Scaler project detail slots
  'SLOT-SCALER-01': imgScaler01,
  'scaler-01': imgScaler01,
  'SLOT-SCALER-02': imgScaler02,
  'scaler-02': imgScaler02,
  'SLOT-SCALER-03': imgScaler03,
  'scaler-03': imgScaler03,

  // Bio / Profile (SLOT-BIO-01)
  'bio': imgBio01,
  'alejandro-rivera': imgBio01,
  'SLOT-BIO-01': imgBio01,
  'bio-portrait': imgBio01,

  // Scaler showcase and logos
  'SLOT-SCALER-HOME-DARK': imgScalerHomeDark,
  'scaler-home-dark': imgScalerHomeDark,
  'SLOT-SCALER-HOME-LIGHT': imgScalerHomeLight,
  'scaler-home-light': imgScalerHomeLight,
  'SLOT-SCALER-LOGO-COLOR': imgScalerLogoColor,
  'scaler-logo-color': imgScalerLogoColor,
  'scaler-color': imgScalerLogoColor,
  'SLOT-SCALER-LOGO-WHITE': imgScalerLogoWhite,
  'scaler-logo-white': imgScalerLogoWhite,
  'scaler-white': imgScalerLogoWhite,
  'scaler-logo-black': imgScalerLogoBlack,
  'scaler-black': imgScalerLogoBlack,

  // Brand Collaboration Logos
  'brand-logo-exofauna': imgBrandExofauna,
  'brand-logo-tempo': imgBrandTempo,
  'brand-logo-sevale': imgBrandSevale,
  'brand-logo-scaler': imgBrandScaler,
  'brand-logo-baul': imgBrandBaul,
  'brand-logo-taza': imgBrandTaza,
  'brand-logo-kiem': imgBrandKiem,
  'brand-logo-traveling': imgBrandTraveling,
};

/**
 * Normaliza cualquier identificador (con o sin prefijo 'ar_slot_')
 * y devuelve la imagen fija empaquetada.
 */
export function getPermanentImage(identifier: string): string | null {
  if (!identifier) return null;
  const clean = identifier.replace(/^ar_slot_/, '').toLowerCase().trim();

  // Búsqueda en manifest dinámico
  const manifest = uploadedManifest as Record<string, string>;
  if (manifest[clean]) return manifest[clean];
  if (manifest[identifier]) return manifest[identifier];
  for (const [k, v] of Object.entries(manifest)) {
    if (k.toLowerCase() === clean) return v;
  }

  // Búsqueda directa en bundle
  if (PERMANENT_ASSET_MAP[clean]) {
    return PERMANENT_ASSET_MAP[clean];
  }

  // Búsqueda insensible a mayúsculas
  for (const [key, value] of Object.entries(PERMANENT_ASSET_MAP)) {
    if (key.toLowerCase() === clean) {
      return value;
    }
  }

  return null;
}
