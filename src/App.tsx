import { useCallback, useMemo, useState } from 'react';
import { CategoryNav } from './components/CategoryNav';
import { CurrencyBar } from './components/CurrencyBar';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ProductSheet } from './components/ProductSheet';
import { PreferencesProvider } from './context/PreferencesContext';
import { CATEGORIES, MENU_ITEMS } from './data/menu';
import type { MenuItem } from './data/types';

export default function App() {
  return (
    <PreferencesProvider>
      <Shell />
    </PreferencesProvider>
  );
}

function Shell() {
  const [selected, setSelected] = useState<MenuItem | null>(null);

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
      <ProductSheet item={selected} onClose={closeItem} />
    </div>
  );
}
