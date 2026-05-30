<template>
  <div v-if="hasData" class="py-16 sm:py-20 bg-white border-b-4 border-black">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="font-display font-bold text-display-lg text-black mb-10 inline-block bg-black text-white px-3 py-1">
        Distribution & équipe
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 class="font-body text-xs font-bold uppercase tracking-[0.3em] text-black mb-6 inline-block bg-scene-yellow border-2 border-black px-2 py-1">
            Distribution
          </h3>

          <div v-if="firstCasting" class="mb-4">
            <p class="font-body text-sm text-black/60 uppercase tracking-wider mb-0.5 font-bold">{{ firstCasting.role }}</p>
            <p class="font-display text-lg text-black">{{ firstCasting.nom }}</p>
          </div>

          <div v-if="miseEnScene" class="mb-5">
            <p class="font-body text-sm text-black/60 uppercase tracking-wider mb-0.5 font-bold">
              Mise en scène
            </p>
            <p class="font-display text-xl text-black">{{ miseEnScene }}</p>
          </div>

          <div v-if="auteur" class="mb-5">
            <p class="font-body text-sm text-black/60 uppercase tracking-wider mb-0.5 font-bold">
              Auteur
            </p>
            <p class="font-display text-xl text-black">{{ auteur }}</p>
          </div>

          <div v-for="m in restCasting" :key="m.nom" class="mb-4">
            <p class="font-body text-sm text-black/60 uppercase tracking-wider mb-0.5 font-bold">{{ m.role }}</p>
            <p class="font-display text-lg text-black">{{ m.nom }}</p>
          </div>
        </div>

        <div v-if="equipeTechnique?.length">
          <h3 class="font-body text-xs font-bold uppercase tracking-[0.3em] text-white mb-6 inline-block bg-scene-navy border-2 border-black px-2 py-1">
            Équipe technique
          </h3>

          <div v-for="m in equipeTechnique" :key="m.poste" class="mb-4">
            <p class="font-body text-sm text-black/60 uppercase tracking-wider mb-0.5 font-bold">{{ m.poste }}</p>
            <p class="font-display text-lg text-black">{{ m.nom }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CastingMember {
  nom: string
  role: string
}

interface TechMember {
  poste: string
  nom: string
}

const props = defineProps<{
  miseEnScene?: string
  auteur?: string
  casting?: CastingMember[]
  equipeTechnique?: TechMember[]
}>()

const hasData = computed(() =>
  props.miseEnScene || props.auteur || props.casting?.length || props.equipeTechnique?.length
)

const firstCasting = computed(() =>
  props.casting?.[0] ?? null
)

const restCasting = computed(() =>
  props.casting?.slice(1) ?? []
)
</script>
