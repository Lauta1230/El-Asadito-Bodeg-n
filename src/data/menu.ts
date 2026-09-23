import {
  CATEGORY_TRANSLATIONS,
  ITEM_TRANSLATIONS,
  type ItemTranslation,
} from './translations';
import type {
  Category,
  CategoryId,
  LocalizedText,
  MenuItem,
  RestaurantMeta,
} from './types';

/**
 * Fuente en español: transcripción fiel de la carta física de
 * EL ASADITO BODEGÓN (Av. Sarmiento 716, Mendoza).
 * Las traducciones PT/EN se mergean encima al exportar, con fallback
 * a español si algún campo no está traducido. Una única estructura
 * de productos: no existen cartas duplicadas por idioma.
 */

export const RESTAURANT: RestaurantMeta = {
  name: 'El Asadito',
  sub: 'Bodegón',
  address: 'Av. Sarmiento 716 · Mendoza',
  instagramHandle: '@paisanacantina',
  instagramUrl: 'https://www.instagram.com/paisanacantina',
  mapsUrl: 'https://maps.app.goo.gl/JYSAaXyyJXKDk1hY8',
};

/* ------------------------- Fuente ES (carta física) ------------------------- */

interface BaseCategory {
  id: CategoryId;
  label: string;
  note?: string;
}

const BASE_CATEGORIES: BaseCategory[] = [
  { id: 'entradas', label: 'Entradas' },
  { id: 'para-compartir', label: 'Para compartir' },
  { id: 'principales', label: 'Principales' },
  { id: 'platos-de-invierno', label: 'Platos de invierno' },
  { id: 'pastas', label: 'Pastas' },
  {
    id: 'postres',
    label: 'Postres',
    note: '¡No te olvides de guardar lugar para el postre! Nuestro flan de dulce de leche y crema de la casa te espera para cerrar la noche.',
  },
  { id: 'bebidas', label: 'Bebidas' },
];

interface BaseItem {
  id: string;
  category: CategoryId;
  name: string;
  description?: string;
  priceARS: number;
}

