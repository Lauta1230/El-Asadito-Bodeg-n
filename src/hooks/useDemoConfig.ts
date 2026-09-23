import { getResolvedBusiness, type ResolvedBusiness } from '../utils/demoConfig';

/**
 * Única fuente de verdad de branding/datos operativos de la demo:
 * nombre, mesa, WhatsApp, Maps y logo (defaults de El Asadito +
 * overrides válidos de query params). Estable por carga de página.
 */
export function useDemoBusiness(): ResolvedBusiness {
  return getResolvedBusiness();
}
