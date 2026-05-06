<template>
  <button
    class="group block w-full text-left"
    @click="$emit('select', slug)"
  >
    <div class="relative aspect-[3/4] overflow-hidden mb-4">
      <NuxtImg
        :src="photo"
        :alt="`Portrait de ${nom}`"
        class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-scene-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
    </div>
    <h3 class="font-display text-xl text-scene-cream group-hover:text-scene-gold transition-colors">
      {{ nom }}
    </h3>
    <p class="font-body text-xs uppercase tracking-widest text-scene-gold/70 mt-1.5">
      {{ roleCourt }}
    </p>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  nom: string
  roleCourt: string
  photo: string
  slug: string
}>()

defineEmits<{
  select: [slug: string]
}>()
</script>
