<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
    <div class="relative aspect-[16/9] overflow-hidden border-4 border-black bg-white flex items-center justify-center">
      <NuxtImg
        v-if="atelier.image"
        :src="atelier.image"
        :alt="atelier.titre"
        class="absolute inset-0 w-full h-full object-contain"
        loading="lazy"
      />
      <div v-else class="flex items-center justify-center h-full">
        <Icon name="mdi:image-outline" class="text-black/30" size="48" />
      </div>
    </div>
    <div class="flex flex-col space-y-6">
      <h3 class="font-display text-2xl sm:text-3xl text-black">
        {{ atelier.titre }}
      </h3>
      <template v-if="atelier.description">
        <div class="bg-black h-0.5 w-12" />
        <div class="font-body text-black/80 leading-relaxed text-sm space-y-3">
          <div v-for="(block, i) in parsedDescription" :key="i">
            <p v-if="block.type === 'p'" class="text-black/80" v-html="block.content" />
            <ul v-else class="list-disc list-inside space-y-1 text-black/70">
              <li v-for="(item, j) in block.items" :key="j" v-html="item"></li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
  <template v-if="atelier.galerie && atelier.galerie.length">
    <div class="mt-8 grid grid-cols-2 gap-4">
      <div
        v-for="(img, k) in atelier.galerie"
        :key="k"
        class="relative aspect-[16/9] overflow-hidden border-2 border-black bg-white"
      >
        <NuxtImg
          :src="img"
          alt=""
          class="absolute inset-0 w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  </template>
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
