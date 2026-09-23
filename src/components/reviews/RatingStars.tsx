import { usePreferences, useT } from '../../context/PreferencesContext';
import type { Language } from '../../data/types';

interface Props {
  value: number;
  onSelect: (rating: number) => void;
}

function starLabel(lang: Language, n: number): string {
  if (lang === 'es') return n === 1 ? '1 estrella' : `${n} estrellas`;
  if (lang === 'pt') return n === 1 ? '1 estrela' : `${n} estrelas`;
  return n === 1 ? '1 star' : `${n} stars`;
}

/** Cinco estrellas táctiles, botones reales, accesibles por teclado. */
export function RatingStars({ value, onSelect }: Props) {
  const { lang } = usePreferences();
  const t = useT();

  return (
    <div className="stars" role="group" aria-label={t('starsAria')}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`star${n <= value ? ' is-active' : ''}`}
          aria-label={starLabel(lang, n)}
          aria-pressed={value === n}
          onClick={() => onSelect(n)}
        >
          <svg
            viewBox="0 0 24 24"
            fill={n <= value ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path
              d="M12 2.8l2.9 5.9 6.5.9-4.7 4.5 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.6l6.5-.9z"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
      <span className="stars-value" aria-hidden="true">
        {value > 0 ? `${value}/5` : ''}
      </span>
    </div>
  );
}
