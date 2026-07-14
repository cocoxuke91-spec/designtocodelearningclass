# Development Notes

## Working agreement

- Keep visual reference evidence in `docs/source-of-truth/reference/`.
- Keep generated production assets in `public/assets/` with descriptive, stable names.
- Prefer CSS and inline SVG for UI icons; use raster assets only for artwork, photos and illustrations.
- Respect `prefers-reduced-motion` when adding animation.
- Do not replace source-of-truth images; add derived assets and document their provenance instead.

## Current implementation map

- Metrics: transparent glass PNG assets in `public/assets/icons/metrics/`.
- Pain points, architecture layers and capability modules: inline SVG icons in `app/LandingPage.tsx`.
- Hero and architecture artwork: `public/assets/agent-core-loop-v2.webp`.
- Placeholder artwork still to replace: case study image, whitepaper covers and closing CTA illustration.
