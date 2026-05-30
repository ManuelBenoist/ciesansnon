<template>
  <div v-if="dates?.length" class="py-16 sm:py-20 bg-scene-yellow border-b-4 border-black">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="font-display font-bold text-display-lg text-black mb-10 inline-block bg-black text-white px-3 py-1">
        Dates
      </h2>

      <div class="space-y-6 max-w-3xl">
        <div
          v-for="d in dates"
          :key="d.lieu + d.debut"
          class="border-b-2 border-black pb-6 last:border-b-0 last:pb-0"
        >
          <p class="font-display text-xl text-black font-bold">{{ d.lieu }}</p>

          <p class="font-body text-sm text-black/70 mt-1">
            {{ d.ville }}
          </p>

          <p class="font-body text-sm text-black/70 mt-1">
            {{ formatDate(d.debut) }}
            <template v-if="d.fin"> — {{ formatDate(d.fin) }}</template>
          </p>

          <a
            v-if="d.lien_billetterie"
            :href="d.lien_billetterie"
            target="_blank"
            rel="noopener"
            class="inline-block mt-3 font-body text-xs font-bold uppercase tracking-widest border-2 border-black bg-white px-3 py-1 hover:bg-black hover:text-white transition-colors"
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
