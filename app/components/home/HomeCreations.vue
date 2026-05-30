<template>
  <section class="py-20 sm:py-28 bg-white border-b-4 border-black">
    <div class="max-w-7xl mx-auto px-6">
      <div
        ref="headerTarget"
        :class="['reveal-fade-up reveal-visible flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14']"
      >
        <div>
          <span class="inline-block font-body text-xs font-bold uppercase tracking-[0.3em] text-black bg-scene-yellow border-2 border-black px-3 py-1 mb-4">
            Nos créations
          </span>
          <h2 class="font-display font-bold text-display-lg text-black">
            À l'affiche
          </h2>
        </div>
        <UiButton
          label="Toutes les créations"
          variant="outline"
          size="sm"
          to="/creations"
        >
          <template #icon-after>
            <Icon name="mdi:arrow-right" size="16" />
          </template>
        </UiButton>
      </div>

      <div v-if="!creations?.length" class="text-center py-10">
        <p class="font-body text-black/60 text-sm">Aucune création pour le moment.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <div
          v-for="(creation, index) in creations"
          :key="creation.slug"
          ref="cardRefs"
          :class="['reveal-fade-up reveal-visible']"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <SpectacleCard
            :titre="creation.titre"
            :slug="creation.slug"
            :statut="creation.statut"
            :image="creation.image_affiche || `https://picsum.photos/seed/${creation.slug}/800/1067`"
            :accroche="creation.accroche || ''"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: creations } = await useAsyncData('home-creations', () =>
  queryCollection('creations').where('featured', '==', true).order('ordre', 'ASC').all()
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
