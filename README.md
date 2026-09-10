# 📷 Frame & Light — Contemporary Photography Art Gallery

_An immersive digital photography exhibition that explores light, space, people, and the quiet stories hidden inside ordinary moments._

---

## 📌 Table of Contents

- <a href="#overview">Overview</a>
- <a href="#concept">Concept</a>
- <a href="#features">Features</a>
- <a href="#tools--technologies">Tools & Technologies</a>
- <a href="#project-structure">Project Structure</a>
- <a href="#photography-collection">Photography Collection</a>
- <a href="#interactive-experience">Interactive Experience</a>
- <a href="#3d-scenes">3D Scenes</a>
- <a href="#animations--interactions">Animations & Interactions</a>
- <a href="#performance--accessibility">Performance & Accessibility</a>
- <a href="#how-to-run-this-project">How to Run This Project</a>
- <a href="#replacing-the-photography">Replacing the Photography</a>
- <a href="#project-philosophy">Project Philosophy</a>

---

<h2><a class="anchor" id="overview"></a>Overview</h2>

**Frame & Light** is a single-page contemporary photography art gallery built to present photography as an immersive visual experience rather than a conventional portfolio.

The experience combines a cinematic hero section, curated photography, a filterable masonry gallery, fullscreen image viewing, editorial stories, photography education, an interactive exposure simulator, a raw-to-final comparison slider, and lightweight Three.js 3D scenes.

The project is built with **Vanilla HTML, CSS, and JavaScript**, with **Three.js** used for 3D scenes and **GSAP + ScrollTrigger** used for motion and scroll-based reveals.

---

<h2><a class="anchor" id="concept"></a>Concept</h2>

Frame & Light presents photography as art and focuses on the relationship between **light, observation, composition, and emotion**.

The website is organized around several experiences:

- A cinematic introduction to the gallery
- A curated **Selected Works** section
- A filterable **Collection** of photographs
- **Behind the Frame** editorial stories
- An educational section explaining photography fundamentals
- An interactive **Exposure Simulator**
- A **Raw to Final** image comparison
- Interactive Three.js representations of a camera lens and camera body
- An editorial **Behind the Camera** section
- A contact experience for exhibitions, prints, collaborations, and licensing enquiries

---

<h2><a class="anchor" id="features"></a>Features</h2>

- Cinematic preloader with loading-progress display
- Fixed navigation with active-section tracking
- Responsive mobile navigation drawer
- Hero typewriter introduction
- Scroll progress indicator
- GSAP and ScrollTrigger reveal animations
- Subtle hero video parallax
- Curated **Selected Works** horizontal gallery
- Filterable masonry photography collection
- Fullscreen exhibition-style lightbox
- Keyboard navigation for the lightbox using `←`, `→`, and `Esc`
- Interactive photography stories
- Photography fundamentals section covering Exposure, Aperture, Shutter Speed, ISO, Composition, and Light
- Interactive Exposure Simulator
- Draggable **Raw to Final** comparison slider
- Keyboard-operable before/after slider
- Three.js rotating lens scene
- Three.js camera-body scene
- Desktop-only custom cursor
- Touch-device interaction adjustments
- `prefers-reduced-motion` support
- Lazy-loaded photography
- Visibility-aware Three.js rendering
- Semantic HTML and accessibility-focused interactions

---

<h2><a class="anchor" id="tools--technologies"></a>Tools & Technologies</h2>

- **HTML5** — Semantic page structure and accessible content
- **CSS3** — Responsive layout, design system, transitions, filters, and visual effects
- **JavaScript** — Gallery logic, navigation, interactions, simulator, lightbox, and application behavior
- **Three.js r128** — Interactive 3D lens and camera scenes
- **GSAP 3.12** — Animation engine
- **GSAP ScrollTrigger** — Scroll-based animation and reveal effects
- **Google Fonts** — Cormorant Garamond and Manrope
- **Unsplash** — Photography imagery used by the centralized project dataset

---

<h2><a class="anchor" id="project-structure"></a>Project Structure</h2>

```text
frame-and-light/
│
├── index.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
│
├── js/
│   ├── data.js
│   ├── main.js
│   ├── navigation.js
│   ├── cursor.js
│   ├── gallery.js
│   ├── lightbox.js
│   ├── exposure.js
│   ├── before-after.js
│   ├── camera3d.js
│   └── animations.js
│
└── README.md
```

### JavaScript Modules

| File | Purpose |
|---|---|
| `data.js` | Centralized photography and story dataset |
| `main.js` | Preloader, hero introduction, scroll progress, animated statistics, and general page behavior |
| `navigation.js` | Navigation state, mobile menu, and active-section tracking |
| `cursor.js` | Desktop custom cursor interactions |
| `gallery.js` | Featured works, masonry gallery, category filters, and stories |
| `lightbox.js` | Fullscreen photograph viewer and keyboard navigation |
| `exposure.js` | Interactive aperture, shutter, and ISO simulator |
| `before-after.js` | Draggable raw/final image comparison |
| `camera3d.js` | Three.js lens and camera-body scenes |
| `animations.js` | GSAP and ScrollTrigger reveal animations |

---

<h2><a class="anchor" id="photography-collection"></a>Photography Collection</h2>

The photography content is centralized inside `js/data.js`.

Each photograph contains metadata including:

- Title
- Category
- Location
- Coordinates
- Camera
- Lens
- Aperture
- Shutter speed
- ISO
- Description
- Full-resolution image
- Thumbnail image
- Orientation

The collection includes photography categories such as:

- Architecture
- Street
- Portrait
- Nature
- Abstract
- Minimal

