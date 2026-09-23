import { useState, type FormEvent } from 'react';
import { usePreferences, useT } from '../../context/PreferencesContext';
import { useDemoBusiness } from '../../hooks/useDemoConfig';
import { buildWhatsAppUrl, composeFeedbackMessage } from '../../utils/reviews';

interface Props {
  rating: number;
}

/**
 * Formulario privado (nombre opcional + comentario obligatorio).
 * Nunca almacena el comentario; solo abre WhatsApp con el mensaje
 * compuesto cuando el usuario lo envía y existe teléfono configurado.
 */
export function PrivateFeedbackForm({ rating }: Props) {
  const { lang } = usePreferences();
  const t = useT();
  const biz = useDemoBusiness();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const phone = biz.whatsapp;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError(t('commentRequired'));
      return;
    }
    setError(null);
    const message = composeFeedbackMessage({
      lang,
      restaurantName: biz.name,
      rating,
      name,
      comment,
    });
    const url = buildWhatsAppUrl(phone, message);
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <form className="feedback-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="fb-name">{t('nameLabel')}</label>
        <input
          id="fb-name"
          type="text"
          value={name}
          maxLength={80}
          autoComplete="name"
          placeholder={t('namePlaceholder')}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="fb-comment">{t('commentLabel')}</label>
        <textarea
          id="fb-comment"
          rows={4}
          maxLength={600}
          placeholder={t('commentPlaceholder')}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <button type="submit" className="sheet-close feedback-send" disabled={!phone}>
        {t('sendPrivate')}
      </button>
      {!phone && (
        <p className="form-internal">
          {biz.isCustomDemo ? t('demoNotConfigured') : t('whatsappPending')}
        </p>
      )}
      <p className="form-status" role="status" aria-live="polite">
        {sent ? t('feedbackReady') : ''}
      </p>
    </form>
  );
}
