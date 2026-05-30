<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      >
        <div class="absolute inset-0 bg-scene-black/85 backdrop-blur-sm" @click="close" />
        <div class="relative z-10 bg-scene-surface border border-scene-border rounded-sm w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl" @click.stop>
          <button
            class="absolute top-4 right-4 z-20 text-scene-light/70 hover:text-scene-cream transition-colors p-3"
            @click="close"
            aria-label="Fermer"
          >
            <Icon name="mdi:close" size="20" />
          </button>
          <div class="p-6 sm:p-8">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  if (props.modelValue) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<style scoped>
.modal-enter-active {
  transition: opacity 300ms ease;
}

.modal-enter-active > div:last-child {
  transition: transform 300ms ease, opacity 300ms ease;
}

.modal-leave-active {
  transition: opacity 200ms ease;
}

.modal-leave-active > div:last-child {
  transition: transform 200ms ease, opacity 200ms ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from > div:last-child {
  opacity: 0;
  transform: scale(0.95);
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to > div:last-child {
  opacity: 0;
  transform: scale(0.95);
}
</style>
