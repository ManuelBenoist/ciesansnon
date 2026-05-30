<template>
  <button
    class="group block w-full text-left"
    @click="$emit('select', slug)"
  >
    <div class="relative aspect-[16/9] overflow-hidden rounded-sm bg-scene-surface">
      <NuxtImg
        :src="affiche"
        :alt="titre"
        class="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
        loading="lazy"
      />
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
