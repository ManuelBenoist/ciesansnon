<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
    <template v-if="photo">
      <div class="relative aspect-[3/4] overflow-hidden border-4 border-black">
        <NuxtImg
          :src="photo"
          :alt="`Portrait de ${nom}`"
          class="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </template>
    <div v-else class="aspect-[3/4] bg-scene-yellow flex items-center justify-center border-4 border-black">
      <Icon name="mdi:account-outline" size="64" class="text-black/30" />
    </div>
    <div class="flex flex-col justify-center">
      <h3 class="font-display text-3xl sm:text-4xl text-black mb-2">
        {{ nom }}
      </h3>
      <p class="font-body text-base text-scene-rouge font-bold mb-6">
        {{ role }}
      </p>
      <div class="bg-black h-0.5 w-12 mb-6" />
      <div class="font-body text-black/80 leading-relaxed text-sm space-y-4">
        <template v-if="bio">
          <div v-for="(block, i) in parsedBio" :key="i">
            <p v-if="block.type === 'p'" class="text-black/80" v-html="block.content" />
            <ul v-else class="list-disc list-inside space-y-1 text-black/70">
              <li v-for="(item, j) in block.items" :key="j" v-html="item"></li>
            </ul>
          </div>
        </template>
        <p v-else class="text-black/50 italic">Biographie à venir.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  nom: string
  role: string
  photo: string
  bio?: string
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

const parsedBio = computed(() => {
  if (!props.bio) return []
  const blocks: { type: 'p' | 'ul'; content?: string; items?: string[] }[] = []
  const paragraphs = props.bio.split('\n\n')
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
