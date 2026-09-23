import { usePreferences } from '../context/PreferencesContext';
import type { Category, MenuItem } from '../data/types';
import { ProductCard } from './ProductCard';

interface Props {
  category: Category;
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
}

export function MenuSection({ category, items, onSelect }: Props) {
  const { lang } = usePreferences();

  return (
    <section className="section" id={category.id} aria-labelledby={`${category.id}-title`}>
      <header className="section-head">
        <h2 className="section-title" id={`${category.id}-title`}>
          {category.label[lang]}
        </h2>
      </header>
      {category.note && <p className="section-note">{category.note[lang]}</p>}
      <div className="section-grid">
        {items.map((item, index) => (
          <ProductCard key={item.id} item={item} index={index} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
