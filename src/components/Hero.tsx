import { useT } from '../context/PreferencesContext';
import { useDemoBusiness } from '../hooks/useDemoConfig';
import { LogoImage } from './LogoImage';

export function Hero() {
  const t = useT();
  const biz = useDemoBusiness();

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-kicker">Mendoza · Argentina</p>
        <LogoImage src={biz.logoUrl} alt={biz.name} className="hero-logo" />
        <h1 className="hero-title">{biz.heroTitle}</h1>
        {biz.heroSub && <p className="hero-sub">{biz.heroSub}</p>}
        <div className="hero-rule" aria-hidden="true" />
        {biz.address && <p className="hero-address">{biz.address}</p>}
        <a className="btn-primary" href="#entradas">
          {t('verCarta')}
        </a>
      </div>
    </section>
  );
}
