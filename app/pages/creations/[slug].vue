<template>
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
      <div class="max-w-4xl mx-auto px-6">
        <ContentRenderer :value="creation">
          <template #empty>
            <p class="font-body text-scene-muted italic leading-relaxed">
              Note d'intention à venir.
            </p>
          </template>
        </ContentRenderer>
      </div>
    </section>

    <SpectacleCasting
      :mise-en-scene="creation.mise_en_scene"
      :auteur="creation.auteur"
      :casting="creation.casting"
      :equipe-technique="creation.equipe_technique"
    />

    <SpectacleGallery
      :images="creation.galerie || []"
    />

    <SpectacleDates
      :dates="creation.dates || []"
    />

    <SpectacleNav
      :prev="prev"
      :next="next"
    />
  </template>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: creation } = await useAsyncData(`creation-${slug}`, () =>
  queryCollection('creations').where('slug', '==', slug).first()
)

const { data: allCreations } = await useAsyncData('creations-all', () =>
  queryCollection('creations').order('ordre', 'ASC').all()
)

const currentIndex = computed(() =>
  allCreations.value?.findIndex((c: any) => c.slug === slug) ?? -1
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

useHead({
  script: jsonLd.value
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonLd.value),
        },
      ]
    : [],
})
</script>
