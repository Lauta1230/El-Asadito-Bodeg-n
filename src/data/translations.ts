import type { CategoryId, LocalizedText } from './types';

/**
 * Traducciones estructuradas PT / EN sobre la fuente en español.
 * El fallback a `es` se aplica al construir `MENU_ITEMS` (menu.ts),
 * así ningún campo localizado queda undefined.
 */

export interface ItemTranslation {
  name?: string;
  description?: string;
}

export const ITEM_TRANSLATIONS: Record<
  'pt' | 'en',
  Record<string, ItemTranslation>
> = {
  pt: {
    'papas-fritas': { name: 'Batatas Fritas', description: 'Tripla cocção com aioli da casa.' },
    'trio-de-empanadas': {
      name: 'Trio de Empanadas',
      description: 'Carne cortada na faca com molho picante de tomate.',
    },
    'untables-de-la-casa': {
      name: 'Pastas da Casa',
      description: 'Patê de ave e homus de pimentões assados, azeite de oliva e crackers de tomate.',
    },
    'humita-de-choclos-asados': {
      name: 'Humita de Milho Assado',
      description: 'Gratinada com queijo cuartirolo, tomates assados e manjericão fresco.',
    },
    'bunuelos-de-acelga': { name: 'Bolinhos de Acelga', description: 'Com aioli de limão.' },
    focaccia: {
      description: 'Azeite de oliva, salame, queijo e azeitonas.',
    },
    'tortilla-de-papa': { name: 'Omelete de Batata' },
    'vitel-tone': {
      name: 'Vitelo Tonnato',
      description: 'Picanha com alcaparras fritas e parmesão.',
    },
    provoleta: { description: 'Com pimentões assados e pesto de ervas.' },
    'ensalada-de-estacion': {
      name: 'Salada da Estação',
      description: 'Folhas verdes, frango, tomate-cereja, abacate, ovo, queijo e beterraba assada.',
    },
    'ensalada-cesar': {
      name: 'Salada César',
      description: 'Mix de folhas, queijo sardo, frango grelhado, molho césar e torrada de focaccia.',
    },
    'ravioles-de-osobuco-compartir': {
      name: 'Raviólis de ossobuco, ricota e espinafre com ensopado de carne',
    },
    'pastel-de-papa-mendocino-compartir': { name: 'Pastel de Batata Mendocino' },
    'churrascos-de-ternera': {
      name: 'Churrascos de Vitela 250g',
      description: 'Com arroz e batatas de tripla cocção.',
    },
    'milanesa-de-ojo-de-bife-compartir': {
      name: 'Milanesa de Bife Ancho',
      description: 'Com acompanhamento. Opção napolitana, fugazza ou a cavalo.',
    },
    'matambre-a-la-pizza': {
      name: 'Matambre à Pizza',
      description: 'Com batatas fritas de tripla cocção.',
    },
    'vacio-al-horno-con-papas': { name: 'Fraldinha Assada com Batatas' },
    'pollo-al-disco': { name: 'Frango no Disco com Vegetais' },
    'pastel-de-papa-mendocino': { name: 'Pastel de Batata Mendocino' },
    'milanesa-de-ojo-de-bife': {
      name: 'Milanesa de Bife Ancho',
      description: 'Com acompanhamento. Opção napolitana, fugazza ou a cavalo.',
    },
    'churrasquito-de-ternera': {
      name: 'Churrasquinho de Vitela 250g',
      description: 'Com arroz e batatas de tripla cocção.',
    },
    'trucha-salmonada': {
      name: 'Truta Salmonada',
      description: 'Com manteiga de alcaparras, cremoso de batata e couve crocante.',
    },
    'sopa-cremosa-de-calabaza': {
      name: 'Sopa Cremosa de Abóbora',
      description: 'Com torrada de focaccia e parmesão gratinado.',
    },
    'canelones-de-espinaca-y-pollo': {
      name: 'Canelones de Espinafre e Frango',
      description: 'Com molho pomodoro e queijo cuartirolo gratinado.',
    },
    'locro-criollo': { name: 'Locro Crioulo com Molho Quiquirimichi' },
    'guiso-de-lentejas': { name: 'Ensopado de Lentilhas' },
    'vacio-al-horno': {
      name: 'Fraldinha Assada',
      description: 'Com batatas e jus de cozimento.',
    },
    'capelettis-de-calabaza-y-nueces': {
      name: 'Capeletti de Abóbora e Nozes',
      description: 'Com creme de queijos gratinados e beterraba.',
    },
    'ravioles-de-osobuco': {
      name: 'Raviólis de Ossobuco, Ricota e Espinafre',
      description: 'Com ensopado de carne.',
    },
    'noquis-de-papa': {
      name: 'Nhoque de Batata',
      description: 'Com creme de ervas, cebolinha e portobello na chapa.',
    },
    'tallarines-con-tuco-y-pesto': { name: 'Talharim com Tuco e Pesto' },
    'lasana-de-vacio-ahumado': { name: 'Lasanha de Fraldinha Defumada' },
    'cintas-con-frutos-de-mar': { name: 'Cintas com Frutos do Mar' },
    'mousse-de-chocolate': { name: 'Mousse de Chocolate' },
    'panqueques-rellenos': {
      name: 'Panquecas recheadas com doce de leite e sorvete',
    },
    'queso-y-dulce': {
      name: 'Queijo e Doce',
      description: 'Queijo cuartirolo, marmelada e doce de batata-doce.',
    },
    'flan-de-huevo': { name: 'Flan de Ovos com Doce de Leite e Creme' },
    'banana-split': {
      description:
        'Bananas caramelizadas, sorvete, calda de chocolate e amendoim caramelizado.',
    },
    'linea-coca-cola-354': { name: 'Linha Coca-Cola 354ml' },
    'linea-coca-cola-125': { name: 'Linha Coca-Cola 1,25L' },
    'agua-con-y-sin-gas': { name: 'Água com e sem gás 500ml' },
    'agua-saborizada': { name: 'Água saborizada 500ml' },
    'cerveza-imperial': { name: 'Cerveja Imperial 475ml' },
    'pinguino-vino-casa-sifon': { name: 'Pinguim Grande de Vinho da Casa + Sifão' },
    'pinguino-vermu-lunfa': { name: 'Pinguim de Vermute Lunfa' },
    'sifon-de-soda': { name: 'Sifão de Soda 650ml' },
  },
  en: {
    'papas-fritas': { name: 'French Fries', description: 'Triple-cooked with house aioli.' },
    'trio-de-empanadas': {
      name: 'Empanada Trio',
      description: 'Hand-cut beef with spicy tomato sauce.',
    },
    'untables-de-la-casa': {
      name: 'House Spreads',
      description: 'Chicken pâté and roasted pepper hummus, olive oil and tomato crackers.',
    },
    'humita-de-choclos-asados': {
      name: 'Grilled Corn Humita',
      description: 'Gratinated with cuartirolo cheese, roasted tomatoes and fresh basil.',
    },
    'bunuelos-de-acelga': { name: 'Chard Fritters', description: 'With lemon aioli.' },
    focaccia: { description: 'Olive oil, salami, cheese and olives.' },
    'tortilla-de-papa': { name: 'Potato Omelette' },
    'vitel-tone': {
      name: 'Vitel Tonné',
      description: 'Picanha with fried capers and parmesan.',
    },
    provoleta: { description: 'With roasted peppers and herb pesto.' },
    'ensalada-de-estacion': {
      name: 'Seasonal Salad',
      description: 'Greens, chicken, cherry tomatoes, avocado, egg, cheese and roasted beet.',
    },
    'ensalada-cesar': {
      name: 'Caesar Salad',
      description: 'Mixed greens, sardo cheese, grilled chicken, Caesar dressing and focaccia toast.',
    },
    'ravioles-de-osobuco-compartir': {
      name: 'Osso buco, ricotta and spinach ravioli with beef stew',
    },
    'pastel-de-papa-mendocino-compartir': { name: 'Mendocino Potato Pie' },
    'churrascos-de-ternera': {
      name: 'Veal Churrasco Steaks 250g',
      description: 'With rice and triple-cooked potatoes.',
    },
    'milanesa-de-ojo-de-bife-compartir': {
      name: 'Ribeye Milanesa',
      description: 'With a side. Napolitana, fugazza or a caballo option.',
    },
    'matambre-a-la-pizza': {
      name: 'Matambre “a la Pizza”',
      description: 'With triple-cooked fries.',
    },
    'vacio-al-horno-con-papas': { name: 'Oven-Roasted Flank Steak with Potatoes' },
    'pollo-al-disco': { name: 'Chicken al Disco with Vegetables' },
    'pastel-de-papa-mendocino': { name: 'Mendocino Potato Pie' },
    'milanesa-de-ojo-de-bife': {
      name: 'Ribeye Milanesa',
      description: 'With a side. Napolitana, fugazza or a caballo option.',
    },
    'churrasquito-de-ternera': {
      name: 'Veal Churrasco Steak 250g',
      description: 'With rice and triple-cooked potatoes.',
    },
    'trucha-salmonada': {
      name: 'Salmon Trout',
      description: 'With caper butter, creamy potatoes and crispy kale.',
    },
    'sopa-cremosa-de-calabaza': {
      name: 'Creamy Pumpkin Soup',
      description: 'With focaccia crouton and gratinéed parmesan.',
    },
    'canelones-de-espinaca-y-pollo': {
      name: 'Spinach and Chicken Cannelloni',
      description: 'With pomodoro sauce and gratinéed cuartirolo cheese.',
    },
    'locro-criollo': { name: 'Creole Locro with Quiquirimichi Sauce' },
    'guiso-de-lentejas': { name: 'Lentil Stew' },
    'vacio-al-horno': {
      name: 'Oven-Roasted Flank Steak',
      description: 'With potatoes and cooking juices.',
    },
    'capelettis-de-calabaza-y-nueces': {
      name: 'Pumpkin and Walnut Capeletti',
      description: 'With gratinéed cheese cream and beetroot.',
    },
    'ravioles-de-osobuco': {
      name: 'Osso Buco, Ricotta and Spinach Ravioli',
      description: 'With beef stew.',
    },
    'noquis-de-papa': {
      name: 'Potato Gnocchi',
      description: 'With herb cream, scallions and griddled portobellos.',
    },
    'tallarines-con-tuco-y-pesto': { name: 'Tagliatelle with Tuco and Pesto' },
    'lasana-de-vacio-ahumado': { name: 'Smoked Flank Steak Lasagna' },
    'cintas-con-frutos-de-mar': { name: 'Ribbon Pasta with Seafood' },
    'mousse-de-chocolate': { name: 'Chocolate Mousse' },
    'panqueques-rellenos': {
      name: 'Crepes filled with dulce de leche and ice cream',
    },
    'queso-y-dulce': {
      name: 'Cheese and Quince Paste',
      description: 'Cuartirolo cheese with quince and sweet potato paste.',
    },
    'flan-de-huevo': { name: 'Egg Flan with Dulce de Leche and Cream' },
    'banana-split': {
      description: 'Caramelized bananas, ice cream, chocolate sauce and candied peanuts.',
    },
    'linea-coca-cola-354': { name: 'Coca-Cola Range 354ml' },
    'linea-coca-cola-125': { name: 'Coca-Cola Range 1.25L' },
    'agua-con-y-sin-gas': { name: 'Still & Sparkling Water 500ml' },
    'agua-saborizada': { name: 'Flavored Water 500ml' },
    'cerveza-imperial': { name: 'Imperial Beer 475ml' },
    'pinguino-vino-casa-sifon': { name: 'Large House Wine “Pingüino” + Soda Siphon' },
    'pinguino-vermu-lunfa': { name: 'Lunfa Vermouth “Pingüino”' },
    'sifon-de-soda': { name: 'Soda Siphon 650ml' },
  },
};

