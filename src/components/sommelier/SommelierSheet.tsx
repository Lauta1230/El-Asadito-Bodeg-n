import { useEffect, useRef, useState } from 'react';
import { usePreferences, useT } from '../../context/PreferencesContext';
import { getWineRecommendations } from '../../data/pairings';
import type { DonenessId, MenuItem } from '../../data/types';
import { getDonenessLevel } from '../../data/doneness';
import { WineGlassIcon } from './icons';
import { WineRecommendationCard } from './WineRecommendationCard';

interface Props {
  item: MenuItem;
  /** Punto de carne confirmado en la sesión, como contexto de la recomendación. */
  donenessLevel?: DonenessId;
  onClose: () => void;
  /** Cierra todo y lleva al ítem de la carta correspondiente al vino elegido. */
  onGoToMenu: (wineId: string) => void;
}

/**
 * Bottom sheet del sommelier digital, consistente con el ProductSheet
 * (papel cálido + esquineros cobreados). 1–2 recomendaciones reales.
 */
export function SommelierSheet({ item, donenessLevel, onClose, onGoToMenu }: Props) {
  const { lang } = usePreferences();
  const t = useT();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const recommendations = getWineRecommendations(item);
  const [selectedId, setSelectedId] = useState<string | null>(
    recommendations[0]?.id ?? null,
  );

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  if (recommendations.length === 0) return null;

  const selectedWine =
    recommendations.find((w) => w.id === selectedId) ?? recommendations[0];
  const doneness = donenessLevel ? getDonenessLevel(donenessLevel) : null;

  return (
    <div className="sheet-backdrop sommelier-backdrop" onClick={onClose}>
      <div
        className="sheet sommelier-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sommelier-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" aria-hidden="true" />
        <div className="sommelier-head">
          <WineGlassIcon className="sommelier-icon" />
          <h3 className="sommelier-title" id="sommelier-title">
            {t('pairingTitle')}
          </h3>
        </div>
        <p className="sommelier-context">
          {item.name[lang]}
          {doneness ? ` · ${t('punto')}: ${doneness.label[lang]}` : ''}
        </p>
        <div className="wine-list">
          {recommendations.map((wine) => (
            <WineRecommendationCard
              key={wine.id}
              wine={wine}
              selected={selectedWine.id === wine.id}
              onSelect={() => setSelectedId(wine.id)}
            />
          ))}
        </div>
        <button
          type="button"
          className="sheet-secondary"
          onClick={() => onGoToMenu(selectedWine.id)}
        >
          {t('seeOnMenu')}
        </button>
        <button ref={closeRef} type="button" className="sheet-close" onClick={onClose}>
          {t('cerrar')}
        </button>
      </div>
    </div>
  );
}
