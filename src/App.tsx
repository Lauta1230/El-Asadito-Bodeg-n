import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryNav } from './components/CategoryNav';
import { CurrencyBar } from './components/CurrencyBar';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ProductSheet } from './components/ProductSheet';
import { SommelierSheet } from './components/sommelier/SommelierSheet';
import { PreferencesProvider } from './context/PreferencesContext';
import { CATEGORIES, MENU_ITEMS } from './data/menu';
import type { DonenessId, MenuItem } from './data/types';

export default function App() {
  return (
    <PreferencesProvider>
      <Shell />
    </PreferencesProvider>
  );
}

function Shell() {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  /** Punto de carne confirmado por producto (temporal, solo sesión). */
  const [doneness, setDoneness] = useState<Record<string, DonenessId>>({});
  /** Producto para el que está abierto el sommelier (sheet apilado). */
  const [sommelierFor, setSommelierFor] = useState<MenuItem | null>(null);

  const confirmDoneness = useCallback((productId: string, level: DonenessId) => {
    setDoneness((prev) => ({ ...prev, [productId]: level }));
  }, []);

  const openSommelier = useCallback((item: MenuItem) => setSommelierFor(item), []);
  const closeSommelier = useCallback(() => setSommelierFor(null), []);

  /* Scroll-lock mientras haya algún sheet abierto. */
  useEffect(() => {
    document.body.style.overflow = selected || sommelierFor ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected, sommelierFor]);

  /* ESC apilado: primero cierra el sommelier, luego el detalle. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (sommelierFor) setSommelierFor(null);
      else if (selected) setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sommelierFor, selected]);

  /* "Ver en carta": cierra todo y resalta el ítem de bebida correspondiente. */
  const goToMenu = useCallback((wineId: string) => {
    setSommelierFor(null);
    setSelected(null);
    window.setTimeout(() => {
      const el = document.querySelector<HTMLElement>(`[data-product-id="${wineId}"]`);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('is-highlight');
      window.setTimeout(() => el.classList.remove('is-highlight'), 1800);
    }, 90);
  }, []);

  const itemsByCategory = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const cat of CATEGORIES) {
      map.set(
        cat.id,
        MENU_ITEMS.filter((item) => item.category === cat.id),
      );
    }
    return map;
  }, []);

  const openItem = useCallback((item: MenuItem) => setSelected(item), []);
  const closeItem = useCallback(() => setSelected(null), []);

  return (
    <div className="app">
      <Header />
      <Hero />
      <CurrencyBar />
      <CategoryNav />
      <main className="menu container" id="carta">
        {CATEGORIES.map((cat) => (
          <MenuSection
            key={cat.id}
            category={cat}
            items={itemsByCategory.get(cat.id) ?? []}
            onSelect={openItem}
          />
        ))}
      </main>
      <Footer />
      <ProductSheet
        item={selected}
        onClose={closeItem}
        confirmedDoneness={selected ? doneness[selected.id] : undefined}
        onConfirmDoneness={confirmDoneness}
        onOpenSommelier={openSommelier}
      />
      {sommelierFor && (
        <SommelierSheet
          item={sommelierFor}
          donenessLevel={doneness[sommelierFor.id]}
          onClose={closeSommelier}
          onGoToMenu={goToMenu}
        />
      )}
    </div>
  );
}
