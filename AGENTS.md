# AGENTS.md — La Cie Sans Non

Stack : Nuxt 4 (SSG) · Tailwind CSS · Nuxt Content v3 · Formspree · motion-v · GitHub Actions → GitHub Pages

## Commands
```bash
npm run dev        # dev server on localhost:3000
npm run generate   # static export → .output/public/ (commande de vérité)
npm run preview    # preview production build locally
```

## Key architectural facts
- Nuxt 4 with `future: { compatibilityVersion: 4 }` — `app/` directory as app root
- SSG mode: `nitro.preset: 'github-pages'` — no server routes, optimised for GitHub Pages
- Dark theme: `scene-black (#0c0c0c)` background, `scene-light (#e8e2d9)` text
- Custom colors via `scene-*` Tailwind palette (`scene-brick` gold accent, `scene-rouge` badges)
- Fonts auto-hosted via @fontsource (no Google Fonts calls)
- Animations: CSS transitions + motion-v (plugin at `app/plugins/motion.client.ts`)
- Icons: @nuxt/icon (Iconify) — use `<Icon name="mdi:instagram" />`
- Form: Formspree AJAX via `useFormspree` composable (set `NUXT_PUBLIC_FORMSPREE_ID` in `.env`)
- SEO: `useSeo()` composable wraps useSeoMeta + useHead (french lang, OG, Twitter card). Import `safeJsonLd` from `app/utils/safeJsonLd.ts` for JSON-LD script tags.
- Logo (`logo_csn.webp`) is dark on dark bg → `brightness-[1.6]` in AppHeader/AppFooter/AppNav. Remove filter if logo is replaced.

## Content collections (`content.config.ts`)
- This file is **mandatory** for `queryCollection` `where()`/`order()` on custom fields
- `creations`, `membres`, `ateliers`, `ateliers_creation` have full zod schemas → all YAML fields are queryable SQL columns
- Use `type: 'data'` for non-page content (no auto `path` field generated)
- Always `await useAsyncData('key', () => queryCollection(...).all())` inside page `<script setup>`

## Navigation gotchas (CRITICAL)

### 1. Single root node for page transitions
**Every page under `<NuxtPage>` must render a single DOM element as its root.**
- Nuxt uses `pageTransition: { name: 'page', mode: 'out-in' }` by default.
- Vue `<Transition mode="out-in">` requires exactly one element root to animate. Multiple roots, conditional roots (`v-if`/`v-else` on elements at the top level), or `<template>` fragments break the transition.
- **Symptom**: leaving a dynamic page (`/creations/[slug]`) shows only header/footer; console warnings:
  - `[Vue warn]: Component inside <Transition> renders non-element root node that cannot be animated.`
  - `[nuxt] ... does not have a single root node and will cause errors when navigating between routes.`
- **Fix**: wrap the entire page template in one `<div>`, even when using `v-if`/`v-else` internally:
  ```vue
  <template>
    <div>
      <div v-if="!data">Loading...</div>
      <template v-else>
        ...
      </template>
    </div>
  </template>
  ```

### 2. Never use `definePageMeta({ key: route => route.fullPath })` on dynamic pages
- This breaks client-side navigation when combined with `pageTransition: { mode: 'out-in' }`.
- Root cause: `definePageMeta` macro + a functional `key` conflicts with Vue's out-in transition, preventing the incoming page component from mounting.
- **Fix**: remove `definePageMeta({ key: ... })`. For dynamic data, make `useAsyncData` reactive by passing a **function** as the key:
  ```ts
  const { data: creation } = await useAsyncData(
    () => `creation-${route.params.slug}`,
    () => queryCollection('creations').where('slug', '==', route.params.slug).first()
  )
  ```
  This forces a re-fetch when the slug changes without destroying the page transition.

## Conventions
- YAML frontmatter: `snake_case` (e.g. `role_compagnie`, `role_court`). Vue props: `camelCase` (e.g. `roleCourt`)
- All images use `<NuxtImg>` (no CSS `background-image`). Place photos in `public/images/`
- Component naming: directory-prefixed multi-word, e.g. `compagnie/MembreCard.vue`, `spectacle/Card.vue`
- No lint or test commands configured. Verify with `npm run generate`.

## Deployment (GitHub Pages)

The site is deployed via GitHub Actions to GitHub Pages. The workflow at `.github/workflows/deploy.yml`:
1. Checks out the repo
2. Sets up Node.js
3. Installs dependencies
4. Runs `npm run generate` → outputs to `.output/public/`
5. Uploads the artifact
6. Deploys to GitHub Pages

### Current config (temporary — no custom domain yet)
- `nitro.preset: 'github-pages'` — optimised for GH Pages (SPA fallback, 404 handling)
- `app.baseURL: '/ciesansnon/'` — required because the repo lives under a user/org path (`manuelbenoist.github.io/ciesansnon/`)
- `site.url: 'https://ciesansnon.com'` — kept so OG tags, canonical links and JSON-LD are already correct for the future domain

**Temporary URL**: `https://manuelbenoist.github.io/ciesansnon/`

The `public/.nojekyll` file prevents GitHub Pages from processing the site with Jekyll.

### Post-migration (once `ciesansnon.com` points to GH Pages)
1. Remove `app.baseURL` entirely from `nuxt.config.ts`
2. Optionally switch `nitro.preset` back to `'static'` (github-pages preset still works on a custom domain, but static is cleaner)
3. Regenerate and redeploy — no other changes needed

## Pre-deployment checklist (SEO & integrity)
Before merging to `main` or deploying, run these checks:
- [ ] `npm run generate` passes without errors
- [ ] `.output/public/sitemap.xml` exists and contains all routes
- [ ] Every page calls `useSeo()` (title, description, canonical, OG tags)
- [ ] JSON-LD is valid on key pages (home, compagnie, spectacle, contact)
- [ ] Images referenced in `content/` files exist in `public/images/`
- [ ] No accidental `noindex` on public pages
- [ ] `robots.txt` is present in `public/`
- [ ] Formspree ID is set in environment for production

## Dead code to avoid re-creating
- `app/components/spectacle/SpectacleGallery.vue` and `app/components/ui/UiLightbox.vue` were removed as unused. If you need a gallery, re-implement from scratch rather than restoring stale code.
- Collection `actus` was removed from `content.config.ts` and `content/actus/` — it was defined but never queried in the app.
