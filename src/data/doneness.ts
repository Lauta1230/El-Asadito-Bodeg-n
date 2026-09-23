import type { DonenessId, LocalizedText, MenuItem } from './types';

/**
 * Módulo de punto de la carne (Fase 3).
 * La elegibilidad y los niveles viven acá, separados de la UI.
 */

export interface DonenessLevel {
  id: DonenessId;
  label: LocalizedText;
  description: LocalizedText;
}

export const DONENESS_LEVELS: DonenessLevel[] = [
  {
    id: 'jugoso',
    label: { es: 'Jugoso', pt: 'Mal passado', en: 'Rare' },
    description: {
      es: 'Centro rojo y muy jugoso.',
      pt: 'Centro vermelho e bem suculento.',
      en: 'Red, very juicy center.',
    },
  },
  {
    id: 'a-punto',
    label: { es: 'A punto', pt: 'Ao ponto', en: 'Medium' },
    description: {
      es: 'Centro rosado y equilibrado.',
      pt: 'Centro rosado e equilibrado.',
      en: 'Pink, balanced center.',
    },
  },
  {
    id: 'bien-cocido',
    label: { es: 'Bien cocido', pt: 'Bem passado', en: 'Well done' },
    description: {
      es: 'Cocción completa y uniforme.',
      pt: 'Cozimento completo e uniforme.',
      en: 'Fully and evenly cooked.',
    },
  },
];

export function getDonenessLevel(id: DonenessId): DonenessLevel {
  const level = DONENESS_LEVELS.find((l) => l.id === id);
  if (!level) throw new Error(`Nivel de cocción desconocido: ${id}`);
  return level;
}

/**
 * Únicos productos de la carta existente cuyo punto de cocción aplica:
 * cortes de ternera a la parrilla. No se inventan productos ni se
 * agrega el selector a entradas, pastas, postres, bebidas ni a platos
 * donde el punto no corresponde (milanesas, horno, disco, etc.).
 */
const DONENESS_ELIGIBLE_IDS: ReadonlySet<string> = new Set([
  'churrascos-de-ternera',
  'churrasquito-de-ternera',
]);

/** Lógica de elegibilidad reutilizable, independiente de la UI. */
export function supportsDoneness(product: MenuItem): boolean {
  return DONENESS_ELIGIBLE_IDS.has(product.id);
}
