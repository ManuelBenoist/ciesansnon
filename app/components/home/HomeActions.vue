<template>
  <section class="bg-scene-navy border-y-4 border-black">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
      <!-- Bloc texte -->
      <div
        ref="target"
        :class="['reveal-fade-up reveal-visible order-2 lg:order-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16']"
      >
        <span class="inline-block font-body text-xs font-bold uppercase tracking-[0.3em] text-black bg-scene-yellow border-2 border-black px-3 py-1 mb-6 w-fit">
          Engagement
        </span>
        <h2 class="font-display font-bold text-display-lg text-white mb-6">
          Actions culturelles
        </h2>
        <div class="font-body text-white/90 text-base leading-relaxed space-y-4 mb-8">
          <p>
            Année après année, la compagnie Sans Non mène des ateliers de pratique artistique en direction des publics jeunes vivant en quartier prioritaire.
          </p>
          <p class="text-white/70">
            Jeu, chant, danse, acrobatie : les projets, accessibles à tous, ont permis d'initier aux arts de la scène des centaines de jeunes de 11 à 25 ans en les fédérant autour d'un spectacle musical sur un thème qui touche notre humanité commune.
          </p>
        </div>
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

      <!-- Bloc image -->
      <div class="order-1 lg:order-2 border-b-4 lg:border-b-0 lg:border-l-4 border-black">
        <div class="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
          <NuxtImg
            src="/images/actions-culturelles.webp"
            alt="Action culturelle — La Cie Sans Non"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { target } = useRevealOnScroll()
</script>
