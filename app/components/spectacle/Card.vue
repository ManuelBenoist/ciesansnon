<template>
  <NuxtLink
    :to="`/creations/${slug}`"
    class="group block bg-white border-4 border-black hover:bg-scene-yellow transition-colors duration-200"
  >
    <div class="relative border-b-4 border-black overflow-hidden aspect-[4/3]">
      <NuxtImg
        :src="image"
        :alt="`Affiche du spectacle ${titre}`"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute top-3 right-3">
        <UiTag :label="statusLabel" :color="statusColor" />
      </div>
    </div>

    <div class="p-4 sm:p-5">
      <h3 class="font-display font-bold text-xl sm:text-2xl text-black mb-2">
        {{ titre }}
      </h3>
      <p class="font-body text-sm text-black/80 line-clamp-2">
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

const statusMap: Record<string, { label: string; color: 'brick' | 'navy' | 'muted' | 'yellow' }> = {
  'en-creation': { label: 'En création', color: 'yellow' },
  'en-tournee': { label: 'En tournée', color: 'brick' },
  'archive': { label: 'Archive', color: 'navy' },
}

const statusLabel = computed(() => statusMap[props.statut]?.label ?? props.statut)
const statusColor = computed(() => statusMap[props.statut]?.color ?? 'muted')
</script>
