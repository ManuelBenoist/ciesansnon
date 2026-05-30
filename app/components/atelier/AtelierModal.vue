<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
    <div class="relative aspect-[2/3] overflow-hidden rounded-sm">
      <NuxtImg
        :src="atelier.affiche"
        :alt="`Affiche : ${atelier.titre}`"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col space-y-6">
      <div>
        <h3 class="font-display text-2xl sm:text-3xl text-scene-cream mb-3">
          {{ atelier.titre }}
        </h3>
        <p v-if="atelier.accroche" class="font-body text-base text-scene-brick/80 italic">
          {{ atelier.accroche }}
        </p>
      </div>
      <div class="font-body text-scene-light/80 text-sm space-y-1">
        <p><strong class="text-scene-cream">Date :</strong> {{ atelier.date }}</p>
        <p><strong class="text-scene-cream">Lieu :</strong> {{ atelier.lieu }}</p>
        <p><strong class="text-scene-cream">Ville :</strong> {{ atelier.ville }}</p>
        <p><strong class="text-scene-cream">Entrée :</strong> {{ atelier.type_entree }}</p>
      </div>
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
      <template v-if="atelier.galerie && atelier.galerie.length">
        <div class="w-12 h-px bg-[#2a2a2a]" />
      </template>
    </div>
  </div>
  <template v-if="atelier.galerie && atelier.galerie.length">
    <div class="mt-8 grid grid-cols-2 gap-4">
      <button
        v-for="(img, k) in atelier.galerie"
        :key="k"
        class="relative aspect-[4/3] overflow-hidden rounded-sm"
        @click="openLightbox(k)"
      >
        <NuxtImg
          :src="img"
          alt=""
          class="absolute inset-0 w-full h-full object-cover hover:opacity-80 transition-opacity"
          loading="lazy"
        />
      </button>
    </div>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  atelier: {
    titre: string
    slug: string
    annee: number
    lieu: string
    ville: string
    date: string
    type_entree: string
    affiche: string
    accroche?: string
    description?: string
    ordre: number
    galerie?: string[]
  }
}>()

const lightboxImages = ref<string[]>([])
const lightboxIndex = ref(0)

function openLightbox(index: number) {
  lightboxImages.value = props.atelier.galerie || []
  lightboxIndex.value = index
}

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
