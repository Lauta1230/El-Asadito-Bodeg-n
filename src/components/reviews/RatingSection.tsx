import { useState } from 'react';
import { useT } from '../../context/PreferencesContext';
import { useDemoBusiness } from '../../hooks/useDemoConfig';
import { getRatingBand } from '../../utils/reviews';
import { PrivateFeedbackForm } from './PrivateFeedbackForm';
import { RatingStars } from './RatingStars';

/**
 * "¿Cómo fue tu experiencia?" — bloque final antes del footer.
 * 5★ → Google · 3–4★ → Google o sugerencia privada · 1–2★ → formulario
 * privado. Nunca se oculta ni desalienta una reseña negativa.
 */
export function RatingSection() {
  const t = useT();
  const biz = useDemoBusiness();
  const [rating, setRating] = useState(0);
  const [showMidForm, setShowMidForm] = useState(false);

  const select = (n: number) => {
    setRating(n);
    setShowMidForm(false);
  };

  const band = rating > 0 ? getRatingBand(rating) : null;

  return (
    <section className="review-block container" aria-labelledby="review-title">
      <div className="review-card">
        <h2 className="review-title" id="review-title">
          {t('reviewTitle')}
        </h2>
        <p className="review-subtitle">{t('reviewSubtitle')}</p>
        <RatingStars value={rating} onSelect={select} />

        {band === 'high' && (
          <div className="review-state">
            <p className="review-msg">{t('rating5')}</p>
            <a
              className="btn-primary review-google"
              href={biz.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('reviewGoogle')}
            </a>
          </div>
        )}

        {band === 'mid' && (
          <div className="review-state">
            <p className="review-msg">{t('ratingMid')}</p>
            <div className="review-actions">
              <a
                className="btn-primary review-google"
                href={biz.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('reviewGoogle')}
              </a>
              <button
                type="button"
                className="sheet-secondary review-private-toggle"
                onClick={() => setShowMidForm((v) => !v)}
                aria-expanded={showMidForm}
              >
                {t('reviewPrivateSuggestion')}
              </button>
            </div>
            {showMidForm && <PrivateFeedbackForm key={`mid-${rating}`} rating={rating} />}
          </div>
        )}

        {band === 'low' && (
          <div className="review-state">
            <p className="review-msg">{t('ratingLow')}</p>
            <PrivateFeedbackForm key={`low-${rating}`} rating={rating} />
          </div>
        )}
      </div>
    </section>
  );
}
