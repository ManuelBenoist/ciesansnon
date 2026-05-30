<template>
  <section class="border-b-4 border-black">
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <!-- Bloc image -->
      <div class="relative border-b-4 lg:border-b-0 lg:border-r-4 border-black aspect-[4/3] lg:aspect-auto lg:min-h-[60vh]">
        <NuxtImg
          :src="image"
          alt="Scène de spectacle — La Cie Sans Non"
          class="w-full h-full object-cover"
          loading="eager"
          width="1920"
          height="1080"
        />
      </div>

      <!-- Bloc rouge : titre -->
      <div class="bg-scene-rouge flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 text-center">
        <p class="font-body text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-white/90 mb-6">
          {{ baseline }}
        </p>
        <h1 class="font-display font-bold text-display-xl sm:text-display-2xl text-white mb-6">
          La Cie Sans Non
        </h1>
        <div class="w-16 h-1 bg-white" />
      </div>
    </div>

    <!-- Bandeau jaune -->
    <div class="bg-scene-yellow border-t-4 border-black px-6 py-8 sm:py-10">
      <div class="max-w-5xl mx-auto text-center">
        <p class="font-body text-base sm:text-lg font-bold text-black leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  image?: string
  baseline?: string
  description?: string
}>(), {
  image: '/images/hero-homepage.webp',
  baseline: 'Compagnie de théâtre',
  description: 'toucher l’imaginaire et les émotions d’un public qui ne fait pas forcément du théâtre une pratique culturelle habituelle',
})
</script>
