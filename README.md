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

## Fase 6 — Demo maestra configurable por URL

La misma app se personaliza sin reconstruir mediante query params:

| Param  | Efecto | Validación |
| ------ | ------ | ---------- |
| `local` | Nombre visible (hero, header, footer, `document.title`, mensajes WA) | texto saneado, máx. 60 |
| `mesa`  | Chip discreto «Mesa N» en header | texto corto opcional |
| `wa`    | Sobrescribe WhatsApp (`businessContact`) | solo dígitos 8–15 |
| `maps`  | Sobrescribe URL de Google Maps (reseñas + header) | solo `https:` |
| `logo`  | Logo remoto con fallback si falla | `https:` + extensión de imagen |

**Seguridad comercial (Fase 7):** si `?local=` es otro comercio
(`isCustomDemo`), la demo **nunca** muestra los canales reales de El Asadito
como propios: sin `?maps=`/`?wa=` esos canales quedan desactivados con la
nota «Demo — destino no configurado», el Instagram y la dirección se ocultan.
Con `?local=El Asadito Bodegón` (o sin `local`) se usan los defaults reales.

Sin parámetros: experiencia exacta de El Asadito Bodegón (defaults en
`data/business.ts`). Parsing centralizado en `utils/demoConfig.ts`
(`parseDemoConfig` / `getDemoConfig` / `resolveBusiness`) y consumido por
`hooks/useDemoConfig.ts` (`useDemoBusiness`): única fuente de verdad.
El contenido gastronómico (carta, vinos) sigue siendo el demo de El Asadito;
Instagram permanece como default. Sin CMS ni backend.

Ejemplos:

```
/
/?local=La%20Parrilla
/?local=La%20Parrilla&mesa=7
/?local=La%20Parrilla&mesa=7&wa=5492615029744
/?local=La%20Parrilla&mesa=7&maps=https%3A%2F%2Fmaps.app.goo.gl%2Ftest
/?local=La%20Parrilla&mesa=7&wa=5492615029744&maps=https%3A%2F%2Fmaps.app.goo.gl%2Ftest
/?local=El%20Asadito%20Bodeg%C3%B3n
/?logo=https%3A%2F%2Fejemplo.com%2Flogo.png
```

## PWA y deploy

- `public/manifest.webmanifest` + `public/icon.svg`: instalación básica
  (standalone, theme/background `#14100b`). Sin service worker: prioridad
  estabilidad.
- Build 100% estático (`dist/`): compatible directo con Vercel o Netlify,
  sin rewrites (los query params se leen en el cliente) y sin depender de
  localhost.

## Ejecución

```bash
npm install
npm run dev      # desarrollo en 0.0.0.0:5173
npm run build    # tsc + vite build → dist/
npm run check    # validación de datos, i18n, monedas, módulos y demo maestra
```

`npm run check` valida: 46 productos, 7 categorías, i18n ES/PT/EN completo,
formatos ARS/USD/BRL, elegibilidad del punto de carne (2 productos),
maridajes (18 productos, 1 vino real), flujos de reseñas, sanitización de
query params y seguridad comercial de la demo maestra.

## Stack y estructura

Vite + React + TypeScript, estilos CSS propios (sin librerías de UI).

```
src/
  components/   Header, LanguageSelector, Hero, CurrencyBar, CategoryNav,
                MenuSection, ProductCard, ProductSheet, Footer, LogoImage
    doneness/   DonenessSelector · DonenessOption · DonenessIllustration
    sommelier/  SommelierSheet · WineRecommendationCard · icons
    reviews/    RatingSection · RatingStars · PrivateFeedbackForm
  context/      PreferencesContext (idioma, moneda, cambio + useT)
  data/         types · menu (fuente ES) · translations · exchangeRates ·
                doneness · pairings · wine · business
  hooks/        useScrollSpy · useReveal · useDemoConfig
  styles/       global.css
  utils/        format · reviews · demoConfig
scripts/        validate.ts
public/         manifest.webmanifest · icon.svg · images/
```

Fotografías de referencia del local en `public/images` (fachada y parrilla).
