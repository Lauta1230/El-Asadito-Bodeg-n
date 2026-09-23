import { useId } from 'react';
import type { DonenessId } from '../../data/types';

/**
 * Representación SVG local del interior del corte según el punto:
 * rojo (jugoso), rosado (a punto), marrón/grisáceo (bien cocido).
 * Sin URLs externas ni emojis.
 */

const INTERIOR: Record<DonenessId, [from: string, to: string]> = {
  jugoso: ['#e05540', '#a92a1e'],
  'a-punto': ['#e8a792', '#cd7d69'],
  'bien-cocido': ['#a8886e', '#84685a'],
};

export function DonenessIllustration({ level }: { level: DonenessId }) {
  const uid = useId();
  const [from, to] = INTERIOR[level];

  return (
    <svg className="doneness-art" viewBox="0 0 72 52" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-crust`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f4526" />
          <stop offset="1" stopColor="#331d0e" />
        </linearGradient>
        <linearGradient id={`${uid}-interior`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>

      {/* corte: costra exterior */}
      <rect x="4" y="5" width="64" height="42" rx="15" fill={`url(#${uid}-crust)`} />
      {/* marcas de parrilla */}
      <path
        d="M16 9.5 h9 M31 9.5 h9 M46 9.5 h9"
        stroke="#241206"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* interior según punto */}
      <rect x="9.5" y="14" width="53" height="28" rx="10" fill={`url(#${uid}-interior)`} />
      {/* brillo sutil */}
      <ellipse cx="26" cy="22" rx="10" ry="4" fill="#ffffff" opacity="0.16" />
    </svg>
  );
}
