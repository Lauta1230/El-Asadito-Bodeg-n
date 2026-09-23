import type { LocalizedText } from './types';

/**
 * Vinos de la carta real de El Asadito Bodegón (Fase 4).
 *
 * Única fuente de identidad/precio: `menu.ts` (el id referencia el ítem
 * de Bebidas). No se inventan bodegas, etiquetas ni cepas: los campos
 * que la carta no provee quedan como pendientes y NO se renderizan.
 *
 * La nota de cata y el "ideal para" son contenido editorial del
 * sommelier digital (interfaz), no datos oficiales del restaurante.
 */

export interface WineInfo {
  /** Id del ítem de Bebidas en menu.ts (fuente de nombre y precio). */
  id: string;
  /** Nota editorial del sommelier digital, localizada. */
  note: LocalizedText;
  /** Sugerencia de maridaje del sommelier digital, localizada. */
  idealFor: LocalizedText;
  /** Pendientes de la carta real: no se muestran ni se inventan. */
  bodega?: string;
  cepa?: string;
}

export const WINES: WineInfo[] = [
  {
    id: 'pinguino-vino-casa-sifon',
    note: {
      es: 'Vino de la casa al estilo bodegón: sencillo, frutal y fácil de beber. Llega en pingüino con sifón, bien tradicional, ideal para compartir.',
      pt: 'Vinho da casa em estilo bodegón: simples, frutado e fácil de beber. Chega no pinguim com sifão, bem tradicional, ideal para compartilhar.',
      en: 'House wine, bodegón style: simple, fruity and easy to drink. It comes in a penguin carafe with a soda siphon — traditional and great for sharing.',
    },
    idealFor: {
      es: 'carnes grilladas, guisos criollos y pastas con salsas contundentes.',
      pt: 'carnes grelhadas, ensopados crioulos e massas com molhos encorpados.',
      en: 'grilled meats, criolla stews and pasta with hearty sauces.',
    },
  },
];
