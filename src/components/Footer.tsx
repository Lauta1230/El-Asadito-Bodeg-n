import { useT } from '../context/PreferencesContext';
import { useDemoBusiness } from '../hooks/useDemoConfig';
import { RESTAURANT } from '../data/menu';

export function Footer() {
  const t = useT();
  const biz = useDemoBusiness();

  return (
    <>
      <div className="photo-band" aria-hidden="true" />
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-name">{biz.name}</p>
          <p className="footer-address">{RESTAURANT.address}</p>
          <p className="footer-links">
            <a href={biz.instagramUrl} target="_blank" rel="noreferrer">
              Instagram {biz.instagramHandle}
            </a>
            <span aria-hidden="true">·</span>
            <a href={biz.mapsUrl} target="_blank" rel="noreferrer">
              {t('comoLlegar')}
            </a>
          </p>
          <p className="footer-meta">{t('footerMeta')}</p>
        </div>
      </footer>
    </>
  );
}
