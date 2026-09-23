import { useT } from '../context/PreferencesContext';
import { RESTAURANT } from '../data/menu';

export function Hero() {
  const t = useT();

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-kicker">Mendoza · Argentina</p>
        <h1 className="hero-title">El Asadito</h1>
        <p className="hero-sub">Bodegón</p>
        <div className="hero-rule" aria-hidden="true" />
        <p className="hero-address">{RESTAURANT.address}</p>
        <a className="btn-primary" href="#entradas">
          {t('verCarta')}
        </a>
      </div>
    </section>
  );
}
