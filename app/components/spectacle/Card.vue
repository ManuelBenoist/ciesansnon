<template>
  <NuxtLink
    :to="`/creations/${slug}`"
    class="group relative block aspect-[3/4] overflow-hidden border-b-2 border-transparent hover:border-scene-gold transition-colors duration-500"
  >
    <div
      class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
      :style="{ backgroundImage: `url('${image}')` }"
      role="img"
      :aria-label="`Affiche du spectacle ${titre}`"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-scene-black via-scene-black/20 to-transparent" />

    <div class="absolute top-4 left-4 z-10">
      <UiTag :label="statusLabel" :color="statusColor" />
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-5 z-10">
      <h3 class="font-display text-2xl sm:text-3xl text-scene-cream mb-1">
        {{ titre }}
      </h3>
      <p class="font-body text-sm text-scene-light/70 line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        {{ accroche }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  titre: string
  slug: string
  statut: 'en-creation' | 'en-tournee' | 'archive'
  image: string
  accroche?: string
}>(), {
  accroche: '',
})

const statusMap: Record<string, { label: string; color: 'gold' | 'rouge' | 'muted' }> = {
  'en-creation': { label: 'En création', color: 'rouge' },
  'en-tournee': { label: 'En tournée', color: 'gold' },
  'archive': { label: 'Archive', color: 'muted' },
}

const statusLabel = computed(() => statusMap[props.statut]?.label ?? props.statut)
const statusColor = computed(() => statusMap[props.statut]?.color ?? 'muted')
</script>