const BASE_ITEMS: BaseItem[] = [
  /* ------------------------------ ENTRADAS ------------------------------ */
  {
    id: 'papas-fritas',
    category: 'entradas',
    name: 'Papas Fritas',
    description: 'Triple cocción con alioli de la casa.',
    priceARS: 12500,
  },
  {
    id: 'trio-de-empanadas',
    category: 'entradas',
    name: 'Trío de empanadas',
    description: 'Carne cortada a cuchillo con salsa picante de tomate.',
    priceARS: 12500,
  },
  {
    id: 'untables-de-la-casa',
    category: 'entradas',
    name: 'Untables de la Casa',
    description:
      'Paté de ave y hummus de pimientos asados, aceite de oliva y crackers de tomate.',
    priceARS: 12500,
  },
  {
    id: 'humita-de-choclos-asados',
    category: 'entradas',
    name: 'Humita de Choclos Asados',
    description: 'Gratinada con cuartirolo, tomates asados y albahaca fresca.',
    priceARS: 15000,
  },
  {
    id: 'bunuelos-de-acelga',
    category: 'entradas',
    name: 'Buñuelos de Acelga',
    description: 'Con alioli de limón.',
    priceARS: 15000,
  },
  {
    id: 'focaccia',
    category: 'entradas',
    name: 'Focaccia',
    description: 'Aceite de oliva, salame, queso y aceitunas.',
    priceARS: 15000,
  },
  {
    id: 'tortilla-de-papa',
    category: 'entradas',
    name: 'Tortilla de Papa',
    priceARS: 15000,
  },
  {
    id: 'vitel-tone',
    category: 'entradas',
    name: 'Vitel Tone',
    description: 'Picaña con alcaparras fritas y parmesano.',
    priceARS: 19900,
  },
  {
    id: 'provoleta',
    category: 'entradas',
    name: 'Provoleta',
    description: 'Con pimientos asados y pesto de hierbas.',
    priceARS: 19900,
  },
  {
    id: 'ensalada-de-estacion',
    category: 'entradas',
    name: 'Ensalada de Estación',
    description:
      'Hojas verdes, pollo, tomate cherry, palta, huevo, queso y remolacha asada.',
    priceARS: 20000,
  },
  {
    id: 'ensalada-cesar',
    category: 'entradas',
    name: 'Ensalada César',
    description:
      'Mix de verdes, queso sardo, pollo grillado, aderezo césar y tostada de focaccia.',
    priceARS: 20000,
  },

  /* --------------------------- PARA COMPARTIR --------------------------- */
  {
    id: 'ravioles-de-osobuco-compartir',
    category: 'para-compartir',
    name: 'Ravioles de osobuco, ricota y espinaca con estofado de carne',
    priceARS: 52000,
  },
  {
    id: 'pastel-de-papa-mendocino-compartir',
    category: 'para-compartir',
    name: 'Pastel de papa Mendocino',
    priceARS: 52000,
  },
  {
    id: 'churrascos-de-ternera',
    category: 'para-compartir',
    name: 'Churrascos de ternera 250gr',
    description: 'Con arroz y papas triple cocción.',
    priceARS: 54000,
  },
  {
    id: 'milanesa-de-ojo-de-bife-compartir',
    category: 'para-compartir',
    name: 'Milanesa de ojo de bife',
    description: 'Con guarnición. Opción napolitana, fugazza o a caballo.',
    priceARS: 54000,
  },
  {
    id: 'matambre-a-la-pizza',
    category: 'para-compartir',
    name: 'Matambre a la pizza',
    description: 'Con papas fritas triple cocción.',
    priceARS: 54000,
  },
  {
    id: 'vacio-al-horno-con-papas',
    category: 'para-compartir',
    name: 'Vacío al horno con papas',
    priceARS: 54000,
  },

  /* ----------------------------- PRINCIPALES ---------------------------- */
  {
    id: 'pollo-al-disco',
    category: 'principales',
    name: 'Pollo al disco con vegetales',
    priceARS: 28500,
  },
  {
    id: 'pastel-de-papa-mendocino',
    category: 'principales',
    name: 'Pastel de papa mendocino',
    priceARS: 29000,
  },
  {
    id: 'milanesa-de-ojo-de-bife',
    category: 'principales',
    name: 'Milanesa de ojo de bife',
    description: 'Con guarnición. Opción napolitana, fugazza o a caballo.',
    priceARS: 29500,
  },
  {
    id: 'churrasquito-de-ternera',
    category: 'principales',
    name: 'Churrasquito de ternera 250gr',
    description: 'Con arroz y papas triple cocción.',
    priceARS: 29500,
  },
  {
    id: 'trucha-salmonada',
    category: 'principales',
    name: 'Trucha Salmonada',
    description: 'Con manteca de alcaparras, cremoso de papa y kale crocante.',
    priceARS: 32000,
  },

  /* ------------------------- PLATOS DE INVIERNO ------------------------- */
  {
    id: 'sopa-cremosa-de-calabaza',
    category: 'platos-de-invierno',
    name: 'Sopa cremosa de calabaza',
    description: 'Con tostón de focaccia con queso parmesano gratinado.',
    priceARS: 18000,
  },
  {
    id: 'canelones-de-espinaca-y-pollo',
    category: 'platos-de-invierno',
    name: 'Canelones de espinaca y pollo',
    description: 'Con salsa pomodoro y queso cuartirolo gratinado.',
    priceARS: 28500,
  },
  {
    id: 'locro-criollo',
    category: 'platos-de-invierno',
    name: 'Locro criollo con salsa Quiquirimichi',
    priceARS: 29000,
  },
  {
    id: 'guiso-de-lentejas',
    category: 'platos-de-invierno',
    name: 'Guiso de Lentejas',
    priceARS: 29000,
  },
  {
    id: 'vacio-al-horno',
    category: 'platos-de-invierno',
    name: 'Vacío al Horno',
    description: 'Con papas y jugo de cocción.',
    priceARS: 29500,
  },

  /* -------------------------------- PASTAS ------------------------------ */
  {
    id: 'capelettis-de-calabaza-y-nueces',
    category: 'pastas',
    name: 'Capelettis de calabaza y nueces',
    description: 'Con crema de quesos gratinados y remolacha.',
    priceARS: 28500,
  },
  {
    id: 'ravioles-de-osobuco',
    category: 'pastas',
    name: 'Ravioles de osobuco, ricota y espinaca',
    description: 'Con estofado de carne.',
    priceARS: 28500,
  },
  {
    id: 'noquis-de-papa',
    category: 'pastas',
    name: 'Ñoquis de papa',
    description: 'Con crema de hierbas, verdeo y portobellos a la chapa.',
    priceARS: 29500,
  },
  {
    id: 'tallarines-con-tuco-y-pesto',
    category: 'pastas',
    name: 'Tallarines con tuco y pesto',
    priceARS: 29500,
  },
  {
    id: 'lasana-de-vacio-ahumado',
    category: 'pastas',
    name: 'Lasaña de vacío ahumado',
    priceARS: 30000,
  },
  {
    id: 'cintas-con-frutos-de-mar',
    category: 'pastas',
    name: 'Cintas con frutos de mar',
    priceARS: 32000,
  },

  /* ------------------------------- POSTRES ------------------------------ */
  {
    id: 'mousse-de-chocolate',
    category: 'postres',
    name: 'Mousse de chocolate',
    priceARS: 11000,
  },
  {
    id: 'panqueques-rellenos',
    category: 'postres',
    name: 'Panqueques rellenos de dulce de leche y helado',
    priceARS: 11000,
  },
  {
    id: 'queso-y-dulce',
    category: 'postres',
    name: 'Queso y dulce',
    description: 'Queso cuartirolo, membrillo y batata.',
    priceARS: 11000,
  },
  {
    id: 'flan-de-huevo',
    category: 'postres',
    name: 'Flan de huevo con dulce de leche y crema',
    priceARS: 16000,
  },
  {
    id: 'banana-split',
    category: 'postres',
    name: 'Banana Split',
    description: 'Bananas caramelizadas, helado, salsa de chocolate y garrapiñada.',
    priceARS: 18000,
  },

  /* ------------------------------- BEBIDAS ------------------------------ */
  {
    id: 'linea-coca-cola-354',
    category: 'bebidas',
    name: 'Línea Coca Cola 354cc',
    priceARS: 3800,
  },
  {
    id: 'linea-coca-cola-125',
    category: 'bebidas',
    name: 'Línea Coca cola 1,25Lts',
    priceARS: 8500,
  },
  {
    id: 'agua-con-y-sin-gas',
    category: 'bebidas',
    name: 'Agua con y sin gas 500cc',
    priceARS: 3500,
  },
  {
    id: 'agua-saborizada',
    category: 'bebidas',
    name: 'Agua saborizada 500cc',
    priceARS: 3500,
  },
  {
    id: 'cerveza-imperial',
    category: 'bebidas',
    name: 'Cerveza Imperial 475cc',
    priceARS: 6500,
  },
  {
    id: 'pinguino-vino-casa-sifon',
    category: 'bebidas',
    name: 'Pingüino grande de vino de la casa + Sifón',
    priceARS: 16800,
  },
  {
    id: 'pinguino-vermu-lunfa',
    category: 'bebidas',
    name: 'Pingüino de Vermú Lunfa',
    priceARS: 18600,
  },
  {
    id: 'sifon-de-soda',
    category: 'bebidas',
    name: 'Sifón de soda 650cc',
    priceARS: 3000,
  },
];

