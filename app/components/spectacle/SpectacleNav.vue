<template>
  <div class="py-12 sm:py-16 bg-scene-black border-t border-scene-border">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex justify-between items-start gap-6">
        <NuxtLink
          v-if="prev"
          :to="`/creations/${prev.slug}`"
          class="group flex items-center gap-3 font-body text-sm text-scene-muted hover:text-scene-gold transition-colors"
        >
          <Icon name="mdi:chevron-left" size="24" class="shrink-0" />
          <span>
            <span class="block text-xs uppercase tracking-wider text-scene-muted/60">Précédent</span>
            <span class="block font-display text-lg text-scene-light group-hover:text-scene-gold transition-colors mt-0.5">
              {{ prev.titre }}
            </span>
          </span>
        </NuxtLink>

        <div v-else />

        <NuxtLink
          v-if="next"
          :to="`/creations/${next.slug}`"
          class="group flex items-center gap-3 font-body text-sm text-scene-muted hover:text-scene-gold transition-colors text-right"
        >
          <span>
            <span class="block text-xs uppercase tracking-wider text-scene-muted/60">Suivant</span>
            <span class="block font-display text-lg text-scene-light group-hover:text-scene-gold transition-colors mt-0.5">
              {{ next.titre }}
            </span>
          </span>
          <Icon name="mdi:chevron-right" size="24" class="shrink-0" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NavItem {
  titre: string
  slug: string
}

defineProps<{
  prev?: NavItem | null
  next?: NavItem | null
}>()
</script>
