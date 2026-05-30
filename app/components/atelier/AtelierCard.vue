<template>
  <button
    class="group block w-full text-left"
    @click="$emit('select', slug)"
  >
    <div class="relative aspect-[2/3] overflow-hidden border-2 border-black">
      <NuxtImg
        :src="affiche"
        :alt="`Affiche : ${titre}`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
