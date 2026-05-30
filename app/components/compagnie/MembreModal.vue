<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
    <div class="relative aspect-[3/4] overflow-hidden rounded-sm">
      <NuxtImg
        :src="photo"
        :alt="`Portrait de ${nom}`"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col justify-center">
      <h3 class="font-display text-3xl sm:text-4xl text-scene-cream mb-2">
        {{ nom }}
      </h3>
      <p class="font-body text-base text-scene-brick mb-6">
        {{ role }}
      </p>
      <div class="w-12 h-px bg-[#2a2a2a] mb-6" />
      <div class="font-body text-scene-light/80 leading-relaxed text-sm space-y-4">
        <template v-if="bio">
          <div v-for="(block, i) in parsedBio" :key="i">
            <p v-if="block.type === 'p'" class="text-scene-light/80">{{ block.content }}</p>
            <ul v-else class="list-disc list-inside space-y-1 text-scene-light/70">
              <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
            </ul>
          </div>
        </template>
        <p v-else class="text-scene-muted italic">Biographie à venir.</p>
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

const parsedBio = computed(() => {
  if (!props.bio) return []
  const blocks: { type: 'p' | 'ul'; content?: string; items?: string[] }[] = []
  const paragraphs = props.bio.split('\n\n')
  for (const para of paragraphs) {
    const lines = para.split('\n').filter(l => l.trim())
    if (lines.length === 0) continue
    const allListItems = lines.every(l => l.trim().startsWith('- '))
    if (allListItems) {
      blocks.push({ type: 'ul', items: lines.map(l => l.trim().slice(2).trim()) })
    } else {
      blocks.push({ type: 'p', content: lines.join(' ') })
    }
  }
  return blocks
})
</script>
