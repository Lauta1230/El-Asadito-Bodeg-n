import { usePreferences, useT } from '../context/PreferencesContext';
import type { MenuItem } from '../data/types';
import { useReveal } from '../hooks/useReveal';
import { formatPrice } from '../utils/format';

interface Props {
  item: MenuItem;
  index: number;
  onSelect: (item: MenuItem) => void;
}

export function ProductCard({ item, index, onSelect }: Props) {
  const { lang, currency, rateType } = usePreferences();
  const t = useT();
  const ref = useReveal<HTMLButtonElement>();
  const delay = Math.min(index % 6, 5) * 45;

  return (
    <button
      ref={ref}
      type="button"
      className="card reveal"
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onSelect(item)}
      aria-haspopup="dialog"
    >
      <span className="card-top">
        <h3 className="card-name">{item.name[lang]}</h3>
        <span className="card-price">{formatPrice(item.priceARS, currency, rateType)}</span>
      </span>
      {item.description && <p className="card-desc">{item.description[lang]}</p>}
      <span className="card-more" aria-hidden="true">
        {t('verDetalle')}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
