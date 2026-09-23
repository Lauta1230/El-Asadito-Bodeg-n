/**
 * Validación de Fase 2 (corre con `npm run check`):
 * integridad de la carta (46 productos / 7 categorías), completitud
 * i18n ES/PT/EN y formatos de precio ARS/USD/BRL por Oficial/Blue.
 */
import { CATEGORIES, MENU_ITEMS } from '../src/data/menu';
import { UI_STRINGS } from '../src/data/translations';
import type { Language } from '../src/data/types';
import { formatPrice } from '../src/utils/format';

const LANGS: Language[] = ['es', 'pt', 'en'];
const errors: string[] = [];

if (MENU_ITEMS.length !== 46) errors.push(`productos=${MENU_ITEMS.length} (esperado 46)`);
if (CATEGORIES.length !== 7) errors.push(`categorías=${CATEGORIES.length} (esperado 7)`);

const expectedPerCategory: Record<string, number> = {
  entradas: 11,
  'para-compartir': 6,
  principales: 5,
  'platos-de-invierno': 5,
  pastas: 6,
  postres: 5,
  bebidas: 8,
};
for (const [cat, n] of Object.entries(expectedPerCategory)) {
  const got = MENU_ITEMS.filter((i) => i.category === cat).length;
  if (got !== n) errors.push(`${cat}=${got} (esperado ${n})`);
}

for (const item of MENU_ITEMS) {
  for (const lang of LANGS) {
    if (!item.name[lang]?.trim()) errors.push(`${item.id}: name[${lang}] vacío`);
    if (item.description && !item.description[lang]?.trim()) {
      errors.push(`${item.id}: description[${lang}] vacío`);
    }
  }
}

for (const cat of CATEGORIES) {
  for (const lang of LANGS) {
    if (!cat.label[lang]?.trim()) errors.push(`${cat.id}: label[${lang}] vacío`);
    if (cat.note && !cat.note[lang]?.trim()) errors.push(`${cat.id}: note[${lang}] vacío`);
  }
}

for (const [key, texts] of Object.entries(UI_STRINGS)) {
  for (const lang of LANGS) {
    if (!texts[lang]?.trim()) errors.push(`UI ${key}[${lang}] vacío`);
  }
}

const sample = MENU_ITEMS[0];
console.log(`ES + ARS        : ${sample.name.es} -> ${formatPrice(sample.priceARS, 'ARS', 'oficial')}`);
console.log(`EN + USD (blue) : ${sample.name.en} -> ${formatPrice(sample.priceARS, 'USD', 'blue')}`);
console.log(`PT + BRL (ofic.): ${sample.name.pt} -> ${formatPrice(sample.priceARS, 'BRL', 'oficial')}`);

const ars = formatPrice(12500, 'ARS', 'blue');
if (ars !== '$ 12.500') errors.push(`ARS esperaba "$ 12.500" y dio "${ars}"`);
const usd = formatPrice(16000, 'USD', 'oficial');
if (usd !== 'U$S 10,42') errors.push(`USD esperaba "U$S 10,42" y dio "${usd}"`);
const brl = formatPrice(16800, 'BRL', 'blue');
if (brl !== 'R$ 56,76') errors.push(`BRL esperaba "R$ 56,76" y dio "${brl}"`);

if (errors.length > 0) {
  console.error('FAIL:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}
console.log('OK: 46 productos, 7 categorías, i18n ES/PT/EN completo, formatos ARS/USD/BRL correctos.');
