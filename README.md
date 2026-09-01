# Frame & Light — Contemporary Photography Art Gallery

An immersive, single-page photography exhibition site. Vanilla HTML/CSS/JS +
Three.js for 3D, GSAP + ScrollTrigger for motion. No build step, no framework.

## Concept

Frame & Light presents photography as art, not portfolio filler: a cinematic
hero, a curated "Selected Works" strip, a filterable masonry collection, a
fullscreen exhibition-style lightbox, editorial "Behind the Frame" stories,
an interactive photography-fundamentals section (exposure simulator +
before/after slider), and two Three.js scenes (a rotating lens in the hero,
a camera body in the "tool matters" section) built entirely from primitive
geometry.

## Features

- Cinematic preloader with a real (not artificial) load-progress readout
- Scroll-aware navigation with active-section tracking and a mobile drawer
- GSAP/ScrollTrigger reveals: line-by-line headings, staggered gallery
  entrances, alternating story layouts, subtle hero parallax
- Filterable masonry gallery + fullscreen lightbox (keyboard: ← → Esc)
- Interactive exposure simulator (aperture / shutter / ISO → brightness,
  depth-of-field blur, and grain — conceptually correct, not physically
  simulated)
- Draggable before/after raw-vs-final comparison slider (mouse + touch)
- Two Three.js scenes built from `CylinderGeometry` / `TorusGeometry` /
  `BoxGeometry` / `SphereGeometry` primitives — no external 3D models
  required
- Desktop-only custom cursor (auto-disabled on touch)
- Respects `prefers-reduced-motion` throughout
- Accessible: semantic headings, alt text, visible focus states, keyboard-
  operable gallery/lightbox/slider, labelled form fields

## Folder structure

```
frame-and-light/
├── index.html
├── css/
│   ├── style.css        # design tokens + base styles
│   ├── responsive.css   # breakpoints
│   └── animations.css   # reduced-motion overrides
├── js/
│   ├── data.js           # centralized photo + story dataset
│   ├── main.js            # preloader, scroll progress, stats, contact form
│   ├── navigation.js       # nav scroll state, mobile menu, active link
│   ├── cursor.js           # custom cursor (desktop only)
│   ├── gallery.js          # featured track, masonry, filters, stories
│   ├── lightbox.js         # fullscreen viewer
│   ├── exposure.js         # exposure simulator logic
│   ├── before-after.js     # draggable comparison slider
│   ├── camera3d.js         # Three.js lens + camera scenes
│   └── animations.js       # GSAP ScrollTrigger reveals
└── README.md
```

## Running it

No backend, no database, no build step required. Serve the folder with any
static file server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open the printed local URL. Opening `index.html` directly via
`file://` also works, though a local server is recommended for consistent
CORS behaviour with the CDN-hosted fonts/libraries.

### External dependencies (CDN)

- [Three.js r128](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js)
- [GSAP 3.12](https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js) + ScrollTrigger
- Google Fonts: Cormorant Garamond, Inter

## Replacing the photography

Every image and its metadata live in one place: `js/data.js` (`PHOTO_DATA`
and `STORY_DATA`). Each photo object has `image` (full-res) and `thumbnail`
(grid-res) URLs plus title/category/location/camera/lens/aperture/shutter/
ISO/description fields — swap the URLs for real photography and everything
downstream (featured track, masonry, filters, lightbox, stories) updates
automatically. Placeholder imagery currently comes from picsum.photos.

## How the 3D scenes work

`js/camera3d.js` builds two objects from Three.js primitive geometry only
(no imported models): a lens (`CylinderGeometry` barrel + `TorusGeometry`
rings + triangular `CircleGeometry` aperture blades) and a camera body
(`BoxGeometry` body/prism + the same lens, scaled down, as its front
element). Both scenes:

- Auto-rotate slowly and respond to cursor position
- Pause their render loop via `IntersectionObserver` when scrolled off-screen
- Are skipped entirely under `prefers-reduced-motion` and hidden on small
  screens (hero lens) to protect mobile performance
- Are secondary to the photography by design — reduced opacity + screen
  blend mode in the hero, so the photograph stays the visual anchor

## How the exposure simulator works

`js/exposure.js` maps four-step aperture/shutter/ISO sliders to three CSS
effects on the preview image: a `backdrop-filter: blur()` layer for depth-
of-field, a `filter: brightness()` adjustment for exposure, and an SVG
turbulence noise layer whose opacity scales with ISO for grain. The
relationships are conceptually correct (wide aperture → shallow DOF, high
ISO → more grain) rather than physically modeled.

## Performance notes

- Images are `loading="lazy"` throughout the gallery/masonry/stories
- Three.js scenes stop rendering when their section leaves the viewport
- GSAP ScrollTrigger animations are `once`-style reveals, not continuous
  scrubs (except the single hero parallax layer)
- No animation library is loaded unless GSAP/Three.js scripts resolve —
  the page still functions (minus motion) if a CDN request fails

## Accessibility notes

- Landmark-appropriate semantic HTML (`header`, `main`, `section`, `footer`)
- Lightbox is a focus-managed dialog: opens focus to Close, restores focus
  on close, closes on `Escape`, navigates with `←`/`→`
- Before/after slider is keyboard-operable (arrow keys) with `role="slider"`
  and live `aria-valuenow`
- Custom cursor is fully disabled on touch/coarse-pointer devices and never
  the only way to understand an interactive affordance
- All motion is gated behind `prefers-reduced-motion`
