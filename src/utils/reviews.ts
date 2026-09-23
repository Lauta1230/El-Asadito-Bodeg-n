import type { Language } from '../data/types';

/** Helpers del módulo de reseñas, separados de la UI. */

export type RatingBand = 'low' | 'mid' | 'high';

export function getRatingBand(rating: number): RatingBand {
  if (rating >= 5) return 'high';
  if (rating >= 3) return 'mid';
  return 'low';
}

/**
 * Construye la URL de WhatsApp con el mensaje escapado.
 * Si no hay teléfono configurado devuelve null (nunca una URL inválida).
 */
export function buildWhatsAppUrl(phone: string | null, message: string): string | null {
  if (!phone || !phone.trim()) return null;
  return `https://wa.me/${phone.trim()}?text=${encodeURIComponent(message)}`;
}

interface MessageTemplates {
  introWithName: (name: string, restaurant: string) => string;
  intro: (restaurant: string) => string;
  rating: (n: number) => string;
  commentLabel: string;
}

const MESSAGE_TEMPLATES: Record<Language, MessageTemplates> = {
  es: {
    introWithName: (name, rest) =>
      `Hola, soy ${name}. Quería dejar un comentario privado sobre mi experiencia en ${rest}.`,
    intro: (rest) => `Hola. Quería dejar un comentario privado sobre mi experiencia en ${rest}.`,
    rating: (n) => `Valoración: ${n}/5`,
    commentLabel: 'Comentario:',
  },
  pt: {
    introWithName: (name, rest) =>
      `Olá, sou ${name}. Queria deixar um comentário privado sobre minha experiência no ${rest}.`,
    intro: (rest) => `Olá. Queria deixar um comentário privado sobre minha experiência no ${rest}.`,
    rating: (n) => `Avaliação: ${n}/5`,
    commentLabel: 'Comentário:',
  },
  en: {
    introWithName: (name, rest) =>
      `Hi, I'm ${name}. I'd like to leave a private comment about my experience at ${rest}.`,
    intro: (rest) => `Hi. I'd like to leave a private comment about my experience at ${rest}.`,
    rating: (n) => `Rating: ${n}/5`,
    commentLabel: 'Comment:',
  },
};

export interface FeedbackInput {
  lang: Language;
  restaurantName: string;
  rating: number;
  name?: string;
  comment: string;
}

/** Mensaje de texto plano (sin HTML) con datos dinámicos de la valoración. */
export function composeFeedbackMessage(input: FeedbackInput): string {
  const t = MESSAGE_TEMPLATES[input.lang];
  const name = input.name?.trim();
  const intro = name
    ? t.introWithName(name, input.restaurantName)
    : t.intro(input.restaurantName);
  return `${intro}\n\n${t.rating(input.rating)}\n\n${t.commentLabel}\n${input.comment.trim()}`;
}
