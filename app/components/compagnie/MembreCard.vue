<template>
  <button
    class="group block w-full text-left"
    @click="$emit('select', slug)"
  >
    <div v-if="photo" class="relative aspect-[3/4] overflow-hidden mb-3 border-4 border-black">
      <NuxtImg
        :src="photo"
        :alt="`Portrait de ${nom}`"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div v-else class="relative aspect-[3/4] overflow-hidden mb-3 border-4 border-black bg-scene-yellow flex items-center justify-center">
      <Icon name="mdi:account-outline" size="48" class="text-black/30" />
    </div>
    <h3 class="font-display text-xl text-black group-hover:bg-scene-yellow inline-block transition-colors px-1 -mx-1">
      {{ nom }}
    </h3>
    <p class="font-body text-xs font-bold uppercase tracking-widest text-scene-rouge mt-1">
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
