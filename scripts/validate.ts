/**
 * Validación de Fase 2 (corre con `npm run check`):
 * integridad de la carta (46 productos / 7 categorías), completitud
 * i18n ES/PT/EN y formatos de precio ARS/USD/BRL por Oficial/Blue.
 */
import { DONENESS_LEVELS, supportsDoneness } from '../src/data/doneness';
import { getWineRecommendations, hasWinePairing } from '../src/data/pairings';
import { CATEGORIES, MENU_ITEMS } from '../src/data/menu';
import { WINES } from '../src/data/wine';
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

/* ---- Fase 3: elegibilidad del punto de carne y textos localizados ---- */
const eligible = MENU_ITEMS.filter((i) => supportsDoneness(i)).map((i) => i.id).sort();
const expectedEligible = ['churrascos-de-ternera', 'churrasquito-de-ternera'];
if (JSON.stringify(eligible) !== JSON.stringify(expectedEligible)) {
  errors.push(`elegibles punto de carne = [${eligible.join(', ')}] (esperado [${expectedEligible.join(', ')}])`);
}
for (const item of MENU_ITEMS) {
  if (
    supportsDoneness(item) &&
    item.category !== 'para-compartir' &&
    item.category !== 'principales'
  ) {
    errors.push(`${item.id}: selector en categoría no cárnica (${item.category})`);
  }
  if (
    !supportsDoneness(item) &&
    (item.category === 'entradas' ||
      item.category === 'pastas' ||
      item.category === 'postres' ||
      item.category === 'bebidas')
  ) {
    continue; // correcto: sin selector
  }
}
if (DONENESS_LEVELS.length !== 3) errors.push(`niveles de cocción=${DONENESS_LEVELS.length} (esperado 3)`);
for (const level of DONENESS_LEVELS) {
  for (const lang of LANGS) {
    if (!level.label[lang]?.trim()) errors.push(`doneness ${level.id}: label[${lang}] vacío`);
    if (!level.description[lang]?.trim()) {
      errors.push(`doneness ${level.id}: description[${lang}] vacío`);
    }
  }
}
for (const key of ['donenessQuestion', 'confirmDoneness', 'donenessConfirmed'] as const) {
  for (const lang of LANGS) {
    const text = UI_STRINGS[key][lang];
    if (!text?.trim()) errors.push(`UI ${key}[${lang}] vacío`);
    if (key === 'donenessConfirmed' && !text.includes('{level}')) {
      errors.push(`donenessConfirmed[${lang}] debe contener {level}`);
    }
  }
}

/* ---- Fase 4: sommelier — vinos reales y elegibilidad de maridaje ---- */
for (const wine of WINES) {
  const source = MENU_ITEMS.find((m) => m.id === wine.id);
  if (!source) errors.push(`vino ${wine.id}: no existe en menu.ts (vino inventado)`);
  else if (source.category !== 'bebidas') errors.push(`vino ${wine.id}: no es una bebida de la carta`);
  for (const lang of LANGS) {
    if (!wine.note[lang]?.trim()) errors.push(`vino ${wine.id}: note[${lang}] vacío`);
    if (!wine.idealFor[lang]?.trim()) errors.push(`vino ${wine.id}: idealFor[${lang}] vacío`);
  }
}
const pairedIds = MENU_ITEMS.filter((i) => hasWinePairing(i)).map((i) => i.id);
if (pairedIds.length !== 18) errors.push(`productos con maridaje=${pairedIds.length} (esperado 18)`);
for (const id of pairedIds) {
  const item = MENU_ITEMS.find((m) => m.id === id);
  if (!item) continue;
  if (item.category === 'postres' || item.category === 'bebidas') {
    errors.push(`maridaje indebido en ${id} (${item.category})`);
  }
}
for (const excluded of [
  'trucha-salmonada',
  'cintas-con-frutos-de-mar',
  'noquis-de-papa',
  'capelettis-de-calabaza-y-nueces',
  'sopa-cremosa-de-calabaza',
  'mousse-de-chocolate',
  'sifon-de-soda',
]) {
  const item = MENU_ITEMS.find((m) => m.id === excluded);
  if (item && getWineRecommendations(item).length > 0) {
    errors.push(`${excluded} no debería tener maridaje`);
  }
}
const churrasco = MENU_ITEMS.find((m) => m.id === 'churrascos-de-ternera');
if (!churrasco || !hasWinePairing(churrasco)) errors.push('churrascos-de-ternera sin maridaje');
for (const key of ['seeWine', 'pairingTitle', 'idealFor', 'seeOnMenu', 'sommelierNote', 'punto'] as const) {
  for (const lang of LANGS) {
    if (!UI_STRINGS[key][lang]?.trim()) errors.push(`UI ${key}[${lang}] vacío`);
  }
}

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
