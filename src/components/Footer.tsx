import { useT } from '../context/PreferencesContext';
import { useDemoBusiness } from '../hooks/useDemoConfig';

export function Footer() {
  const t = useT();
  const biz = useDemoBusiness();

  return (
    <>
      <div className="photo-band" aria-hidden="true" />
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-name">{biz.name}</p>
          {biz.address && <p className="footer-address">{biz.address}</p>}
          <p className="footer-links">
            {biz.instagramUrl && (
              <a href={biz.instagramUrl} target="_blank" rel="noreferrer">
                Instagram {biz.instagramHandle}
              </a>
            )}
            {biz.instagramUrl && biz.mapsUrl && <span aria-hidden="true">·</span>}
            {biz.mapsUrl && (
              <a href={biz.mapsUrl} target="_blank" rel="noreferrer">
                {t('comoLlegar')}
              </a>
            )}
            {!biz.instagramUrl && !biz.mapsUrl && (
              <span className="demo-note-inline">{t('demoNotConfigured')}</span>
            )}
          </p>
          <p className="footer-meta">{t('footerMeta')}</p>
        </div>
      </footer>
    </>
  );
}
