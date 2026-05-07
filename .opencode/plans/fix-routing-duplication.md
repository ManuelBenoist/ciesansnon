# Fix: page stacking/doubling + blank page on navigation

## Root causes

**Stacking/doubling bug** (introduced by previous fix):  
`<NuxtPage :key="$route.fullPath" />` forces NuxtPage to remount on every navigation. With `out-in` transition, old and new NuxtPage instances overlap → content doubled/tripled.

**Blank page bug** (original):  
`creations/[slug].vue` captures `const slug = route.params.slug as string` at setup time. Without `:key`, the component doesn't remount on slug change → stale data → empty slot.

## Fix: 2 files, 5 lines changed

### 1. `app/app.vue` — revert `:key`

```
<NuxtPage :key="$route.fullPath" />  →  <NuxtPage />
```

### 2. `app/pages/creations/[slug].vue` — reactive slug via useAsyncData `watch`

```diff
- const route = useRoute()
- const slug = route.params.slug as string
+ const route = useRoute()

- const { data: creation } = await useAsyncData(`creation-${slug}`, () =>
-   queryCollection('creations').where('slug', '==', slug).first()
- )
+ const { data: creation } = await useAsyncData('creation', () =>
+   queryCollection('creations').where('slug', '==', route.params.slug).first()
+ , { watch: [() => route.params.slug] })

  const { data: allCreations } = await useAsyncData('creations-all', () =>
    queryCollection('creations').order('ordre', 'ASC').all()
  )

  const currentIndex = computed(() =>
-   allCreations.value?.findIndex((c: any) => c.slug === slug) ?? -1
+   allCreations.value?.findIndex((c: any) => c.slug === route.params.slug) ?? -1
  )
```

### How it works

`useAsyncData` with `{ watch: [() => route.params.slug] }` tells Nuxt: re-run the query when `route.params.slug` changes (client-side navigation). Nuxt calls `refresh()` internally and updates the reactive `creation` ref. No component remount needed, no stacking, no stale data.

### Verification

1. Navigate between `/creations/venavi` and `/creations/simple` → content updates correctly
2. Navigate via header links → no blank page
3. Navigate via prev/next buttons → no stacking
4. Full page reload → first paint correct
