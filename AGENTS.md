# AGENTS.md — La Cie Sans Non

Stack : Nuxt 4 (SSG) · Tailwind CSS · Nuxt Content v3 · Formspree · motion-v · GitHub Actions → GitHub Pages

## Commands
```bash
npm run dev        # dev server on localhost:3000
npm run generate   # static export → .output/public/ (production build)
npm run preview    # preview production build locally
```
- There is no `test` or `lint` script. Verify changes by running `npm run generate`.

## Architecture
- Nuxt 4 with `future: { compatibilityVersion: 4 }` — `app/` is the app root.
- Pure SSG: `nitro.preset: 'static'`. **No server routes or API endpoints.**
- `nitro.prerender.failOnError: false` — build succeeds even if some routes 404.
- Light theme default: `html` background `#f5f0e8`, text `#0c0c0c`. No `dark` class.
- Tailwind palette: `scene-black`, `scene-dark`, `scene-surface`, `scene-light`, `scene-cream`, `scene-brick`, `scene-navy`, `scene-rouge`, `scene-yellow`.
- Fonts: self-hosted via `@fontsource/*` (Cormorant Garamond, DM Sans, Nunito Sans). No Google Fonts requests.
- Icons: `@nuxt/icon` (Iconify) — `<Icon name="mdi:instagram" />`.
- Animation: CSS transitions + `motion-v` (client plugin at `app/plugins/motion.client.ts`).
- SEO: `useSeo()` composable wraps `useSeoMeta` + `useHead` (French locale, OG, Twitter card).
- Formspree: `useFormspree()` composable. Requires `NUXT_PUBLIC_FORMSPREE_ID` in `.env`.
- Logo (`logo_csn.webp`) is dark → always placed inside a black block (`bg-black`) with `brightness-[1.6]` to make it visible on light backgrounds.

## Content collections (`content.config.ts`)
- **Mandatory** for `queryCollection` `where()` / `order()` on custom fields.
- Current collections with full Zod schema: `creations`, `membres`, `ateliers_creation`, `ateliers`.
- `actus` exists in the config but has **no schema** (`type: 'page'` only) and currently has **no markdown files**. Add a schema before filtering on custom fields.
- Use `type: 'data'` for non-page content (no auto `path` field).
- Always wrap queries in `await useAsyncData('key', () => queryCollection(...).all())` inside page `<script setup>`.

## Navigation gotchas (CRITICAL)

### 1. Single root node for page transitions
Every page under `<NuxtPage>` must render a **single DOM element as its root**. Nuxt uses `pageTransition: { name: 'page', mode: 'out-in' }`. Multiple roots, conditional roots (`v-if`/`v-else` on elements at top level), or `<template>` fragments break the transition.
- **Symptom**: leaving a dynamic page (`/creations/[slug]`) shows only header/footer; console warns about non-element root nodes.
- **Fix**: wrap the entire `<template>` in one `<div>`, even with internal `v-if`/`v-else`.

### 2. Never use `definePageMeta({ key: route => route.fullPath })` on dynamic pages
This breaks client-side navigation combined with `pageTransition: { mode: 'out-in' }`.
- **Fix**: remove that `definePageMeta`. Make `useAsyncData` reactive by passing a **function** as the key:
  ```ts
  const { data: creation } = await useAsyncData(
    () => `creation-${route.params.slug}`,
    () => queryCollection('creations').where('slug', '==', route.params.slug).first()
  )
  ```

## Conventions
- YAML frontmatter: `snake_case`. Vue props: `camelCase`.
- All images use `<NuxtImg>` (no CSS `background-image`). Photos live in `public/images/`.
- Component naming: directory-prefixed multi-word, e.g. `compagnie/MembreCard.vue`, `spectacle/Card.vue`.

## Deployment (GitHub Pages)
- Workflow: `.github/workflows/deploy.yml` runs `npm run generate` on every push to `main`.
- Output directory: `.output/public/`.
- `public/.nojekyll` prevents GitHub Pages from running Jekyll.
- Custom domain: `ciesansnon.com`.
