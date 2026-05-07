<template>
  <div v-if="dates?.length" class="py-16 sm:py-20 bg-scene-black">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="font-display font-semibold text-display-lg text-scene-cream mb-10">
        Dates
      </h2>

      <div class="space-y-6 max-w-3xl">
        <div
          v-for="d in dates"
          :key="d.lieu + d.debut"
          class="border-b border-scene-border pb-6 last:border-b-0 last:pb-0"
        >
          <p class="font-display text-xl text-scene-cream">{{ d.lieu }}</p>

          <p class="font-body text-sm text-scene-muted mt-1">
            {{ d.ville }}
          </p>

          <p class="font-body text-sm text-scene-muted mt-1">
            {{ formatDate(d.debut) }}
            <template v-if="d.fin"> — {{ formatDate(d.fin) }}</template>
          </p>

          <a
            v-if="d.lien_billetterie"
            :href="d.lien_billetterie"
            target="_blank"
            rel="noopener"
            class="inline-block mt-3 font-body text-xs uppercase tracking-widest text-scene-brick hover:text-scene-cream transition-colors"
          >
            Billetterie →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DateEntry {
  lieu: string
  ville: string
  debut: string
  fin?: string | null
  lien_billetterie?: string
}

defineProps<{
  dates: DateEntry[]
}>()

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>