/* --------------------- Merge ES + traducciones (fallback ES) --------------------- */

function localize(
  base: string,
  translations: { pt?: string; en?: string },
): LocalizedText {
  return {
    es: base,
    pt: translations.pt ?? base,
    en: translations.en ?? base,
  };
}

export const CATEGORIES: Category[] = BASE_CATEGORIES.map((cat) => ({
  id: cat.id,
  label: localize(cat.label, {
    pt: CATEGORY_TRANSLATIONS.pt[cat.id]?.label,
    en: CATEGORY_TRANSLATIONS.en[cat.id]?.label,
  }),
  note: cat.note
    ? localize(cat.note, {
        pt: CATEGORY_TRANSLATIONS.pt[cat.id]?.note,
        en: CATEGORY_TRANSLATIONS.en[cat.id]?.note,
      })
    : undefined,
}));

export const MENU_ITEMS: MenuItem[] = BASE_ITEMS.map((item) => {
  const pt: ItemTranslation = ITEM_TRANSLATIONS.pt[item.id] ?? {};
  const en: ItemTranslation = ITEM_TRANSLATIONS.en[item.id] ?? {};
  return {
    id: item.id,
    category: item.category,
    priceARS: item.priceARS,
    name: localize(item.name, { pt: pt.name, en: en.name }),
    description: item.description
      ? localize(item.description, { pt: pt.description, en: en.description })
      : undefined,
  };
});
