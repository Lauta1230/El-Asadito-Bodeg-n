import { useEffect, useState } from 'react';
import { usePreferences, useT } from '../../context/PreferencesContext';
import { DONENESS_LEVELS, getDonenessLevel } from '../../data/doneness';
import type { DonenessId } from '../../data/types';
import { DonenessOption } from './DonenessOption';

interface Props {
  /** Punto ya confirmado para este producto en la sesión (si existe). */
  confirmed: DonenessId | undefined;
  onConfirm: (level: DonenessId) => void;
}

/**
 * Selector visual de punto de la carne dentro del bottom sheet.
 * La selección pendiente es local; al confirmar se eleva al estado
 * de la aplicación (temporal, por producto, sin pedidos reales).
 */
export function DonenessSelector({ confirmed, onConfirm }: Props) {
  const { lang } = usePreferences();
  const t = useT();
  const [pending, setPending] = useState<DonenessId | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!feedback) return;
    const id = window.setTimeout(() => setFeedback(null), 2400);
    return () => window.clearTimeout(id);
  }, [feedback]);

  const current = pending ?? confirmed;
  const showCta = pending !== null && pending !== confirmed;

  const confirm = () => {
    if (pending === null) return;
    onConfirm(pending);
    const level = getDonenessLevel(pending);
    setFeedback(t('donenessConfirmed').replace('{level}', level.label[lang]));
  };

  return (
    <div className="doneness">
      <p className="doneness-title">{t('donenessQuestion')}</p>
      <div className="doneness-grid" role="group" aria-label={t('donenessQuestion')}>
        {DONENESS_LEVELS.map((level) => (
          <DonenessOption
            key={level.id}
            level={level}
            lang={lang}
            selected={current === level.id}
            onSelect={() => setPending(level.id)}
          />
        ))}
      </div>
      {showCta && (
        <button type="button" className="doneness-confirm" onClick={confirm}>
          {t('confirmDoneness')}
        </button>
      )}
      <p className="doneness-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </div>
  );
}
