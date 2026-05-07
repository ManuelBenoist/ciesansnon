<template>
  <div v-if="src" class="py-16 sm:py-20 bg-scene-dark">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="font-display text-display-lg text-scene-cream mb-10">
        Teaser
      </h2>
      <div class="relative aspect-video overflow-hidden rounded-sm bg-scene-black">
        <iframe
          v-if="isYoutube"
          :src="embedUrl"
          class="absolute inset-0 w-full h-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <video
          v-else
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
const props = defineProps<{
  src?: string
}>()

const isYoutube = computed(() => {
  if (!props.src) return false
  return props.src.includes('youtu.be') || props.src.includes('youtube.com')
})

const embedUrl = computed(() => {
  if (!props.src) return ''
  if (props.src.includes('youtu.be')) {
    const id = props.src.split('/').pop()?.split('?')[0] || ''
    return `https://www.youtube.com/embed/${id}`
  }
  if (props.src.includes('youtube.com/watch')) {
    const url = new URL(props.src)
    const id = url.searchParams.get('v')
    return id ? `https://www.youtube.com/embed/${id}` : ''
  }
  return props.src
})
</script>
