import { useEffect, useRef, useState } from 'react';
import { usePreferences, useT } from '../context/PreferencesContext';
import { CATEGORIES } from '../data/menu';
import { useScrollSpy } from '../hooks/useScrollSpy';

const IDS = CATEGORIES.map((c) => c.id);

export function CategoryNav() {
  const { lang } = usePreferences();
  const t = useT();
  const navRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(72);

  useEffect(() => {
    const measure = () => setOffset((navRef.current?.offsetHeight ?? 56) + 8);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const active = useScrollSpy(IDS, offset);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const chip = track.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (!chip) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    chip.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [active]);

  return (
    <nav className="cat-nav" ref={navRef} aria-label={t('categoriasAria')}>
      <div className="cat-nav-track" ref={trackRef}>
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            data-cat={cat.id}
            href={`#${cat.id}`}
            className={`cat-chip${active === cat.id ? ' is-active' : ''}`}
            aria-current={active === cat.id ? 'true' : undefined}
          >
            {cat.label[lang]}
          </a>
        ))}
      </div>
    </nav>
  );
}