export const CATEGORY_TRANSLATIONS: Record<
  'pt' | 'en',
  Record<CategoryId, { label: string; note?: string }>
> = {
  pt: {
    entradas: { label: 'Entradas' },
    'para-compartir': { label: 'Para Compartilhar' },
    principales: { label: 'Pratos Principais' },
    'platos-de-invierno': { label: 'Pratos de Inverno' },
    pastas: { label: 'Massas' },
    postres: {
      label: 'Sobremesas',
      note: 'Não esqueça de guardar espaço para a sobremesa! Nosso flan de doce de leite e creme da casa espera por você para fechar a noite.',
    },
    bebidas: { label: 'Bebidas' },
  },
  en: {
    entradas: { label: 'Starters' },
    'para-compartir': { label: 'To Share' },
    principales: { label: 'Main Courses' },
    'platos-de-invierno': { label: 'Winter Dishes' },
    pastas: { label: 'Pasta' },
    postres: {
      label: 'Desserts',
      note: 'Don’t forget to save room for dessert! Our house dulce de leche flan with cream is waiting to close out the night.',
    },
    bebidas: { label: 'Drinks' },
  },
};

export type UiKey =
  | 'verCarta'
  | 'verDetalle'
  | 'precio'
  | 'cerrar'
  | 'comoLlegar'
  | 'idioma'
  | 'moneda'
  | 'cambio'
  | 'oficial'
  | 'blue'
  | 'valoresReferencia'
  | 'categoriasAria'
  | 'footerMeta';

