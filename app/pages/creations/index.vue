<template>
  <section class="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-white min-h-screen px-6">
    <div class="max-w-7xl mx-auto">
      <div ref="headerTarget" :class="['reveal-fade-up reveal-visible mb-12 sm:mb-16']">
        <span class="inline-block font-body text-xs font-bold uppercase tracking-[0.3em] text-white bg-black px-3 py-1 mb-4">
          Spectacles
        </span>
        <h1 class="font-display font-bold text-display-xl text-black">
          Créations
        </h1>
      </div>

      <div v-if="!creations?.length" class="text-center py-20">
        <p class="font-body text-black/60">Aucune création pour le moment.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <div
          v-for="(c, index) in creations"
          :key="c.slug"
          ref="cardRefs"
          :class="['reveal-fade-up reveal-visible']"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <SpectacleCard
            :titre="c.titre"
            :slug="c.slug"
            :statut="c.statut"
            :image="c.image_affiche || `https://picsum.photos/seed/${c.slug}/800/1067`"
            :accroche="c.accroche || ''"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeo({
  title: 'Créations',
  description: 'Découvrez les créations théâtrales de la Compagnie Sans Non.',
})

const { data: creations } = await useAsyncData('creations-list', () =>
  queryCollection('creations').order('ordre', 'ASC').all()
)

const { target: headerTarget } = useRevealOnScroll()

const cardRefs = ref<HTMLElement[]>([])

onMounted(() => {
  setTimeout(() => {
    cardRefs.value.forEach((el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top >= window.innerHeight || rect.bottom <= 0) {
        el.classList.remove('reveal-visible')
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              el.classList.add('reveal-visible')
              stop()
            }
          },
          { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
        )
      }
    })
  }, 100)
})
</script>
