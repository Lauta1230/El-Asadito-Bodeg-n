import type { Language } from '../../data/types';
import type { DonenessLevel } from '../../data/doneness';
import { DonenessIllustration } from './DonenessIllustration';

interface Props {
  level: DonenessLevel;
  lang: Language;
  selected: boolean;
  onSelect: () => void;
}

/** Card táctil y accesible de un punto de cocción. */
export function DonenessOption({ level, lang, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`doneness-option${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      aria-label={`${level.label[lang]}. ${level.description[lang]}`}
      onClick={onSelect}
    >
      {selected && (
        <span className="doneness-check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <DonenessIllustration level={level.id} />
      <span className="doneness-name">{level.label[lang]}</span>
      <span className="doneness-desc">{level.description[lang]}</span>
    </button>
  );
}
