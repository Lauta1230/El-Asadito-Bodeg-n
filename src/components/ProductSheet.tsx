import { useEffect, useRef } from 'react';
import { usePreferences, useT } from '../context/PreferencesContext';
import { supportsDoneness } from '../data/doneness';
import { hasWinePairing } from '../data/pairings';
import { CATEGORIES } from '../data/menu';
import type { DonenessId, MenuItem } from '../data/types';
import { formatPrice } from '../utils/format';
import { DonenessSelector } from './doneness/DonenessSelector';
import { WineGlassIcon } from './sommelier/icons';

interface Props {
  item: MenuItem | null;
  onClose: () => void;
  /** Punto de carne confirmado en la sesión para el producto abierto. */
  confirmedDoneness?: DonenessId;
  onConfirmDoneness?: (productId: string, level: DonenessId) => void;
  onOpenSommelier?: (item: MenuItem) => void;
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
  onOpenSommelier,
}: Props) {
  const { lang, currency, rateType } = usePreferences();
  const t = useT();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  /* El ESC apilado y el scroll-lock los maneja el Shell (Fase 4). */
  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus({ preventScroll: true });
  }, [item]);

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
        {hasWinePairing(item) && (
          <button
            type="button"
            className="wine-cta"
            onClick={() => onOpenSommelier?.(item)}
          >
            <WineGlassIcon className="wine-cta-icon" />
            {t('seeWine')}
          </button>
        )}
        <button ref={closeRef} type="button" className="sheet-close" onClick={onClose}>
          {t('cerrar')}
        </button>
      </div>
    </div>
  );
}
