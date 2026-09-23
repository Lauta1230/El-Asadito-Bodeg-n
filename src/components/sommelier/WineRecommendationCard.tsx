import { usePreferences, useT } from '../../context/PreferencesContext';
import { MENU_ITEMS } from '../../data/menu';
import type { MenuItem } from '../../data/types';
import type { WineInfo } from '../../data/wine';
import { formatPrice } from '../../utils/format';
import { WineBottleIcon } from './icons';

interface Props {
  wine: WineInfo;
  selected: boolean;
  onSelect: () => void;
}

/** Card de recomendación: nombre y precio vienen de la carta real. */
export function WineRecommendationCard({ wine, selected, onSelect }: Props) {
  const { lang, currency, rateType } = usePreferences();
  const t = useT();
  const wineItem: MenuItem | undefined = MENU_ITEMS.find((m) => m.id === wine.id);
  if (!wineItem) return null;

  return (
    <button
      type="button"
      className={`wine-card${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {selected && (
        <span className="wine-check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <span className="wine-card-top">
        <WineBottleIcon className="wine-bottle" />
        <span className="wine-name">{wineItem.name[lang]}</span>
      </span>
      <span className="wine-note-label">{t('sommelierNote')}</span>
      <span className="wine-note">{wine.note[lang]}</span>
      <span className="wine-ideal">
        <strong>{t('idealFor')}:</strong> {wine.idealFor[lang]}
      </span>
      <span className="wine-price">{formatPrice(wineItem.priceARS, currency, rateType)}</span>
    </button>
  );
}
