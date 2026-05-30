<template>
  <div v-if="images?.length" class="bg-white border-b-4 border-black">
    <div class="relative overflow-hidden">
      <div class="relative h-[60vh] sm:h-[70vh] border-b-4 border-black">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="absolute inset-0 w-full h-full p-4 sm:p-6 flex items-center justify-center transition-opacity duration-700"
          :class="i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        >
          <div class="w-full h-full border-4 border-black overflow-hidden">
            <NuxtImg
              :src="img"
              :alt="`Photo ${i + 1}`"
              class="w-full h-full object-contain sm:object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <button
          class="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 border-2 border-black bg-white hover:bg-scene-yellow transition-colors p-2"
          @click="prev"
          aria-label="Photo précédente"
        >
          <Icon name="mdi:chevron-left" size="32" />
        </button>

        <button
          class="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 border-2 border-black bg-white hover:bg-scene-yellow transition-colors p-2"
          @click="next"
          aria-label="Photo suivante"
        >
          <Icon name="mdi:chevron-right" size="32" />
        </button>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          <button
            v-for="(_, i) in images"
            :key="i"
            class="w-4 h-2 border-2 border-black transition-colors"
            :class="i === current ? 'bg-scene-rouge' : 'bg-white hover:bg-scene-yellow'"
            @click="goTo(i)"
            :aria-label="`Photo ${i + 1}`"
          />
        </div>

        <div class="absolute bottom-6 right-6 z-10 font-body text-xs text-black font-bold">
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
