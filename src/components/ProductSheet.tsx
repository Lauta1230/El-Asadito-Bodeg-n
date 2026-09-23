import { useEffect, useRef } from 'react';
import { usePreferences, useT } from '../context/PreferencesContext';
import { supportsDoneness } from '../data/doneness';
import { CATEGORIES } from '../data/menu';
import type { DonenessId, MenuItem } from '../data/types';
import { formatPrice } from '../utils/format';
import { DonenessSelector } from './doneness/DonenessSelector';

interface Props {
  item: MenuItem | null;
  onClose: () => void;
  /** Punto de carne confirmado en la sesión para el producto abierto. */
  confirmedDoneness?: DonenessId;
  onConfirmDoneness?: (productId: string, level: DonenessId) => void;
}

/**
 * Bottom sheet premium con estética de "hoja de carta":
 * papel cálido y esquineros cobreados como la carta física.
 */
export function ProductSheet({
  item,
  onClose,
  confirmedDoneness,
  onConfirmDoneness,
}: Props) {
  const { lang, currency, rateType } = usePreferences();
  const t = useT();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const category = CATEGORIES.find((c) => c.id === item.category);

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-name"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" aria-hidden="true" />
        <p className="sheet-cat">{category?.label[lang]}</p>
        <h3 className="sheet-name" id="sheet-name">
          {item.name[lang]}
        </h3>
        {item.description && <p className="sheet-desc">{item.description[lang]}</p>}
        <div className="sheet-row">
          <span className="sheet-price-label">{t('precio')}</span>
          <span className="sheet-price">{formatPrice(item.priceARS, currency, rateType)}</span>
        </div>
        {supportsDoneness(item) && (
          <DonenessSelector
            confirmed={confirmedDoneness}
            onConfirm={(level) => onConfirmDoneness?.(item.id, level)}
          />
        )}
        <button ref={closeRef} type="button" className="sheet-close" onClick={onClose}>
          {t('cerrar')}
        </button>
      </div>
    </div>
  );
}
