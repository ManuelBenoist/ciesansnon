<template>
  <div v-if="hasData" class="py-16 sm:py-20 bg-scene-black">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="font-display font-semibold text-display-lg text-scene-cream mb-10">
        Distribution & équipe
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 class="font-body text-xs uppercase tracking-[0.3em] text-scene-brick mb-6">
            Distribution
          </h3>

          <div v-if="miseEnScene" class="mb-5">
            <p class="font-body text-sm text-scene-muted uppercase tracking-wider mb-0.5">
              Mise en scène
            </p>
            <p class="font-display text-xl text-scene-light">{{ miseEnScene }}</p>
          </div>

          <div v-if="auteur" class="mb-5">
            <p class="font-body text-sm text-scene-muted uppercase tracking-wider mb-0.5">
              Auteur
            </p>
            <p class="font-display text-xl text-scene-light">{{ auteur }}</p>
          </div>

          <div v-for="m in casting" :key="m.nom" class="mb-4">
            <p class="font-body text-sm text-scene-muted uppercase tracking-wider mb-0.5">{{ m.role }}</p>
            <p class="font-display text-lg text-scene-light">{{ m.nom }}</p>
          </div>
        </div>

        <div v-if="equipeTechnique?.length">
          <h3 class="font-body text-xs uppercase tracking-[0.3em] text-scene-brick mb-6">
            Équipe technique
          </h3>

          <div v-for="m in equipeTechnique" :key="m.poste" class="mb-4">
            <p class="font-body text-sm text-scene-muted uppercase tracking-wider mb-0.5">{{ m.poste }}</p>
            <p class="font-display text-lg text-scene-light">{{ m.nom }}</p>
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
</script>
