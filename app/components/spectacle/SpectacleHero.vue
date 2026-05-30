<template>
  <section class="border-b-4 border-black">
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="relative aspect-[16/9] lg:aspect-auto lg:min-h-[50vh] border-b-4 lg:border-b-0 lg:border-r-4 border-black overflow-hidden">
        <NuxtImg
          v-if="image"
          :src="image"
          :alt="alt || titre"
          class="w-full h-full object-cover"
          loading="eager"
          width="1600"
          height="900"
        />
      </div>

      <div class="bg-scene-rouge flex flex-col justify-end p-8 sm:p-12 lg:p-16">
        <nav class="font-body text-xs uppercase tracking-widest text-white/70 mb-4">
          <NuxtLink to="/" class="hover:underline">Accueil</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/creations" class="hover:underline">Créations</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-white/50">{{ titre }}</span>
        </nav>

        <h1 class="font-display font-bold text-display-xl sm:text-display-2xl text-white">
          {{ titre }}
        </h1>

        <div class="flex gap-4 mt-3 font-body text-sm text-white/80">
          <span v-if="annee">{{ annee }}</span>
          <span v-if="annee && duree" class="text-white/40">|</span>
          <span v-if="duree">{{ duree }}</span>
        </div>
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
