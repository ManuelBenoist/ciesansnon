<template>
  <section class="relative min-h-[60vh] sm:min-h-[70vh] flex items-end bg-scene-black overflow-hidden">
    <NuxtImg
      v-if="image"
      :src="image"
      :alt="alt || titre"
      class="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-scene-black via-scene-black/60 to-transparent" />

    <div class="relative z-10 max-w-7xl mx-auto px-6 pb-12 sm:pb-16 w-full">
      <nav class="font-body text-xs uppercase tracking-widest text-scene-muted mb-4">
        <NuxtLink to="/" class="hover:text-scene-gold transition-colors">Accueil</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/creations" class="hover:text-scene-gold transition-colors">Créations</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-scene-light/60">{{ titre }}</span>
      </nav>

      <h1 class="font-display text-display-xl sm:text-display-2xl text-scene-cream">
        {{ titre }}
      </h1>

      <div class="flex gap-4 mt-3 font-body text-sm text-scene-muted">
        <span v-if="annee">{{ annee }}</span>
        <span v-if="annee && duree" class="text-scene-border">|</span>
        <span v-if="duree">{{ duree }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  titre: string
  image?: string
  annee?: number | string
  duree?: string
  alt?: string
}>()
</script>
