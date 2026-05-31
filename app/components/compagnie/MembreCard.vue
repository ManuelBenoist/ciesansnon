<template>
  <button
    class="group block w-full text-left"
    @click="$emit('select', slug)"
  >
    <div v-if="photo" class="relative aspect-[3/4] overflow-hidden mb-4">
      <NuxtImg
        :src="photo"
        :alt="`Portrait de ${nom}`"
        class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-scene-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
    </div>
    <div v-else class="relative aspect-[3/4] overflow-hidden mb-4 bg-scene-surface flex items-center justify-center rounded-sm group-hover:bg-scene-border transition-colors duration-500">
      <Icon name="mdi:account-outline" size="48" class="text-scene-muted/30 group-hover:text-scene-muted/50 transition-colors duration-500" />
    </div>
    <h3 class="font-display text-xl text-scene-cream group-hover:text-scene-brick transition-colors">
      {{ nom }}
    </h3>
    <p class="font-body text-xs uppercase tracking-widest text-scene-brick/70 mt-1.5">
      {{ roleCourt.replace(/-/g, ' ') }}
    </p>
    <p v-if="formation" class="font-body text-[11px] text-scene-brick/80 mt-1 leading-snug">
      {{ formation }}
    </p>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  nom: string
  roleCourt: string
  photo: string
  slug: string
  formation?: string
}>()

defineEmits<{
  select: [slug: string]
}>()
</script>
