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

## Fase 4

- **Sommelier digital**: CTA «Ver vino recomendado» en el ProductSheet solo
  donde aporta (carnes rojas, platos intensos, guisos y pastas con salsas
  fuertes; nunca en postres, bebidas, pescados o salsas cremosas).
- Sheet «Maridaje recomendado» apilado sobre el detalle, con la misma
  estética de papel + cobre: recomendaciones de vinos REALES de la carta
  (el único existente: Pingüino grande de vino de la casa + Sifón), nota
  editorial del sommelier e «Ideal para» localizados ES/PT/EN, precio con
  el conversor existente (ARS/USD/BRL · Oficial/Blue).
- Contexto del punto de carne: si el producto tiene punto confirmado, el
  sommelier lo muestra («Punto: Jugoso») sin depender de él.
- Lógica separada de la UI: `data/wine.ts` (vinos) + `data/pairings.ts`
  (`getWineRecommendations`, relaciones por id). Bodega/cepa no figuran en
  la carta real: pendientes, no se inventan ni se muestran.
- «Ver en carta» cierra los sheets y resalta la bebida en la carta.

## Fase 5

- **«¿Cómo fue tu experiencia?»** al final de la carta, antes del footer:
  tarjeta de papel cálido con esquineros cobreados y 5 estrellas táctiles
  (botones reales, aria-labels, teclado, estado visible sin depender del color).
- Flujos por valoración, sin ocultar reseñas negativas:
  - 5★ → «¡Nos alegra mucho!» + CTA «Dejar reseña en Google» (URL oficial).
  - 3–4★ → estado neutral + «Dejar reseña en Google» o «Enviar sugerencia
    privada» (formulario WhatsApp).
  - 1–2★ → estado de escucha + formulario privado (nombre opcional,
    comentario obligatorio) → WhatsApp con mensaje dinámico localizado.
- Configuración central `data/business.ts`: `businessConfig.mapsUrl` y
  `businessContact.whatsapp` (número tomado del wa.me público de la bio
  oficial de IG; pendiente de confirmación; `null` desactiva el canal sin
  generar URLs inválidas).
- `utils/reviews.ts`: `getRatingBand`, `buildWhatsAppUrl` (encodeURIComponent,
  null si no hay teléfono) y `composeFeedbackMessage` (texto plano, sin HTML).
- Confirmación local «Tu comentario ya está listo para enviar.» (aria-live);
  nada se almacena en localStorage; preferencias de idioma/moneda intactas.

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
