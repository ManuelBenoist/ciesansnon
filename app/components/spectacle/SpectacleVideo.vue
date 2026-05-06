<template>
  <div v-if="src" class="py-16 sm:py-20 bg-scene-dark">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="font-display text-display-lg text-scene-cream mb-10">
        Teaser
      </h2>
      <div class="relative aspect-video overflow-hidden rounded-sm bg-scene-black">
        <video
          :src="src"
          class="absolute inset-0 w-full h-full"
          controls
          preload="metadata"
          playsinline
        >
          <p class="font-body text-scene-muted text-sm p-4">
            Votre navigateur ne peut pas lire cette vidéo.
          </p>
        </video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>
