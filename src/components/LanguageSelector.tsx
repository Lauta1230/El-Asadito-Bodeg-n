import { useEffect, useRef, useState } from 'react';
import { usePreferences, useT } from '../context/PreferencesContext';
import type { Language } from '../data/types';

const LANGUAGES: { code: Language; flag: string; native: string }[] = [
  { code: 'es', flag: '🇦🇷', native: 'Español' },
  { code: 'pt', flag: '🇧🇷', native: 'Português' },
  { code: 'en', flag: '🇺🇸', native: 'English' },
];

/** Selector de idioma compacto (esquina superior derecha del header). */
export function LanguageSelector() {
  const { lang, setLang } = usePreferences();
  const t = useT();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div className="lang-select" ref={rootRef}>
      <button
        type="button"
        className="lang-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('idioma')}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-flag" aria-hidden="true">
          {current.flag}
        </span>
        <span className="lang-code">{current.code.toUpperCase()}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="lang-menu" role="menu" aria-label={t('idioma')}>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="menuitem"
              className={`lang-option${l.code === lang ? ' is-active' : ''}`}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              <span aria-hidden="true">{l.flag}</span>
              <span className="lang-native">{l.native}</span>
              {l.code === lang && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
