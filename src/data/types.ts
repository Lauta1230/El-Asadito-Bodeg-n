/**
 * Modelo de datos de la carta — Fase 2.
 *
 * El español es el idioma fuente: `es` siempre existe.
 * `pt` y `en` se resuelven con fallback a `es` al construir los datos,
 * por lo que nunca hay strings undefined.
 *
 * Los precios permanecen SIEMPRE en ARS (`priceARS`); la conversión
 * a otras monedas ocurre únicamente al renderizar (ver utils/format).
 *
 * Sigue reservado para fases siguientes: punto de carne, sommelier,
 * maridajes y reseñas.
 */

export type Language = 'es' | 'pt' | 'en';

/** Texto localizado. `es` es la fuente; `pt`/`en` ya llegan con fallback aplicado. */
export interface LocalizedText {
  es: string;
  pt: string;
  en: string;
}

export type CategoryId =
  | 'entradas'
  | 'para-compartir'
  | 'principales'
  | 'platos-de-invierno'
  | 'pastas'
  | 'postres'
  | 'bebidas';

export interface Category {
  id: CategoryId;
  /** Nombre tal como figura en la carta física, localizado. */
  label: LocalizedText;
  /** Nota textual de la carta que acompaña a la sección (si existe), localizada. */
  note?: LocalizedText;
}

export interface MenuItem {
  id: string;
  category: CategoryId;
  /** Nombre tal como figura en la carta física, localizado. */
  name: LocalizedText;
  /** Descripción tal como figura en la carta física, localizada. Ausente si la carta no la provee. */
  description?: LocalizedText;
  /** Precio base en pesos argentinos, tal como figura en la carta física. Nunca se modifica. */
  priceARS: number;

  /* ---- Reservado para fases siguientes (no se usa todavía) ----
   * images?: string[];
   * meatPoint?: boolean;              // selector de punto de carne
   * pairing?: string[];               // vinos / maridajes sugeridos
   * reviews?: { average: number; count: number };
   * ------------------------------------------------------------- */
}

export type CurrencyCode = 'ARS' | 'USD' | 'BRL';

export type RateType = 'oficial' | 'blue';

/** Niveles de punto de la carne ofrecidos (Fase 3). */
export type DonenessId = 'jugoso' | 'a-punto' | 'bien-cocido';

export interface RestaurantMeta {
  name: string;
  sub: string;
  address: string;
  instagramHandle: string;
  instagramUrl: string;
  mapsUrl: string;
}
