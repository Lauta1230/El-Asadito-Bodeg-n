import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { UI_STRINGS, type UiKey } from '../data/translations';
import type { CurrencyCode, Language, RateType } from '../data/types';

/**
 * Preferencias de idioma, moneda y tipo de cambio.
 * Defaults de Fase 1: español + ARS + oficial.
 * La preferencia de idioma (y de moneda/cambio) persiste en localStorage.
 */

interface Preferences {
  lang: Language;
  setLang: (lang: Language) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  rateType: RateType;
  setRateType: (rateType: RateType) => void;
}

const PreferencesContext = createContext<Preferences | null>(null);

const STORAGE_KEYS = {
  lang: 'eab:lang',
  currency: 'eab:currency',
  rate: 'eab:rate',
} as const;

const LANGS: readonly Language[] = ['es', 'pt', 'en'];
const CURRENCIES: readonly CurrencyCode[] = ['ARS', 'USD', 'BRL'];
const RATES: readonly RateType[] = ['oficial', 'blue'];

function readStored<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T,
): T {
  try {
    const stored = window.localStorage.getItem(key);
    return stored && (allowed as readonly string[]).includes(stored)
      ? (stored as T)
      : fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() =>
    readStored(STORAGE_KEYS.lang, LANGS, 'es'),
  );
  const [currency, setCurrency] = useState<CurrencyCode>(() =>
    readStored(STORAGE_KEYS.currency, CURRENCIES, 'ARS'),
  );
  const [rateType, setRateType] = useState<RateType>(() =>
    readStored(STORAGE_KEYS.rate, RATES, 'oficial'),
  );

  useEffect(() => writeStored(STORAGE_KEYS.lang, lang), [lang]);
  useEffect(() => writeStored(STORAGE_KEYS.currency, currency), [currency]);
  useEffect(() => writeStored(STORAGE_KEYS.rate, rateType), [rateType]);

  const value = useMemo<Preferences>(
    () => ({ lang, setLang, currency, setCurrency, rateType, setRateType }),
    [lang, currency, rateType],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): Preferences {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences debe usarse dentro de <PreferencesProvider>');
  return ctx;
}

/** Traductor de strings de interfaz: t('verCarta') → texto en el idioma activo. */
export function useT() {
  const { lang } = usePreferences();
  return useMemo(() => (key: UiKey) => UI_STRINGS[key][lang], [lang]);
}
