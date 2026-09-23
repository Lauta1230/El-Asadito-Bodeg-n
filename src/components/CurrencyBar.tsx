import { usePreferences, useT } from '../context/PreferencesContext';
import type { CurrencyCode, RateType } from '../data/types';

const CURRENCY_OPTIONS: { code: CurrencyCode; symbol: string }[] = [
  { code: 'ARS', symbol: '$' },
  { code: 'BRL', symbol: 'R$' },
  { code: 'USD', symbol: 'U$S' },
];

const RATE_OPTIONS: RateType[] = ['oficial', 'blue'];

/**
 * Conversor de divisas: moneda de visualización + tipo de cambio.
 * El precio base permanece en ARS; esto solo cambia el render.
 */
export function CurrencyBar() {
  const { currency, setCurrency, rateType, setRateType } = usePreferences();
  const t = useT();
  const arsMode = currency === 'ARS';

  return (
    <div className="currency-bar container">
      <div className="seg" role="group" aria-label={t('moneda')}>
        {CURRENCY_OPTIONS.map((opt) => (
          <button
            key={opt.code}
            type="button"
            className={`seg-btn${currency === opt.code ? ' is-active' : ''}`}
            aria-pressed={currency === opt.code}
            onClick={() => setCurrency(opt.code)}
          >
            <span className="seg-symbol" aria-hidden="true">
              {opt.symbol}
            </span>
            {opt.code}
          </button>
        ))}
      </div>

      <div
        className={`seg-group${arsMode ? ' is-disabled' : ''}`}
        role="group"
        aria-label={t('cambio')}
      >
        <span className="seg-label">{t('cambio')}</span>
        <div className="seg">
          {RATE_OPTIONS.map((rate) => (
            <button
              key={rate}
              type="button"
              className={`seg-btn${rateType === rate ? ' is-active' : ''}`}
              aria-pressed={rateType === rate}
              disabled={arsMode}
              onClick={() => setRateType(rate)}
            >
              {t(rate)}
            </button>
          ))}
        </div>
      </div>

      <span className="currency-note">{t('valoresReferencia')}</span>
    </div>
  );
}
