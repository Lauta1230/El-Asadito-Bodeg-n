/** Iconografía local del módulo sommelier (sin URLs externas). */

export function WineGlassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 3h10c0 5-1.6 8.4-5 8.4S7 8 7 3Z" strokeLinejoin="round" />
      <path d="M7.4 6.5h9.2" strokeLinecap="round" />
      <path d="M12 11.4V20" strokeLinecap="round" />
      <path d="M8.5 21h7" strokeLinecap="round" />
    </svg>
  );
}

export function WineBottleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10.4 2.5h3.2v4.2c0 1.6 2.4 2.5 2.4 5v8a1.8 1.8 0 0 1-1.8 1.8H9.8A1.8 1.8 0 0 1 8 19.7v-8c0-2.5 2.4-3.4 2.4-5V2.5Z"
        strokeLinejoin="round"
      />
      <path d="M8 13.5h8" strokeLinecap="round" />
    </svg>
  );
}
