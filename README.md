# El Asadito Bodegón · Menú digital

Demo comercial premium de menú digital mobile-first para **El Asadito Bodegón**
(Av. Sarmiento 716, Mendoza · Instagram: [@paisanacantina](https://www.instagram.com/paisanacantina)).

## Fase 1

Base visual y funcional del menú:

- Hero cinematográfico con la fachada real del local y CTA «Ver carta».
- Navegación de categorías horizontal, fija y con scroll-spy.
- Carta digitalizada fielmente desde la carta física (categorías, nombres,
  descripciones y precios; sin inventar contenido).
- Cards táctiles con microanimaciones y bottom sheet de detalle con estética
  de hoja de carta (papel cálido + esquineros cobreados).

## Fase 2 (esta rama)

- **Traductor ES / PT / EN**: selector compacto en el header (🇦🇷/🇧🇷/🇺🇸),
  cambio instantáneo sin recarga, preferencia persistida en localStorage.
  Toda la interfaz y los 46 productos localizados; fallback a español.
- **Conversor ARS / USD / BRL**: precios base siempre en ARS; la conversión
  ocurre solo al renderizar. Formatos `$ 12.500` · `U$S 10,42` · `R$ 57,80`.
- **Tipo de cambio Oficial / Blue** con tasas centralizadas en
  `src/data/exchangeRates.ts` (referencia 2026-09-22), listo para conectar
  una API de cotizaciones en una fase posterior sin tocar componentes.
- Nota discreta «Valores de referencia» junto al conversor.
- Default ES + ARS + Oficial idéntico a la experiencia de Fase 1.

## Fase 3

- **Selector visual de punto de la carne** dentro del bottom sheet existente,
  solo en productos elegibles (cortes a la parrilla: churrascos/churrasquito
  de ternera) vía `supportsDoneness(product)` en `data/doneness.ts`.
- Tres niveles localizados ES/PT/EN — Jugoso / A punto / Bien cocido — con
  ilustración SVG propia del interior del corte (rojo / rosado / marrón),
  cards táctiles con hover/pressed/seleccionada, CTA «Confirmar punto» y
  feedback breve («Jugoso seleccionado»), accesible por teclado y aria-live.
- Selección temporal por producto en el estado de la sesión; `menu.ts`
  y los precios no se tocan. Coexiste con ARS/USD/BRL y Oficial/Blue.

## Validación

```bash
npm run build   # tsc + vite build
npm run check   # 46 productos, 7 categorías, i18n completo, formatos de precio,
                # elegibilidad del punto de carne y textos del módulo ES/PT/EN
```

## Stack y estructura

Vite + React + TypeScript, estilos CSS propios (sin librerías de UI).

```
src/
  components/   Header, LanguageSelector, Hero, CurrencyBar, CategoryNav,
                MenuSection, ProductCard, ProductSheet, Footer
  context/      PreferencesContext (idioma, moneda, cambio + useT)
  data/         types.ts · menu.ts (fuente ES) · translations.ts · exchangeRates.ts
  hooks/        useScrollSpy · useReveal
  styles/       global.css
  utils/        format.ts
scripts/        validate.ts
```

Fotografías de referencia del local en `public/images` (fachada y parrilla).
