import { useT } from '../context/PreferencesContext';
import { useDemoBusiness } from '../hooks/useDemoConfig';
import { LanguageSelector } from './LanguageSelector';
import { LogoImage } from './LogoImage';

export function Header() {
  const t = useT();
  const biz = useDemoBusiness();

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="header-lockup" href="#top" aria-label={biz.name}>
          <LogoImage src={biz.logoUrl} alt="" className="header-logo" />
          <span className="header-name">{biz.heroTitle}</span>
          {biz.heroSub && <span className="header-sub">{biz.heroSub}</span>}
        </a>
        {biz.mesa && (
          <span className="mesa-chip">
            {t('mesa')} {biz.mesa}
          </span>
        )}
        <nav className="header-actions" aria-label={biz.name}>
          <LanguageSelector />
          <a
            href={biz.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagram ${biz.instagramHandle}`}
            title={`Instagram ${biz.instagramHandle}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href={biz.mapsUrl}
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