The gallery automatically uses this centralized data to populate the featured works, masonry collection, filters, stories, and lightbox.

---

<h2><a class="anchor" id="interactive-experience"></a>Interactive Experience</h2>

### Exposure Simulator

The **Interactive Exposure Simulator** allows visitors to change:

- Aperture
- Shutter Speed
- ISO

The preview responds to these settings through visual effects representing:

- Exposure / brightness
- Depth of field
- Image grain

The relationships are intentionally conceptual rather than physically simulated:

- Wide aperture → shallower depth of field
- Narrow aperture → more of the scene in focus
- Fast shutter → freezes motion and lets in less light
- Slow shutter → allows more light and can introduce motion blur
- Higher ISO → brighter image with more visible grain
- Lower ISO → cleaner image but requires more available light

### Raw to Final

The **Raw to Final** section provides a draggable before-and-after comparison.

Visitors can:

- Drag the divider with a pointer
- Use touch interaction
- Use the keyboard with the arrow keys
- View the difference between the raw and final versions of the photograph

---

<h2><a class="anchor" id="3d-scenes"></a>3D Scenes</h2>

The project includes two lightweight Three.js scenes created entirely from primitive geometry.

### Interactive Lens

The hero contains a stylized camera lens constructed using Three.js primitives including:

- `CylinderGeometry`
- `TorusGeometry`
- `CircleGeometry`

The lens includes a barrel, rings, glass element, and aperture blades.

### Camera Body

A second scene presents a stylized camera body constructed from:

- `BoxGeometry`
- `SphereGeometry`
- The reusable lens geometry

Both scenes provide subtle motion and interaction while remaining secondary to the photography itself.

The 3D rendering is also visibility-aware: scenes pause when their sections are outside the viewport, and reduced-motion settings disable the 3D experience when appropriate.

---

<h2><a class="anchor" id="animations--interactions"></a>Animations & Interactions</h2>

The project uses GSAP and ScrollTrigger to create editorial-style motion throughout the page.

Animations include:

- Line-by-line heading reveals
- Staggered featured-card entrances
- Masonry gallery reveals
- Alternating story image/text entrances
- Section-number reveals
- Hero video parallax
- Hero typewriter introduction
- Expanding divider lines
- Scroll-aware navigation
- Animated statistics
- Interactive custom cursor behavior

The custom cursor is enabled for desktop pointer devices and automatically disabled on touch/coarse-pointer devices.

---

<h2><a class="anchor" id="performance--accessibility"></a>Performance & Accessibility</h2>

### Performance

- Gallery and story images use lazy loading
- Three.js rendering pauses when scenes are outside the viewport
- Scroll animations use reveal-based triggers rather than continuous scrubbing, except for the hero parallax
- Expensive custom-cursor interactions are disabled on touch devices
- Three.js scenes are disabled under reduced-motion preferences
- The page remains functional if CDN-hosted animation libraries fail to load

### Accessibility

The project includes:

- Semantic `header`, `main`, `section`, and `footer` landmarks
- Descriptive image `alt` text
- Visible focus states
- Keyboard-operable gallery interactions
- Keyboard-operable lightbox
- `Escape` support for closing the lightbox
- `←` / `→` navigation inside the lightbox
- Keyboard-operable before/after slider
- `role="slider"` and live `aria-valuenow` for the comparison slider
- Labelled contact form fields
- `aria-live` status messaging for the contact form
- `prefers-reduced-motion` support

---

<h2><a class="anchor" id="how-to-run-this-project"></a>How to Run This Project</h2>

### 1. Clone or download the project

```bash
git clone <your-repository-url>
cd frame-and-light
```

### 2. Start a local static server

No backend, database, build system, or framework is required.

Using `npx serve`:

```bash
npx serve .
```

Or using Python:

```bash
python3 -m http.server 8080
```

### 3. Open the application

Open the local URL printed by your server.

For example:

```text
http://localhost:8080
```

Opening `index.html` directly with `file://` also works, although a local server is recommended for consistent behavior with CDN-hosted fonts and libraries.

---

<h2><a class="anchor" id="replacing-the-photography"></a>Replacing the Photography</h2>

All photography content is managed from:

```text
js/data.js
```

The main datasets are:

```javascript
PHOTO_DATA
STORY_DATA
```

To use your own photography, replace the image and thumbnail URLs inside `PHOTO_DATA`.

The rest of the website reads from this centralized dataset, so updating the photography data automatically updates:

- Selected Works
- Masonry Collection
- Category Filters
- Lightbox
- Photography Stories

Each photo can also contain its own title, category, location, camera, lens, aperture, shutter speed, ISO, and description.

---

<h2><a class="anchor" id="project-philosophy"></a>Project Philosophy</h2>

> **THE TOOL MATTERS. BUT THE EYE MATTERS MORE.**

Frame & Light treats the camera as a tool and observation as the starting point of photography.

The project is built around the idea that photography is not only about recording what is in front of the camera, but about noticing light, movement, composition, space, and moments that might otherwise disappear.

The gallery's editorial approach is summarized by its closing philosophy:

> **“The camera records what the eye sees. The photograph reveals what the heart noticed.”**

---

## External Dependencies

The project loads the following resources through CDNs:

- Three.js r128
- GSAP 3.12
- GSAP ScrollTrigger
- Google Fonts — Cormorant Garamond
- Google Fonts — Manrope

---

## Credits

Photography imagery used by the project is sourced through Unsplash URLs and is centralized in `js/data.js`.

---

**FRAME & LIGHT**  
_MADE WITH LIGHT & CODE_
