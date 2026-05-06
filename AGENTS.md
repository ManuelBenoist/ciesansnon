# AGENTS.md — La Cie Sans Non

Stack : Nuxt 4 (SSG) · Tailwind CSS · Nuxt Content v3 · Formspree · motion-v · GitHub Actions → OVH

## Commands
```bash
npm run dev        # dev server on localhost:3000
npm run generate   # static export → .output/public/
npm run build      # build (not needed for SSG)
npm run preview    # preview production build locally
```

## Project structure (deviations from plan.md)
- `components/contact/Form.vue` (plan: `ContactForm.vue`)
- `components/spectacle/Card.vue` (plan: `CardSpectacle.vue`)
- `plugins/motion.client.ts` (plan: `scroll-reveal.client.ts`)
- `<NuxtImg>` migration done — all images use `<NuxtImg>` with `data-nuxt-img`, no more CSS `background-image`
- Logo (`logo_csn.webp`) has dark colors on dark background → uses `brightness-[1.6]` filter in header/footer/nav. If a new logo is provided, remove the `brightness-[1.6]` class from `AppHeader`, `AppFooter`, `AppNav`.
- `content.config.ts` is required for Nuxt Content v3 collections (without it, `queryCollection` can't `where`/`order` on custom fields)
- Content collections use `type: 'page'` + `zod` schema so custom YAML fields become queryable SQL columns

## Phases status (plan.md reference)
- Phase 1 (foundations): 100% — complete
- Phase 2 (UI components): 90% — all exist, naming differs slightly
- Phase 3 (static pages): 85% — HomeActus & OrganigrammeSection missing
- Phase 4 (dynamic creations): 70% — index.vue + [slug].vue done, all 5 spectacle components built, VENAVI content complete with photos, Simple has placeholder content
- Phase 5 (finish/deploy): ~70% — robots.txt + OG image done, a11y audit + fixes applied, NuxtImg migration done, Formspree + responsive tested

## Key architectural facts
- Nuxt 4 with `future: { compatibilityVersion: 4 }` — app/ directory as app root
- SSG mode: `nitro.preset: 'static'` — no server routes
- Dark theme: `scene-black (#0c0c0c)` background, `scene-light (#e8e2d9)` text
- Custom colors via `scene-*` Tailwind palette (gold accent, rouge badges)
- Fonts auto-hosted via @fontsource (no Google Fonts calls)
- Content: Nuxt Content v3, Markdown with YAML frontmatter in `content/`
- Animations: CSS transitions + motion-v (NOT Framer Motion)
- Icons: @nuxt/icon (Iconify) — use e.g. `<Icon name="mdi:instagram" />`
- Form: Formspree AJAX via `useFormspree` composable (runtimeConfig `formspreeId`)
- SEO: `useSeo()` composable wraps useSeoMeta + useHead (french lang, OG, Twitter card)

## Current gaps
1. Fill `content/creations/simple.md` body content (synopsis, notes) — VENAVI is already complete
2. Fill `content/membres/*.md` body content (biographies)
3. Add photos to `public/images/membres/` — VENAVI photos already in place
4. Create `.github/workflows/deploy.yml` for OVH FTP deployment
5. Lighthouse Performance score can be improved (try: preload hero image, reduce SQLite WASM from bundle, inline critical CSS)

## Nuxt Content v3 querying rules
- `content.config.ts` with `type: 'page'` + `zod` schema is required for `queryCollection` to support `where()`/`order()` on custom YAML fields
- Without schema, custom fields go into `meta` JSON column and are NOT queryable via `where`/`order`
- Always await inside `useAsyncData` for SSR: `await useAsyncData('key', () => queryCollection(...).all())`
- Use `type: 'data'` for non-page structured content (no auto `path` field generated)
