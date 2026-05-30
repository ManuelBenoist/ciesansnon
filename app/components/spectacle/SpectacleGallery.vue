<template>
  <div v-if="images?.length" class="py-16 sm:py-20 bg-white border-b-4 border-black">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="font-display font-bold text-display-lg text-black mb-10 inline-block bg-black text-white px-3 py-1">
        Galerie
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          v-for="(img, i) in images"
          :key="i"
          class="relative aspect-[4/3] border-2 border-black overflow-hidden hover:bg-scene-yellow transition-colors"
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
