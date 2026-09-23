import { convertFromARS } from '../data/exchangeRates';
import type { CurrencyCode, RateType } from '../data/types';

/** Formatea un monto en pesos argentinos como figura en la carta: "$ 12.500". */
export function formatARS(value: number): string {
  return `$ ${value.toLocaleString('es-AR')}`;
}

const TWO_DECIMALS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as const;

/**
 * Formatea un precio base en ARS según moneda y tipo de cambio.
 * La conversión ocurre SOLO acá (al renderizar); el dato base nunca cambia.
 *
 *  ARS → "$ 12.500" · USD → "U$S 10,42" · BRL → "R$ 57,80"
 */
export function formatPrice(
  priceARS: number,
  currency: CurrencyCode,
  rateType: RateType,
): string {
  const value = convertFromARS(priceARS, currency, rateType);
  if (currency === 'ARS') return formatARS(Math.round(value));
  if (currency === 'USD') return `U$S ${value.toLocaleString('es-AR', TWO_DECIMALS)}`;
  return `R$ ${value.toLocaleString('es-AR', TWO_DECIMALS)}`;
}
