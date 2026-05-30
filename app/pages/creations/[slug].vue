<template>
  <div>
    <div v-if="!creation" class="py-24 text-center bg-scene-black min-h-screen">
      <p class="font-body text-scene-muted">Création introuvable.</p>
    </div>

    <template v-else>
      <SpectacleHero
        :titre="creation.titre"
        :image="creation.image_hero || `https://picsum.photos/seed/${creation.slug}/1600/900`"
        :annee="creation.annee"
        :duree="creation.duree"
        :alt="creation.alt_hero"
      />

      <section class="py-16 sm:py-20 bg-scene-black">
        <div class="max-w-7xl mx-auto px-6">
          <ContentRenderer :value="creation">
            <template #empty>
              <p class="font-body text-scene-muted italic leading-relaxed">
                Note d'intention à venir.
              </p>
            </template>
          </ContentRenderer>
        </div>
      </section>

      <SpectacleCarousel
        :images="creation.galerie || []"
      />

      <SpectacleCasting
        :mise-en-scene="creation.mise_en_scene"
        :auteur="creation.auteur"
        :casting="creation.casting"
        :equipe-technique="creation.equipe_technique"
      />

      <SpectacleVideo :src="creation.video_url" />

      <SpectacleDates
        :dates="creation.dates || []"
      />

      <SpectacleNav
        :prev="prev"
        :next="next"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: creation } = await useAsyncData(() => 'creation-' + route.params.slug, () =>
  queryCollection('creations').where('slug', '==', route.params.slug).first()
)

const { data: allCreations } = await useAsyncData('creations-all', () =>
  queryCollection('creations').order('ordre', 'ASC').all()
)

const currentIndex = computed(() =>
  allCreations.value?.findIndex((c: any) => c.slug === route.params.slug) ?? -1
)

const prev = computed(() => {
  if (!allCreations.value || currentIndex.value <= 0) return null
  return allCreations.value[currentIndex.value - 1]
})

const next = computed(() => {
  if (!allCreations.value || currentIndex.value < 0 || currentIndex.value >= allCreations.value.length - 1) return null
  return allCreations.value[currentIndex.value + 1]
})

useSeo({
  title: creation.value?.seo_title || creation.value?.titre || 'Création',
  description: creation.value?.seo_description || creation.value?.accroche || '',
  type: 'article',
})

const jsonLd = computed(() => {
  if (!creation.value) return null
  const c = creation.value as any
  const ld: Record<string, any>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: c.titre,
      description: c.seo_description || c.accroche || '',
      dateCreated: c.annee?.toString(),
    },
  ]
  if (c.dates?.length) {
    c.dates.forEach((d: any) => {
      ld.push({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: c.titre,
        startDate: d.debut,
        endDate: d.fin || d.debut,
        location: {
          '@type': 'Place',
          name: d.lieu,
          address: d.ville,
        },
      })
    })
  }
  return ld.length === 1 ? ld[0] : ld
})

const breadcrumbLd = computed(() => {
  if (!creation.value) return null
  const c = creation.value as any
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://ciesansnon.com/' },
      { '@type': 'ListItem', position: 2, name: 'Créations', item: 'https://ciesansnon.com/creations' },
      { '@type': 'ListItem', position: 3, name: c.titre, item: `https://ciesansnon.com/creations/${c.slug}` },
    ],
  }
})

function safeJsonLd(obj: any) {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}

useHead(() => ({
  script: [
    ...(jsonLd.value ? [{ type: 'application/ld+json', innerHTML: safeJsonLd(jsonLd.value) }] : []),
    ...(breadcrumbLd.value ? [{ type: 'application/ld+json', innerHTML: safeJsonLd(breadcrumbLd.value) }] : []),
  ],
}))
</script>
