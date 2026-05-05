<template>
  <section class="py-24 sm:py-32 bg-scene-black">
    <div class="max-w-7xl mx-auto px-6">
      <div
        ref="target"
        :class="['reveal-fade-up reveal-visible grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center']"
      >
        <div class="order-2 lg:order-1">
          <p class="font-body text-xs uppercase tracking-[0.3em] text-scene-gold mb-4">
            Engagement
          </p>
          <h2 class="font-display text-display-lg text-scene-cream mb-6">
            Actions culturelles
          </h2>
          <p class="font-body text-scene-light/80 text-base leading-relaxed mb-4">
            Aller vers tous les publics. La Cie Sans Non conçoit des projets de médiation culturelle 
            aux côtés des établissements scolaires, des structures spécialisées et des quartiers 
            prioritaires.
          </p>
          <p class="font-body text-scene-muted text-sm leading-relaxed mb-8">
            Ateliers de pratique artistique, rencontres avec les artistes, parcours de découverte — 
            chaque action est pensée sur mesure, dans la durée, avec la conviction que l'art de la 
            scène appartient à tout le monde.
          </p>
          <UiButton
            label="Découvrir nos actions"
            variant="outline"
            size="md"
            to="/actions-culturelles"
          >
            <template #icon-after>
              <Icon name="mdi:arrow-right" size="16" />
            </template>
          </UiButton>
        </div>

        <div class="order-1 lg:order-2">
          <div class="relative aspect-[4/5] overflow-hidden">
            <div
              class="absolute inset-0 bg-cover bg-center"
              style="background-image: url('https://picsum.photos/seed/action-culturelle/800/1000')"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-scene-black/30 to-transparent lg:from-transparent lg:to-scene-black/20" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { target } = useRevealOnScroll()
</script>
