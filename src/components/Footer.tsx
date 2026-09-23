import { useT } from '../context/PreferencesContext';
import { RESTAURANT } from '../data/menu';

export function Footer() {
  const t = useT();

  return (
    <>
      <div className="photo-band" aria-hidden="true" />
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-name">El Asadito · Bodegón</p>
          <p className="footer-address">{RESTAURANT.address}</p>
          <p className="footer-links">
            <a href={RESTAURANT.instagramUrl} target="_blank" rel="noreferrer">
              Instagram {RESTAURANT.instagramHandle}
            </a>
            <span aria-hidden="true">·</span>
            <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer">
              {t('comoLlegar')}
            </a>
          </p>
          <p className="footer-meta">{t('footerMeta')}</p>
        </div>
      </footer>
    </>
  );
}
