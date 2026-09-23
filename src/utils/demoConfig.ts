import { businessConfig, businessContact } from '../data/business';
import { RESTAURANT } from '../data/menu';

/**
 * DEMO MAESTRA (Fase 6): parsing centralizado de query params.
 * Los componentes NUNCA leen URLSearchParams por su cuenta:
 * consumen `useDemoBusiness()` (única fuente de verdad).
 *
 * Params soportados: local, mesa, wa, maps, logo.
 * Todo valor entrante se trata como no confiable y se valida.
 */

export interface DemoConfig {
  local: string | null;
  mesa: string | null;
  whatsappOverride: string | null;
  mapsOverride: string | null;
  logo: string | null;
}

export interface ResolvedBusiness {
  /** Nombre completo (título de documento, footer, mensajes). */
  name: string;
  /** Lockup del hero: título y subtítulo. */
  heroTitle: string;
  heroSub?: string;
  /** true si no hay ?local= (experiencia default de El Asadito). */
  isDefault: boolean;
  mesa: string | null;
  whatsapp: string | null;
  mapsUrl: string;
  logoUrl: string | null;
  instagramUrl: string;
  instagramHandle: string;
}

const LOGO_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];

/** Texto visible: sin caracteres de control, espacios colapsados, acotado. */
function cleanText(value: string | null, max: number): string | null {
  if (!value) return null;
  const cleaned = value
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
  return cleaned.length > 0 ? cleaned : null;
}

/** WhatsApp: solo dígitos internacionales, 8–15 caracteres. */
function cleanPhone(value: string | null): string | null {
  if (!value) return null;
  const digits = value.trim();
  return /^[0-9]{8,15}$/.test(digits) ? digits : null;
}

/** URL externa segura: https, longitud acotada. */
function cleanHttpsUrl(value: string | null, max = 500): string | null {
  if (!value) return null;
  const raw = value.trim();
  if (raw.length === 0 || raw.length > max) return null;
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

/** Logo: https + extensión soportada cuando viene declarada. */
function cleanLogoUrl(value: string | null): string | null {
  const href = cleanHttpsUrl(value);
  if (!href) return null;
  try {
    const { pathname } = new URL(href);
    const dot = pathname.lastIndexOf('.');
    const ext = dot >= 0 ? pathname.slice(dot).toLowerCase() : '';
    if (ext && !LOGO_EXTENSIONS.includes(ext)) return null;
    return href;
  } catch {
    return null;
  }
}

/** Parsing puro y seguro (testeable sin navegador). */
export function parseDemoConfig(search: string): DemoConfig {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    params = new URLSearchParams();
  }
  return {
    local: cleanText(params.get('local'), 60),
    mesa: cleanText(params.get('mesa'), 10),
    whatsappOverride: cleanPhone(params.get('wa')),
    mapsOverride: cleanHttpsUrl(params.get('maps')),
    logo: cleanLogoUrl(params.get('logo')),
  };
}

let cachedConfig: DemoConfig | null = null;

export function getDemoConfig(): DemoConfig {
  if (cachedConfig) return cachedConfig;
  const search = typeof window !== 'undefined' ? window.location.search : '';
  cachedConfig = parseDemoConfig(search);
  return cachedConfig;
}

/** Resuelve defaults de El Asadito + overrides válidos de la URL. */
export function resolveBusiness(cfg: DemoConfig): ResolvedBusiness {
  return {
    name: cfg.local ?? businessConfig.name,
    heroTitle: cfg.local ?? RESTAURANT.name,
    heroSub: cfg.local ? undefined : RESTAURANT.sub,
    isDefault: cfg.local === null,
    mesa: cfg.mesa,
    whatsapp: cfg.whatsappOverride ?? businessContact.whatsapp,
    mapsUrl: cfg.mapsOverride ?? businessConfig.mapsUrl,
    logoUrl: cfg.logo,
    instagramUrl: RESTAURANT.instagramUrl,
    instagramHandle: RESTAURANT.instagramHandle,
  };
}

let cachedBusiness: ResolvedBusiness | null = null;

export function getResolvedBusiness(): ResolvedBusiness {
  if (!cachedBusiness) cachedBusiness = resolveBusiness(getDemoConfig());
  return cachedBusiness;
}
