<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9998] bg-scene-black flex flex-col items-center justify-center"
        @click.self="close"
      >
        <button
          class="absolute top-6 right-6 z-20 text-scene-muted hover:text-scene-cream transition-colors p-3"
          @click="close"
          aria-label="Fermer"
        >
          <Icon name="mdi:close" size="24" />
        </button>

        <div class="absolute top-6 left-6 z-20 text-scene-muted text-sm font-body">
          {{ current + 1 }} / {{ images.length }}
        </div>

        <button
          v-if="images.length > 1"
          class="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-scene-muted hover:text-scene-cream transition-colors p-4"
          @click="prev"
          aria-label="Image précédente"
        >
          <Icon name="mdi:chevron-left" size="32" />
        </button>

        <button
          v-if="images.length > 1"
          class="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-scene-muted hover:text-scene-cream transition-colors p-4"
          @click="next"
          aria-label="Image suivante"
        >
          <Icon name="mdi:chevron-right" size="32" />
        </button>

        <div
          ref="containerRef"
          class="w-full h-full flex items-center justify-center p-4 sm:p-8 lg:p-16"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <img
            :key="images[current]"
            :src="images[current]"
            :alt="'Image ' + (current + 1)"
            class="max-w-full max-h-full object-contain animate-fade-in select-none"
            draggable="false"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  images: string[]
  modelValue: boolean
  initialIndex?: number
}>(), {
  initialIndex: 0,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed(() => props.modelValue)
const current = ref(props.initialIndex)
const containerRef = ref<HTMLElement | null>(null)

const { isSwiping, lengthX } = useSwipe(containerRef)

function next() {
  current.value = (current.value + 1) % props.images.length
}

function prev() {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  switch (e.key) {
    case 'Escape':
      close()
      break
    case 'ArrowRight':
      if (props.images.length > 1) next()
      break
    case 'ArrowLeft':
      if (props.images.length > 1) prev()
      break
  }
}

let touchStartX = 0

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e: TouchEvent) {
  const diff = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(diff) > 60) {
    if (diff < 0 && props.images.length > 1) next()
    else if (diff > 0 && props.images.length > 1) prev()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  if (props.modelValue) {
    document.body.style.overflow = 'hidden'
    current.value = props.initialIndex
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  if (val) {
    current.value = props.initialIndex
  }
})
</script>

<style scoped>
.lightbox-enter-active {
  transition: opacity 300ms ease;
}

.lightbox-leave-active {
  transition: opacity 200ms ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
