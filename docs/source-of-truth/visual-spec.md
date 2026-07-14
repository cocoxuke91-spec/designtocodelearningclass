# Visual specification

## 1. Source frame

- **Measured**: PNG, 2876 × 8752 px, RGB, 8 bits per channel.
- **Measured**: aspect ratio is approximately 0.329.
- **Derived**: the image is consistent with a roughly 1438 CSS-pixel-wide desktop capture at device-pixel ratio 2, but DPR and viewport are unknown.
- **Decision**: use a 1440 px desktop artboard as the calibration viewport and a 1200–1280 px centered content container. Adjust after browser screenshot comparison.

## 2. Page anatomy

The following order is **observed**:

1. Floating rounded navigation bar.
2. Hero with left-aligned copy and CTA buttons, plus a right-side 3D-style product object surrounded by orbit lines and agent labels.
3. Four primary metric cards.
4. “Four black boxes” problem statement with four cards.
5. Multi-agent architecture section: diagram on the left, five-layer explanation on the right.
6. Five intelligent-module cards.
7. Real-project case study with a large development image, KPI cards and a horizontal project timeline.
8. Whitepaper/resources panel with a featured book and three supporting cards.
9. Wide CTA banner with a city illustration.
10. Multi-column footer.

The matching crop rectangles are recorded in `slice-manifest.json`. Those section boundaries are **derived** navigation aids, not evidence that the original DOM used identical section boundaries.

## 3. Content inventory

### Clearly legible content

- Brand: `Pmagic AI`.
- Hero heading: `建工领域专属的超级工程大脑`.
- Hero CTAs: `预约演示`, `查看多 Agent 架构`.
- Hero agent labels include procurement, cost, BIM and enterprise WeChat collaboration.
- Primary metrics include `26h`, `2.1%`, `月→天`, and `40%`.
- Problem cards: `进度黑箱`, `材料黑箱`, `成本黑箱`, `协同黑箱`.
- Architecture layers: `数据矩阵层`, `智能分析层`, `Agent 编排层`, `业务执行层`, `审计管控层`.
- Module categories include procurement, bid collaboration, finance, enterprise WeChat AI Agent and BIM.
- Resource section heading: `浏览建工 AI 白皮书`.
- Closing CTA heading: `让你的项目进入智能管理时代`.

### Copy requiring verification

Small paragraph copy, the exact case-study project name, individual bullet descriptions, footer links, contact details and legal links are not reliably recoverable at normal reading scale. They are **unknown**, not approved copy.

**Decision**: preserve clearly legible headings and figures. Use marked draft copy for small text until it is reviewed, rather than presenting OCR guesses as factual content.

## 4. Layout facts

- **Observed**: the page uses a pale cool-white background with subtle blue/lilac glows.
- **Observed**: nearly every content group is inside a white or translucent rounded panel.
- **Observed**: vertical rhythm is spacious; section headings are centered except in the hero, case-study body and CTA.
- **Observed**: cards use low-contrast borders and diffuse blue-gray shadows.
- **Observed**: desktop layouts rely on four-column, five-column and two-column grids.
- **Observed**: the hero and architecture sections use asymmetric two-column layouts.
- **Decision**: implement with CSS Grid and Flexbox; no absolute positioning for primary document flow.
- **Decision**: reserve absolute positioning for decorative orbit lines, badges, glows and layered hero artwork.

## 5. Initial design tokens

These values are **implementation decisions** sampled by visual comparison, not original design tokens:

```css
:root {
  --page-bg: #f7f9ff;
  --surface: rgba(255, 255, 255, 0.88);
  --surface-solid: #ffffff;
  --text-strong: #11182b;
  --text-muted: #66718b;
  --primary: #635bff;
  --secondary: #29a8ff;
  --border-subtle: rgba(82, 103, 172, 0.12);
  --shadow-card: 0 18px 52px rgba(62, 83, 151, 0.09);
  --radius-card: 20px;
  --radius-pill: 999px;
  --content-max: 1240px;
}
```

Token values must be calibrated against side-by-side screenshots before being considered stable.

## 6. Typography

- **Observed**: typography resembles a modern Chinese grotesk/sans-serif with strong black hero headings.
- **Unknown**: original font family, weights and tracking.
- **Decision**: start with `Inter`, `PingFang SC`, `Microsoft YaHei`, system sans-serif fallbacks. A self-hosted font may be added only when licensing and performance are understood.
- **Decision**: use fluid typography with `clamp()` and preserve readable Chinese line lengths.

## 7. Responsive interpretation

Responsive behavior is not present in the single desktop screenshot and is therefore a **decision**:

- Large desktop: 12-column container; hero and architecture remain two-column.
- Tablet: two-column sections narrow; five-card sections become 2–3 columns.
- Mobile: primary sections become one column; hero copy precedes artwork; navigation becomes a keyboard-accessible disclosure menu.
- Mobile decorative labels may be reduced or repositioned, but core content may not be hidden.
- Cards must reflow rather than scale as raster groups.

Target checks: 360, 390, 768, 1024, 1280 and 1440 CSS px.

## 8. Asset reconstruction policy

- UI icons: redraw as SVG or use one consistent, licensed icon family.
- **Observed from scoped primary source**: `reference/agent-core-primary.png` defines the hero mark and pedestal geometry, arm order, colors, glossy bevels, transparent acrylic materials, proportions and shared camera angle.
- **Decision**: use `public/assets/agent-core-transparent-v2.png` as the production still and `public/assets/agent-core-loop-v2.webp` as the transparent looping website animation.
- **Decision**: `public/assets/agent-core-loop-v2.mp4` is a portable derivative with a pale page-matched background; it is not independent visual evidence.
- The white source background, Dreamina AI watermark, AI badge and source orbit graphics are excluded from production assets.
- Case-study image and book covers: use derived placeholders clearly recorded as replacements until approved assets exist.
- Do not crop pieces from the screenshot and present them as production assets except for a documented temporary prototype.
- Every non-original asset must have a provenance/license entry before launch.

## 9. Motion specification

Motion is absent from the static source, so all motion is a **decision**:

- Hero: 600–800 ms staged entrance; the scoped primary artwork floats approximately 11 px and rocks approximately ±1.6° over a six-second seamless loop.
- Orbit: three subtle elliptical paths with independently phased moving particles; decorative only and ignored by assistive technology.
- The eight-arm artwork and its pedestal move as one rendered object so their camera angle and perspective cannot drift apart.
- Viewport reveal: opacity plus 20–32 px translation; once per section.
- Metric numbers: count only once and never delay access to the final value.
- Cards: hover/focus elevation of no more than 6 px.
- Timeline: draw left-to-right when it enters the viewport.
- Respect `prefers-reduced-motion`; remove continuous and parallax movement.
- Avoid scroll hijacking, essential hover-only content, and motion that changes layout.
