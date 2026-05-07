<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
    <div class="relative aspect-[3/4] overflow-hidden rounded-sm">
      <NuxtImg
        :src="photo"
        :alt="`Portrait de ${nom}`"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col justify-center">
      <h3 class="font-display text-3xl sm:text-4xl text-scene-cream mb-2">
        {{ nom }}
      </h3>
      <p class="font-body text-base text-scene-brick mb-6">
        {{ role }}
      </p>
      <div class="w-12 h-px bg-[#2a2a2a] mb-6" />
      <div class="font-body text-scene-light/80 leading-relaxed text-sm space-y-4">
        <p v-if="bio">{{ bio }}</p>
        <p v-else class="text-scene-muted italic">Biographie à venir.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  nom: string
  role: string
  photo: string
  bio?: string
}>()
</script>
