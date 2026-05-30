<template>
  <button
    class="group block w-full text-left"
    @click="$emit('select', slug)"
  >
    <div class="relative aspect-[2/3] overflow-hidden rounded-sm">
      <NuxtImg
        :src="affiche"
        :alt="`Affiche : ${titre}`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-scene-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <p class="font-body text-xs text-scene-cream mt-2 truncate group-hover:text-scene-brick transition-colors">
      {{ titre }}
    </p>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  titre: string
  slug: string
  affiche: string
}>()

defineEmits<{
  select: [slug: string]
}>()
</script>
