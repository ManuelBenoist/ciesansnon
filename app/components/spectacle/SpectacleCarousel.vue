<template>
  <div v-if="images?.length" class="bg-scene-dark">
    <div class="relative overflow-hidden">
      <div class="relative h-[calc(100dvh-4rem)]">
        <NuxtImg
          v-for="(img, i) in images"
          :key="i"
          :src="img"
          :alt="`Photo ${i + 1}`"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          :class="i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'"
          loading="lazy"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-scene-black/40 to-transparent" />

        <button
          class="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-scene-light/60 hover:text-scene-cream transition-colors p-3"
          @click="prev"
          aria-label="Photo précédente"
        >
          <Icon name="mdi:chevron-left" size="32" />
        </button>

        <button
          class="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-scene-light/60 hover:text-scene-cream transition-colors p-3"
          @click="next"
          aria-label="Photo suivante"
        >
          <Icon name="mdi:chevron-right" size="32" />
        </button>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          <button
            v-for="(_, i) in images"
            :key="i"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="i === current ? 'bg-scene-brick w-5' : 'bg-scene-light/30 hover:bg-scene-light/50'"
            @click="goTo(i)"
            :aria-label="`Photo ${i + 1}`"
          />
        </div>

        <div class="absolute bottom-6 right-6 z-10 font-body text-xs text-scene-light/50">
          {{ current + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
}>()

const current = ref(0)
const isPaused = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

function next() {
  current.value = (current.value + 1) % props.images.length
}

function prev() {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}

function goTo(index: number) {
  current.value = index
}

function startAutoplay() {
  stopAutoplay()
  intervalId = setInterval(() => {
    if (!isPaused.value) next()
  }, 5000)
}

function stopAutoplay() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function onKeydown(e: KeyboardEvent) {
  if (!props.images?.length) return
  switch (e.key) {
    case 'ArrowRight':
      next()
      break
    case 'ArrowLeft':
      prev()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  startAutoplay()
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  stopAutoplay()
})
</script>
