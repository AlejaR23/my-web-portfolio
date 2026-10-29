/**
 * Client-side browser storage utility using IndexedDB with localStorage sync.
 * Important: Data is stored exclusively within the local browser profile/origin.
 * It does NOT commit files to the project repository and does not guarantee
 * persistence across different browsers, private windows, or AI Studio preview container resets.
 */

const DB_NAME = 'AlejandroRiveraPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_images';

export interface PersistImageResult {
  indexedDB: boolean;
  localStorage: boolean;
  saved: boolean;
  storageType: 'both' | 'indexedDB-only' | 'localStorage-only';
  message: string;
}

const SLUG_TO_SLOT: Record<string, string> = {
  exofauna: 'SLOT-01',
  tempo: 'SLOT-02',
  'se-vale-avisar': 'SLOT-03',
  'the-traveling-chicken': 'SLOT-04',
  'traveling-chicken': 'SLOT-04',
  'the-traveling-chicken-card': 'SLOT-04',
  'SLOT-THE-TRAVELING-CHICKEN-01': 'SLOT-04',
  'vault-clothing': 'SLOT-05',
  baul: 'SLOT-05',
  'vault-clothing-card': 'SLOT-05',
  'SLOT-VAULT-CLOTHING-01': 'SLOT-05',
  'tazza-cafe': 'SLOT-06',
  taza: 'SLOT-06',
  'tazza-cafe-card': 'SLOT-06',
  'SLOT-TAZZA-CAFE-01': 'SLOT-06',
  'kiem-university': 'SLOT-07',
  kiem: 'SLOT-07',
  'kiem-university-card': 'SLOT-07',
  'SLOT-KIEM-UNIVERSITY-01': 'SLOT-07',
  'scaler-home-light': 'SLOT-SCALER-HOME-LIGHT',
  'scaler-home-dark': 'SLOT-SCALER-HOME-DARK',
  'scaler-color': 'SLOT-SCALER-LOGO-COLOR',
  'scaler-white': 'SLOT-SCALER-LOGO-WHITE',
  'scaler-black': 'SLOT-SCALER-LOGO-BLACK',
  'scaler-logo-color': 'SLOT-SCALER-LOGO-COLOR',
  'scaler-logo-white': 'SLOT-SCALER-LOGO-WHITE',
  'scaler-logo-black': 'SLOT-SCALER-LOGO-BLACK',
};

const SLOT_TO_SLUG: Record<string, string> = {
  'SLOT-01': 'exofauna',
  'SLOT-02': 'tempo',
  'SLOT-03': 'se-vale-avisar',
  'SLOT-04': 'the-traveling-chicken',
  'SLOT-05': 'vault-clothing',
  'SLOT-06': 'tazza-cafe',
  'SLOT-07': 'kiem-university',
  'SLOT-THE-TRAVELING-CHICKEN-01': 'the-traveling-chicken',
  'SLOT-VAULT-CLOTHING-01': 'vault-clothing',
  'SLOT-TAZZA-CAFE-01': 'tazza-cafe',
  'SLOT-KIEM-UNIVERSITY-01': 'kiem-university',
  'SLOT-SCALER-HOME-LIGHT': 'scaler-color',
  'SLOT-SCALER-HOME-DARK': 'scaler-white',
  'SLOT-SCALER-LOGO-COLOR': 'scaler-color',
  'SLOT-SCALER-LOGO-WHITE': 'scaler-white',
  'SLOT-SCALER-LOGO-BLACK': 'scaler-black',
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('IDB open failed'));
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Processes image files for display and browser storage.
 * Depending on the file type and original dimensions, processing may downscale
 * large images (up to 3840px) or compress them as JPEG (for non-PNG formats).
 * SVG and small PNG/WebP files are kept as-is when possible.
 * Note: Storing files in browser memory (IndexedDB/localStorage) is client-side
 * and does not guarantee persistence across origins, sessions, or browser cleanups.
 */
