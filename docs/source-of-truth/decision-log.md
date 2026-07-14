# Decision log

## Status values

- `proposed`: selected for planning, not yet validated in implementation.
- `accepted`: validated and used as the project baseline.
- `superseded`: replaced by a later decision.

## Decisions

| ID | Status | Decision | Reason | Revisit when |
|---|---|---|---|---|
| D-001 | proposed | Calibrate against a 1440 px desktop viewport. | Source dimensions are consistent with a high-DPR desktop capture, but viewport metadata is absent. | Browser comparison shows systematic scale mismatch. |
| D-002 | superseded | Use Astro + strict TypeScript and ship static HTML. | Superseded by D-009 when the Sites production baseline was selected. | — |
| D-003 | proposed | Use scoped CSS and shared custom-property tokens. | Keeps the visual system explicit and portable for a one-page reconstruction. | A broader product design system is introduced. |
| D-004 | proposed | Use native progressive-enhancement motion first. | The required motion is light and does not yet justify a large runtime library. | Choreography becomes too complex or native browser behavior diverges. |
| D-005 | proposed | Reconstruct the hero with layered images, SVG and DOM elements. | Best tradeoff for fidelity, performance and responsiveness from a flattened source. | Genuine interactive 3D becomes a requirement. |
| D-006 | proposed | Treat small illegible text as unapproved draft content. | Prevents OCR or visual guesses from becoming false factual claims. | Approved copy is supplied. |
| D-007 | proposed | Use a system Chinese font stack initially. | Original font and license are unknown; this avoids blocking and font-loading cost. | An approved brand font is supplied. |
| D-008 | accepted | Treat section slices as reproducible derived evidence, never as independent primary sources. | Crops improve section-level work but contain no information beyond the original screenshot. | A new higher-authority source or original design file is supplied. |
| D-009 | accepted | Use the Sites Vinext/React production baseline and render semantic HTML. | Matches the available deployment runtime while retaining typed components, server rendering and progressive enhancement. | Delivery moves to a hosting environment that cannot run the Sites output. |
| D-010 | accepted | Treat `reference/agent-core-primary.png` as the scoped primary source for the central 3D artwork, and treat the transparent PNG, animated WebP and MP4 as derivatives. | The user supplied a higher-detail source specifically to correct the artwork; scoped authority preserves the original full-page screenshot for layout while preventing generated derivatives from becoming circular evidence. | A licensed original 3D model or higher-authority design file is supplied. |

## Open questions / launch blockers

These do not block the structural prototype, but they block a truthful production launch:

1. Final approved Chinese marketing copy and exact product naming.
2. Ownership or replacement rights for the logo, hero artwork, case-study image and book covers.
3. Real CTA destinations, contact details and legal URLs.
4. Required analytics, consent and privacy behavior.
5. Hosting environment and deployment constraints.
