<template>
  <section class="py-24 sm:py-32 bg-scene-dark">
    <div class="max-w-7xl mx-auto px-6">
      <div
        ref="headerTarget"
        :class="['reveal-fade-up reveal-visible flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12']"
      >
        <div>
          <p class="font-body text-xs uppercase tracking-[0.3em] text-scene-gold mb-3">
            Nos créations
          </p>
          <h2 class="font-display text-display-lg text-scene-cream">
            À l'affiche
          </h2>
        </div>
        <UiButton
          label="Toutes les créations"
          variant="ghost"
          size="sm"
          to="/creations"
        >
          <template #icon-after>
            <Icon name="mdi:arrow-right" size="16" />
          </template>
        </UiButton>
      </div>

      <div v-if="!creations?.length" class="text-center py-10">
        <p class="font-body text-scene-muted text-sm">Aucune création pour le moment.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
