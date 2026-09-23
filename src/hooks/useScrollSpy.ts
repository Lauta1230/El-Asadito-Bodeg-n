import { useEffect, useState } from 'react';

/**
 * Devuelve el id de la sección activa según el scroll.
 * `offset` = distancia desde el tope del viewport hasta la que una
 * sección se considera "activa" (típicamente la altura de la nav fija).
 */
export function useScrollSpy(ids: readonly string[], offset: number): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset + 12) current = id;
      }
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return active;
}