export const UI_STRINGS: Record<UiKey, LocalizedText> = {
  verCarta: { es: 'Ver carta', pt: 'Ver cardápio', en: 'View menu' },
  verDetalle: { es: 'Ver detalle', pt: 'Ver detalhes', en: 'Details' },
  precio: { es: 'Precio', pt: 'Preço', en: 'Price' },
  cerrar: { es: 'Cerrar', pt: 'Fechar', en: 'Close' },
  comoLlegar: { es: 'Cómo llegar', pt: 'Como chegar', en: 'Directions' },
  idioma: { es: 'Idioma', pt: 'Idioma', en: 'Language' },
  moneda: { es: 'Moneda', pt: 'Moeda', en: 'Currency' },
  cambio: { es: 'Cambio', pt: 'Câmbio', en: 'Rate' },
  oficial: { es: 'Oficial', pt: 'Oficial', en: 'Official' },
  blue: { es: 'Blue', pt: 'Blue', en: 'Blue' },
  valoresReferencia: {
    es: 'Valores de referencia',
    pt: 'Valores de referência',
    en: 'Reference values',
  },
  categoriasAria: {
    es: 'Categorías de la carta',
    pt: 'Categorias do cardápio',
    en: 'Menu categories',
  },
  footerMeta: {
    es: 'Demo comercial · Fase 2 — Carta digitalizada fielmente desde la carta física del restaurante.',
    pt: 'Demo comercial · Fase 2 — Cardápio digitalizado fielmente a partir da carta física do restaurante.',
    en: 'Commercial demo · Phase 2 — Menu faithfully digitized from the restaurant’s physical menu.',
  },
};
