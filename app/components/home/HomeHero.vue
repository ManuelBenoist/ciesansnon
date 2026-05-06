<template>
  <section class="relative h-screen min-h-[80svh] flex items-center justify-center overflow-hidden">
    <div
      ref="heroImageRef"
      class="absolute inset-0 bg-cover bg-center scale-105"
      :style="{ backgroundImage: `url('${image}')` }"
      role="img"
      aria-label="Scène de spectacle — La Cie Sans Non"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-scene-black via-scene-black/40 to-transparent" />

    <div
      class="absolute inset-0"
      :style="{ boxShadow: `inset 0 0 150px 60px rgba(12,12,12,${vignetteStrength})` }"
    />

    <div class="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
      style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;); background-size: 200px 200px;"
    />

    <div class="relative z-10 text-center px-6 max-w-5xl">
      <p class="font-body text-xs sm:text-sm uppercase tracking-[0.35em] text-scene-gold mb-6">
        {{ baseline }}
      </p>
      <h1 class="font-display text-display-2xl text-scene-cream leading-none mb-8">
        La Cie Sans Non
      </h1>
      <p class="font-body text-scene-light/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
        {{ description }}
      </p>
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
      <div class="scroll-indicator" />
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  image?: string
  baseline?: string
  description?: string
  vignetteStrength?: number
}>(), {
  image: 'https://picsum.photos/seed/ciesansnon-hero/1920/1080',
  baseline: 'Compagnie de théâtre',
  description: 'Des mots, des corps, des silences — un théâtre qui ne dit jamais non à la vie.',
  vignetteStrength: 0.6,
})

const heroImageRef = ref<HTMLElement | null>(null)

const { y } = useWindowScroll()
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

watch(y, (scrollY) => {
  if (prefersReducedMotion.value || !heroImageRef.value) return
  const offset = scrollY * 0.25
  heroImageRef.value.style.transform = `translateY(${offset}px) scale(1.05)`
})
</script>

<style scoped>
.scroll-indicator {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, transparent, rgba(201, 168, 76, 0.5));
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
  50% { opacity: 1; transform: scaleY(1); }
}
</style>
