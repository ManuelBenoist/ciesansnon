<template>
  <button
    class="group block w-full text-left"
    @click="$emit('select', slug)"
  >
    <div class="relative aspect-[16/9] overflow-hidden border-2 border-black bg-white">
      <NuxtImg
        :src="affiche"
        :alt="titre"
        class="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <p class="font-body text-xs text-black mt-2 truncate group-hover:bg-scene-yellow inline-block transition-colors px-1 -mx-1">
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
