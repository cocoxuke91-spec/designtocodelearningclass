# Acceptance criteria

## Visual fidelity

- At 1440 CSS px, all ten major page regions appear in the same order and preserve the source composition.
- Content container, hero proportions, major grids and section spacing are calibrated with overlay or side-by-side screenshots.
- Decorative artwork may differ in fine detail when the original asset is unavailable, but its silhouette, visual weight, color role and placement must be comparable.
- No production section is implemented as a single flattened screenshot.

## Responsive behavior

- No horizontal page overflow at 320–1440 CSS px, except an explicitly designed card carousel.
- Layout remains usable at 200% browser zoom.
- Navigation, hero, grids, case study and footer have intentional mobile compositions.
- Images do not upscale beyond their acceptable source resolution.

## Semantics and accessibility

- One `h1`; logical heading hierarchy; `header`, `nav`, `main`, `section` and `footer` landmarks.
- Full keyboard access with visible focus indication.
- Mobile navigation exposes correct state and can be closed with Escape.
- Informative images have meaningful alt text; decorative images use empty alt text or are CSS backgrounds.
- Text and controls meet WCAG 2.2 AA contrast targets.
- Motion honors `prefers-reduced-motion` and does not block content.
- Page remains readable and navigable when JavaScript is disabled.

## Performance budget

Measured on the production build under a documented Lighthouse mobile profile:

- Lighthouse Performance target: ≥ 90.
- Accessibility, Best Practices and SEO targets: ≥ 95.
- LCP target: ≤ 2.5 s.
- CLS target: ≤ 0.1.
- INP target: ≤ 200 ms where field measurement is available.
- Initial JavaScript target: ≤ 80 kB gzip, excluding analytics explicitly approved later.
- Hero media target: ≤ 350 kB total on mobile and ≤ 700 kB on desktop after optimization.

These are project budgets. A justified exception must be recorded in the decision log.

## Engineering quality

- Strict TypeScript passes with no ignored production errors.
- Lint, formatting check, production build and browser smoke tests pass in CI.
- Repeated UI/content is data-driven or componentized without sacrificing server-rendered HTML.
- Components have clear ownership and do not hardcode viewport-specific magic numbers without documentation.
- There are no console errors, missing assets or broken internal links in the production build.
- Supported baseline: current and previous major versions of Chrome, Safari, Firefox and Edge.

## Content and provenance

- Clearly legible screenshot content is preserved unless intentionally rewritten.
- Unreadable small copy is reviewed before launch; OCR guesses are not treated as approved copy.
- Every shipped image, icon and font has recorded provenance and permission to use.
- Contact details, legal links and calls to action are verified before production deployment.

## Definition of done

The page is done only when the production build passes automated checks, target viewports have been visually reviewed, keyboard/reduced-motion flows have been manually checked, and all launch-blocking unknowns in the source-of-truth documents are resolved or explicitly accepted.

