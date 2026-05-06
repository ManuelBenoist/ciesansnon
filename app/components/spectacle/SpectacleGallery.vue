<template>
  <div v-if="images?.length" class="py-16 sm:py-20 bg-scene-dark">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="font-display text-display-lg text-scene-cream mb-10">
        Galerie
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          v-for="(img, i) in images"
          :key="i"
          class="relative aspect-[4/3] rounded-sm overflow-hidden hover:opacity-85 transition-opacity"
          @click="openGallery(i)"
          :aria-label="`Photo ${i + 1}`"
        >
          <NuxtImg
            :src="img"
            :alt="`Photo ${i + 1}`"
            class="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      </div>

      <UiLightbox
        v-model="lightboxOpen"
        :images="images"
        :initial-index="currentIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  images: string[]
}>()

const lightboxOpen = ref(false)
const currentIndex = ref(0)

function openGallery(index: number) {
  currentIndex.value = index
  lightboxOpen.value = true
}
</script>
