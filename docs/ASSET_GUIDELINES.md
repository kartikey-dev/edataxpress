# Asset and image guidelines

## Logo

- Use `assets/edataxpress-logo-transparent.png` as a transparent logo asset.
- Prefer an owner-provided vector/SVG master or high-resolution transparent PNG if available.
- Preserve aspect ratio and original colours.
- Provide appropriate clear space and sufficient contrast.
- Do not convert the transparent logo to lossy WebP if transparency/edge quality is degraded.

## Photography and product imagery

- Use WebP for editorial photography, service imagery, product shots, thumbnails, and background imagery.
- Use descriptive, stable filenames: `digital-studio-interactive-panel-65.webp`.
- Avoid competitor product imagery unless licensed/authorized.
- Prefer original eDataXpress installation/product photos.
- If stock imagery is used, ensure the license allows commercial website use and record source/license.
- Never use AI-generated imagery as evidence of actual client installations, products, offices, or team members.

## Technical requirements

- Export responsive sizes appropriate to actual layout.
- Set intrinsic width/height or aspect ratio to prevent CLS.
- Use `sizes` accurately.
- Lazy-load below-the-fold imagery.
- Prioritize only the actual LCP image.
- Provide meaningful alt text; decorative images use `alt=""`.
- Keep source originals in a separate source folder if supplied; serve optimized derivatives.

## Suggested asset inventory

- Logo: transparent PNG/SVG.
- Home hero: editorial business/production image.
- Publication: books, reports, editorial production.
- Printing: print production, paper, finishing.
- Digital Studio: interactive display in a real classroom/training environment.
- Digital Marketing: campaign planning/content/analytics context.
- IFP 65: front, side, ports, touch use, room context, datasheet.

## Recorded third-party stock & open-license imagery

- `public/images/digital-studio-setup.webp`: Unsplash (`photo-1782406747464-86eb11cf931a`, Unsplash License — commercial use permitted without attribution).
- `public/images/digital-studio-interactive-panel-65.webp`: Wikimedia Commons (`File:ČBu, Faculty of Science, smartboard 2023 (01).jpg`, Creative Commons CC BY-SA 4.0). Replace with owner-supplied product photography once the exact model/SKU is confirmed.
