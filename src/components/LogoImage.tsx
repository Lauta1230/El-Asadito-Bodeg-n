import { useState } from 'react';

interface Props {
  src: string | null;
  alt: string;
  className: string;
}

/** Logo remoto opcional con fallback silencioso si la imagen falla. */
export function LogoImage({ src, alt, className }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
