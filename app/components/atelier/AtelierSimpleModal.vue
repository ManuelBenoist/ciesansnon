<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
    <div class="relative aspect-[16/9] overflow-hidden rounded-sm bg-scene-surface">
      <NuxtImg
        v-if="atelier.image"
        :src="atelier.image"
        :alt="atelier.titre"
        class="absolute inset-0 w-full h-full object-contain"
        loading="lazy"
      />
      <div v-else class="flex items-center justify-center h-full">
        <Icon name="mdi:image-outline" class="text-scene-muted" size="48" />
      </div>
    </div>
    <div class="flex flex-col space-y-6">
      <h3 class="font-display text-2xl sm:text-3xl text-scene-cream">
        {{ atelier.titre }}
      </h3>
      <template v-if="atelier.description">
        <div class="w-12 h-px bg-[#2a2a2a]" />
        <div class="font-body text-scene-light/80 leading-relaxed text-sm space-y-3">
          <div v-for="(block, i) in parsedDescription" :key="i">
            <p v-if="block.type === 'p'" class="text-scene-light/80" v-html="block.content" />
            <ul v-else class="list-disc list-inside space-y-1 text-scene-light/70">
              <li v-for="(item, j) in block.items" :key="j" v-html="item"></li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
  <template v-if="atelier.galerie && atelier.galerie.length">
    <div class="mt-8 grid grid-cols-2 gap-4">
      <button
        v-for="(img, k) in atelier.galerie"
        :key="k"
        class="relative aspect-[16/9] overflow-hidden rounded-sm bg-scene-surface"
        @click="openLightbox(img)"
      >
        <NuxtImg
          :src="img"
          alt=""
          class="absolute inset-0 w-full h-full object-contain hover:opacity-80 transition-opacity"
          loading="lazy"
        />
      </button>
    </div>
  </template>

  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="lightboxImage"
        class="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8"
        @click.self="lightboxImage = null"
      >
        <div class="absolute inset-0 bg-scene-black/90" />
        <button
          class="absolute top-6 right-6 z-10 text-scene-muted hover:text-scene-cream transition-colors p-3"
          @click="lightboxImage = null"
          aria-label="Fermer"
        >
          <Icon name="mdi:close" size="28" />
        </button>
        <img
          :src="lightboxImage"
          class="relative z-10 max-w-full max-h-full object-contain select-none"
          alt=""
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  atelier: {
    titre: string
    slug: string
    image: string
    description?: string
    galerie?: string[]
  }
}>()

const lightboxImage = ref<string | null>(null)

function openLightbox(img: string) {
  lightboxImage.value = img
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && lightboxImage.value) {
    lightboxImage.value = null
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatInline(text: string): string {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

const parsedDescription = computed(() => {
  if (!props.atelier.description) return []
  const blocks: { type: 'p' | 'ul'; content?: string; items?: string[] }[] = []
  const paragraphs = props.atelier.description.split('\n\n')
  for (const para of paragraphs) {
    const lines = para.split('\n').filter(l => l.trim())
    if (lines.length === 0) continue
    const allListItems = lines.every(l => l.trim().startsWith('- '))
    if (allListItems) {
      blocks.push({ type: 'ul', items: lines.map(l => formatInline(l.trim().slice(2).trim())) })
    } else {
      blocks.push({ type: 'p', content: formatInline(lines.join(' ')) })
    }
  }
  return blocks
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 250ms ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
