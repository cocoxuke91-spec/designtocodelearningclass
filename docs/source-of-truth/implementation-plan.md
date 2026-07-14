# Production implementation plan

## Product goal

Reconstruct the supplied visual as a responsive, accessible, production-grade HTML landing page while keeping the screenshot as the visual baseline and making all inferred behavior explicit.

## Technical direction

- **Decision**: use the existing Vinext/React SSR application in `app/`; its server-rendered output is semantic HTML while the authoring layer remains componentized and typed.
- **Decision**: keep the existing shared CSS token layer and component styles; avoid introducing a second Vite/Astro entry point.
- **Decision**: minimal client JavaScript using `IntersectionObserver`, CSS animations and reduced-motion handling. Add a motion dependency only if native behavior cannot meet a documented requirement.
- **Decision**: content remains in typed component data, while headings and body copy are rendered into server HTML for SEO and no-JS resilience.
- **Decision**: responsive images via `<picture>`, AVIF/WebP sources, explicit dimensions and meaningful alt text.

Vinext/React is an implementation decision based on the existing workspace. The deliverable remains HTML at runtime; the framework is only the authoring and SSR layer. If a later deployment requires a plain static package, the same component structure can be exported without changing the source-of-truth model.

## Planned structure

```text
/
├── public/
│   ├── assets/
│   └── fonts/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/index.astro
│   ├── scripts/motion.ts
│   └── styles/
├── tests/
│   ├── e2e/
│   └── visual/
└── docs/source-of-truth/
```

## Delivery phases

### Phase 0 — evidence and constraints

- Preserve the source screenshot and checksum.
- Generate non-overlapping section slices and record their crop coordinates and hashes as derived evidence.
- Record facts, unknowns, decisions and asset provenance.
- Establish calibration viewport and comparison workflow.

### Phase 1 — project foundation

- Preserve the existing Vinext/React/TypeScript scaffold and strict type checking.
- Add formatting, linting, unit checks and production build commands.
- Establish semantic landmarks, tokens, container primitives and responsive breakpoints.
- Add automated accessibility and browser smoke tests.

### Phase 2 — static structural pass

- Build every section in semantic HTML.
- Render repeated cards from typed content.
- Implement desktop, tablet and mobile layout without motion.
- Use stable placeholder assets with explicit aspect ratios to prevent layout shift.

### Phase 3 — visual fidelity pass

- Calibrate typography, spacing, card dimensions, borders, gradients and shadows.
- Reconstruct icons and decorative SVG layers.
- Create the layered hero illustration and responsive image variants.
- Compare 1440 px screenshots first, then validate all target widths.

### Phase 4 — interaction and motion

- Add progressive-enhancement entrance, hover/focus, orbit and timeline motion.
- Add reduced-motion behavior.
- Verify that no interaction depends solely on pointer hover.

### Phase 5 — production hardening

- Optimize image formats, dimensions, preload strategy and font loading.
- Validate keyboard navigation, landmarks, headings, contrast and zoom behavior.
- Add SEO metadata, Open Graph image, canonical configuration, favicon and structured data if the final organization/content is approved.
- Run production build, visual-regression checks, Lighthouse and cross-browser smoke tests.

## Asset workflow

Each asset receives an entry containing:

- file path;
- purpose;
- source/provenance;
- license or approval state;
- intrinsic dimensions;
- expected rendered sizes;
- replacement status.

The initial hero asset should be a layered 2D reconstruction. Three.js is explicitly deferred until interactive 3D is a product requirement; it is not justified by the static evidence alone.

## Change control

- A mismatch with the screenshot becomes an issue, not an undocumented tweak.
- Changes to stable tokens or layout rules require an entry in `decision-log.md`.
- Draft marketing copy must remain visibly marked in source data until approved.
- Reference screenshots generated from the implementation must include viewport, browser and commit SHA in their filename or metadata.
