import { useT } from '../context/PreferencesContext';
import { RESTAURANT } from '../data/menu';
import { LanguageSelector } from './LanguageSelector';

export function Header() {
  const t = useT();

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="header-lockup" href="#top" aria-label="El Asadito Bodegón">
          <span className="header-name">El Asadito</span>
          <span className="header-sub">Bodegón</span>
        </a>
        <nav className="header-actions" aria-label="El Asadito Bodegón">
          <LanguageSelector />
          <a
            href={RESTAURANT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagram ${RESTAURANT.instagramHandle}`}
            title={`Instagram ${RESTAURANT.instagramHandle}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href={RESTAURANT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={t('comoLlegar')}
            title={t('comoLlegar')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.6" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
