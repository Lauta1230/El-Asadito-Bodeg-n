import type { MenuItem } from './types';
import { WINES, type WineInfo } from './wine';

/**
 * Lógica de maridaje separada de la UI (Fase 4).
 * Relaciones producto → vinos REALES de la carta, por id.
 *
 * Prioridad aplicada: 1) carnes rojas, 2) platos intensos,
 * 3) pastas con salsas fuertes. Sin recomendación donde no aporta
 * (pescados, salsas cremosas, entradas livianas, postres, bebidas).
 */

const PAIRINGS: Record<string, string[]> = {
  /* Entradas: carnes frías y quesos de parrilla */
  'vitel-tone': ['pinguino-vino-casa-sifon'],
  provoleta: ['pinguino-vino-casa-sifon'],

  /* Para compartir: carnes rojas y platos contundentes */
  'ravioles-de-osobuco-compartir': ['pinguino-vino-casa-sifon'],
  'pastel-de-papa-mendocino-compartir': ['pinguino-vino-casa-sifon'],
  'churrascos-de-ternera': ['pinguino-vino-casa-sifon'],
  'milanesa-de-ojo-de-bife-compartir': ['pinguino-vino-casa-sifon'],
  'matambre-a-la-pizza': ['pinguino-vino-casa-sifon'],
  'vacio-al-horno-con-papas': ['pinguino-vino-casa-sifon'],

  /* Principales: carnes y platos intensos (trucha excluida) */
  'pollo-al-disco': ['pinguino-vino-casa-sifon'],
  'pastel-de-papa-mendocino': ['pinguino-vino-casa-sifon'],
  'milanesa-de-ojo-de-bife': ['pinguino-vino-casa-sifon'],
  'churrasquito-de-ternera': ['pinguino-vino-casa-sifon'],

  /* Platos de invierno: guisos criollos y horno */
  'locro-criollo': ['pinguino-vino-casa-sifon'],
  'guiso-de-lentejas': ['pinguino-vino-casa-sifon'],
  'vacio-al-horno': ['pinguino-vino-casa-sifon'],

  /* Pastas con salsas fuertes */
  'ravioles-de-osobuco': ['pinguino-vino-casa-sifon'],
  'tallarines-con-tuco-y-pesto': ['pinguino-vino-casa-sifon'],
  'lasana-de-vacio-ahumado': ['pinguino-vino-casa-sifon'],
};

/** Recomendaciones de vinos reales para un producto; [] si no corresponde. */
export function getWineRecommendations(product: MenuItem): WineInfo[] {
  const wineIds = PAIRINGS[product.id];
  if (!wineIds) return [];
  return wineIds
    .map((id) => WINES.find((wine) => wine.id === id))
    .filter((wine): wine is WineInfo => wine !== undefined);
}

export function hasWinePairing(product: MenuItem): boolean {
  return getWineRecommendations(product).length > 0;
}
