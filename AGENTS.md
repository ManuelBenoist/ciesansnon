# AGENTS.md — La Cie Sans Non

Stack : Nuxt 4 (SSG) · Tailwind CSS · Nuxt Content v3 · Formspree · motion-v · GitHub Actions → GitHub Pages

## Commands
```bash
npm run dev        # dev server on localhost:3000
npm run generate   # static export → .output/public/
npm run build      # build (not needed for SSG)
npm run preview    # preview production build locally
```

## Key architectural facts
- Nuxt 4 with `future: { compatibilityVersion: 4 }` — `app/` directory as app root
- SSG mode: `nitro.preset: 'static'` — no server routes
- Dark theme: `scene-black (#0c0c0c)` background, `scene-light (#e8e2d9)` text
- Custom colors via `scene-*` Tailwind palette (`scene-brick` gold accent, `scene-rouge` badges)
- Fonts auto-hosted via @fontsource (no Google Fonts calls)
- Animations: CSS transitions + motion-v (plugin at `app/plugins/motion.client.ts`)
- Icons: @nuxt/icon (Iconify) — use `<Icon name="mdi:instagram" />`
- Form: Formspree AJAX via `useFormspree` composable (set `NUXT_PUBLIC_FORMSPREE_ID` in `.env`)
- SEO: `useSeo()` composable wraps useSeoMeta + useHead (french lang, OG, Twitter card)
- Logo (`logo_csn.webp`) is dark on dark bg → `brightness-[1.6]` in AppHeader/AppFooter/AppNav. Remove filter if logo is replaced.

## Content collections (`content.config.ts`)
- This file is **mandatory** for `queryCollection` `where()`/`order()` on custom fields
- `creations` has a full zod schema → all YAML fields are queryable SQL columns
- `membres` and `actus` have **NO schema** (`type: 'page'` only). Add a zod schema before using `where()`/`order()` on custom fields
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
- Root cause: `definePageMeta` macro + a functional `key` conflicts with Vue’s out-in transition, preventing the incoming page component from mounting.
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

The `public/.nojekyll` file prevents GitHub Pages from processing the site with Jekyll.

**Custom domain**: `https://ciesansnon.com` — configure in repo Settings > Pages, or add a CNAME record to your DNS provider pointing to `ciesansnon.github.io`.

## Current gaps & next steps
1. `content/membres/*.md` files exist but need `bio:` body content and `photo:` paths filled
2. `content/creations/simple.md` body content (synopsis) is placeholder — VENAVI is complete