export async function optimizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // If user uploads an SVG file, keep it 100% native vector without rasterizing
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
      return;
    }

    // If file is under 2MB and already clean PNG or WebP, use raw data URL directly for pristine 1:1 fidelity
    if (file.size <= 2 * 1024 * 1024 && (file.type === 'image/png' || file.type === 'image/webp')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        // High-definition maximum dimension (3840px 4K resolution)
        const MAX_DIM = 3840;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        // Draw with maximum smoothing quality for razor-sharp reproduction
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Keep PNG format for transparent or vector-like graphic files
        if (file.type === 'image/png') {
          resolve(canvas.toDataURL('image/png'));
          return;
        }

        // Ultra high-fidelity JPEG with 0.94 quality for crystal-clear photographic reproduction
        const quality = 0.94;
        const optimized = canvas.toDataURL('image/jpeg', quality);
        resolve(optimized);
      };
      img.onerror = () => resolve(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Image processor tailored for brand logos and icons.
 * Preserves PNG transparency and constrains dimensions to a maximum of 800px × 400px.
 * The reduced file size helps mitigate storage limits, but may still exceed browser
 * localStorage quotas depending on total usage; persistImage reports the actual storage outcome.
 */
export async function optimizeLogoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // If user uploads an SVG file, keep it as-is without rasterizing
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const MAX_W = 800;
        const MAX_H = 400;
        let { width, height } = img;

        if (width > MAX_W || height > MAX_H) {
          const ratio = Math.min(MAX_W / width, MAX_H / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        // Clean transparent canvas
        ctx.clearRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Output as PNG to preserve transparent background
        const optimizedPng = canvas.toDataURL('image/png');
        resolve(optimizedPng);
      };
      img.onerror = () => resolve(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Save image to browser storage using IndexedDB as the primary and unique target for new images.
 * Does NOT write new images to localStorage or hydrate localStorage, preventing quota exhaustion.
 * Returns explicit status indicating IndexedDB storage success.
 * Throws an error if IndexedDB fails so caller surfaces a visible error and keeps previous image.
 */
export async function persistImage(identifier: string, dataUrl: string): Promise<PersistImageResult> {
  const cleanId = identifier.replace(/^ar_slot_/, '');
  const primaryKey = `ar_slot_${cleanId}`;

  // Keys to associate in IndexedDB
  const keys = new Set<string>();
  keys.add(primaryKey);
  if (SLUG_TO_SLOT[cleanId]) {
    keys.add(`ar_slot_${SLUG_TO_SLOT[cleanId]}`);
  }
  if (SLOT_TO_SLUG[cleanId]) {
    keys.add(`ar_slot_${SLOT_TO_SLUG[cleanId]}`);
  }

  // 1. Write to IndexedDB (sole and authoritative storage for new images)
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      keys.forEach((key) => {
        store.put(dataUrl, key);
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error('IndexedDB transaction error'));
      tx.onabort = () => reject(new Error('IndexedDB transaction aborted'));
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[imageStorage] Error al escribir en IndexedDB:', error);
    throw new Error(
      `No fue posible guardar la imagen en el almacenamiento local del navegador (IndexedDB falló: ${error.message}). Se conserva la imagen anterior.`
    );
  }

  // 2. Broadcast update to all mounted components & windows only when actually persisted
  if (typeof window !== 'undefined') {
    keys.forEach((k) => {
      const id = k.replace(/^ar_slot_/, '');
      window.dispatchEvent(
        new CustomEvent('ar_image_updated', {
          detail: { identifier: id, dataUrl },
        })
      );
    });
  }

  return {
    indexedDB: true,
    localStorage: false,
    saved: true,
    storageType: 'indexedDB-only',
    message: 'Guardada en IndexedDB de este navegador.',
  };
}

/**
 * Synchronous read from localStorage (retained only for backwards compatibility with legacy records).
 */
export function getStoredImageSync(identifier: string): string | null {
  if (typeof window === 'undefined') return null;
  const cleanId = identifier.replace(/^ar_slot_/, '');
  const candidateKeys = [
    `ar_slot_${cleanId}`,
    SLUG_TO_SLOT[cleanId] ? `ar_slot_${SLUG_TO_SLOT[cleanId]}` : '',
    SLOT_TO_SLUG[cleanId] ? `ar_slot_${SLOT_TO_SLUG[cleanId]}` : '',
  ].filter(Boolean);

  for (const k of candidateKeys) {
    try {
      const val = localStorage.getItem(k);
      if (val && typeof val === 'string' && val.startsWith('data:image')) {
        return val;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

/**
 * Asynchronous load: checks IndexedDB first (primary authoritative storage).
 * Falls back to localStorage ONLY as last resort for older legacy records.
 * Does NOT write or hydrate back to localStorage.
 */
export async function getStoredImageAsync(identifier: string): Promise<string | null> {
  const cleanId = identifier.replace(/^ar_slot_/, '');
  const candidateKeys = [
    `ar_slot_${cleanId}`,
    SLUG_TO_SLOT[cleanId] ? `ar_slot_${SLUG_TO_SLOT[cleanId]}` : '',
    SLOT_TO_SLUG[cleanId] ? `ar_slot_${SLOT_TO_SLUG[cleanId]}` : '',
  ].filter(Boolean);

  // 1. Query IndexedDB FIRST
  try {
    const db = await openDB();
    for (const key of candidateKeys) {
      const val = await new Promise<string | null>((resolve) => {
        try {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.get(key);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        } catch {
          resolve(null);
        }
      });

      if (val && typeof val === 'string' && val.startsWith('data:image')) {
        return val;
      }
    }
  } catch (err) {
    console.warn('[imageStorage] Error al leer de IndexedDB:', err);
  }

  // 2. Query localStorage only as last resort for legacy records (never overrides IndexedDB)
  const legacyVal = getStoredImageSync(identifier);
  if (legacyVal) {
    return legacyVal;
  }

  return null;
}

/**
 * Remove image from both stores
 */
export async function removePersistedImage(identifier: string): Promise<void> {
  const cleanId = identifier.replace(/^ar_slot_/, '');
  const candidateKeys = [
    `ar_slot_${cleanId}`,
    SLUG_TO_SLOT[cleanId] ? `ar_slot_${SLUG_TO_SLOT[cleanId]}` : '',
    SLOT_TO_SLUG[cleanId] ? `ar_slot_${SLOT_TO_SLUG[cleanId]}` : '',
  ].filter(Boolean);

  candidateKeys.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  });

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    candidateKeys.forEach((key) => store.delete(key));
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    candidateKeys.forEach((k) => {
      const id = k.replace(/^ar_slot_/, '');
      window.dispatchEvent(
        new CustomEvent('ar_image_updated', {
          detail: { identifier: id, dataUrl: null },
        })
      );
    });
  }
}

const HERO_VIDEO_KEY = 'ar_hero_video_blob';

/**
 * Persist uploaded Hero showreel video in IndexedDB (handles large multi-MB video files safely)
 */
export async function persistHeroVideo(blob: Blob): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(blob, HERO_VIDEO_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(new Error('IndexedDB transaction aborted'));
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ar_hero_video_updated'));
  }
}

/**
 * Retrieve persisted Hero video blob from IndexedDB
 */
export async function getStoredHeroVideo(): Promise<Blob | null> {
  try {
    const db = await openDB();
    return await new Promise<Blob | null>((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(HERO_VIDEO_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  } catch {
    return null;
  }
}

/**
 * Remove stored Hero video from IndexedDB
 */
export async function removeStoredHeroVideo(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(HERO_VIDEO_KEY);
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ar_hero_video_updated'));
  }
}

