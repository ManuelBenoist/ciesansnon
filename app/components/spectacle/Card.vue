<template>
  <NuxtLink
    :to="`/creations/${slug}`"
    class="group relative block aspect-[3/4] overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm transition-colors duration-500 hover:border-scene-brick"
  >
    <NuxtImg
      :src="image"
      :alt="`Affiche du spectacle ${titre}`"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-80"
      loading="lazy"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-scene-black via-scene-black/20 to-transparent" />

    <div class="absolute top-4 left-4 z-10">
      <UiTag :label="statusLabel" :color="statusColor" />
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-5 z-10">
      <h3 class="font-display text-2xl sm:text-3xl text-scene-cream mb-1">
        {{ titre }}
      </h3>
      <p class="font-body text-base text-scene-light/70 line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
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

const statusMap: Record<string, { label: string; color: 'brick' | 'navy' | 'muted' }> = {
  'en-creation': { label: 'En création', color: 'brick' },
  'en-tournee': { label: 'En tournée', color: 'navy' },
  'archive': { label: 'Archive', color: 'muted' },
}

const statusLabel = computed(() => statusMap[props.statut]?.label ?? props.statut)
const statusColor = computed(() => statusMap[props.statut]?.color ?? 'muted')
</script>
