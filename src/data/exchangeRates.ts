import type { CurrencyCode, RateType } from './types';

/**
 * Configuración CENTRAL de tasas de cambio (base ARS).
 *
 * Valores manuales de REFERENCIA al 2026-09-22 (venta):
 *  - Dólar oficial BNA: $1.535 · Dólar blue: $1.555
 *  - BRL: paridad implícita ≈ 292 (oficial) / ≈ 296 (blue)
 *
 * Las tasas expresan cuántos ARS vale 1 unidad de la moneda extranjera.
 *
 * Arquitectura: los componentes de la carta NUNCA leen este objeto
 * directamente; consumen `convertFromARS` / `formatPrice`. En una fase
 * posterior se puede hidratar esta config desde una API de cotizaciones
 * (fetch al arranque o provider) sin tocar ningún componente.
 */

export interface ExchangeRateTable {
  /** ARS por 1 USD */
  usd: number;
  /** ARS por 1 BRL */
  brl: number;
}

export interface ExchangeRatesConfig {
  base: 'ARS';
  /** Fecha ISO de la carga manual de referencia. */
  updatedAt: string;
  oficial: ExchangeRateTable;
  blue: ExchangeRateTable;
}

export const exchangeRates: ExchangeRatesConfig = {
  base: 'ARS',
  updatedAt: '2026-09-22',
  oficial: { usd: 1535, brl: 292 },
  blue: { usd: 1555, brl: 296 },
};

/** Convierte un precio base en ARS a la moneda y tipo de cambio elegidos. */
export function convertFromARS(
  ars: number,
  currency: CurrencyCode,
  rateType: RateType,
): number {
  if (currency === 'ARS') return ars;
  const table = exchangeRates[rateType];
  const arsPerUnit = currency === 'USD' ? table.usd : table.brl;
  return ars / arsPerUnit;
}
