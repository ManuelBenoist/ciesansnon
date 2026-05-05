<template>
  <div class="pt-24 pb-32">
    <section class="max-w-7xl mx-auto px-6 mb-24">
      <h2 class="font-display text-display-xl text-scene-cream mb-4">
        Kitchen Sink — Phase 2
      </h2>
      <p class="text-scene-muted text-lg max-w-2xl">
        Démonstration de la bibliothèque de composants UI, du design system et des animations. Palette <code class="text-scene-gold">scene-*</code>, ambiance scénique sombre.
      </p>
    </section>

    <!-- ─── UiButton ──────────────────────────────────────── -->
    <section class="max-w-7xl mx-auto px-6 mb-20">
      <h3 class="font-display text-3xl text-scene-cream mb-2">UiButton</h3>
      <p class="text-scene-muted text-sm mb-8">Variants : primary, ghost, outline. Tailles : sm, md, lg.</p>

      <div class="space-y-8">
        <div>
          <h4 class="text-xs uppercase tracking-widest text-scene-muted mb-4">variant = primary</h4>
          <div class="flex flex-wrap items-end gap-4">
            <UiButton label="CTA Principal" variant="primary" size="sm" />
            <UiButton label="CTA Principal" variant="primary" size="md" />
            <UiButton label="CTA Principal" variant="primary" size="lg" />
            <UiButton label="Désactivé" variant="primary" size="md" disabled />
          </div>
        </div>

        <div>
          <h4 class="text-xs uppercase tracking-widest text-scene-muted mb-4">variant = ghost</h4>
          <div class="flex flex-wrap items-end gap-4">
            <UiButton label="Lien Fantôme" variant="ghost" size="sm" />
            <UiButton label="Lien Fantôme" variant="ghost" size="md" />
            <UiButton label="Lien Fantôme" variant="ghost" size="lg" />
            <UiButton label="Router Link" variant="ghost" size="md" to="/" />
          </div>
        </div>

        <div>
          <h4 class="text-xs uppercase tracking-widest text-scene-muted mb-4">variant = outline</h4>
          <div class="flex flex-wrap items-end gap-4">
            <UiButton label="Bouton Outline" variant="outline" size="sm" />
            <UiButton label="Bouton Outline" variant="outline" size="md" />
            <UiButton label="Bouton Outline" variant="outline" size="lg" />
            <UiButton label="Avec icône" variant="outline" size="md">
              <template #icon-after>
                <Icon name="mdi:arrow-right" size="16" />
              </template>
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── UiTag ─────────────────────────────────────────── -->
    <section class="max-w-7xl mx-auto px-6 mb-20">
      <h3 class="font-display text-3xl text-scene-cream mb-2">UiTag</h3>
      <p class="text-scene-muted text-sm mb-8">Couleurs : gold (En tournée), rouge (En création), muted (Archive).</p>

      <div class="flex flex-wrap items-center gap-4">
        <UiTag label="En tournée" color="gold" />
        <UiTag label="En création" color="rouge" />
        <UiTag label="Archive" color="muted" />
      </div>
    </section>

    <!-- ─── UiModal ───────────────────────────────────────── -->
    <section class="max-w-7xl mx-auto px-6 mb-20">
      <h3 class="font-display text-3xl text-scene-cream mb-2">UiModal</h3>
      <p class="text-scene-muted text-sm mb-8">
        Teleporté dans <code class="text-scene-gold">&lt;body&gt;</code>. Fermeture : clic overlay, bouton croix, touche Escape. Transition scale + opacity.
      </p>

      <div class="flex flex-wrap gap-4">
        <UiButton label="Ouvrir la modale" variant="primary" @click="isModalOpen = true" />
      </div>

      <UiModal v-model="isModalOpen">
        <h3 class="font-display text-2xl text-scene-cream mb-4">Titre de la modale</h3>
        <p class="text-scene-light leading-relaxed mb-4">
          Cette modale est construite avec <code class="text-scene-gold">&lt;Teleport&gt;</code> pour garantir un affichage au-dessus de tout, avec un overlay <code class="text-scene-gold">backdrop-blur</code> en fond.
        </p>
        <p class="text-scene-muted text-sm leading-relaxed mb-6">
          La fermeture se fait au clic sur le fond, via la croix, ou avec la touche Escape. Le body est verrouillé pendant l'ouverture pour éviter le scroll en arrière-plan.
        </p>
        <div class="flex justify-end gap-3">
          <UiButton label="Annuler" variant="ghost" size="sm" @click="isModalOpen = false" />
          <UiButton label="Confirmer" variant="primary" size="sm" @click="isModalOpen = false" />
        </div>
      </UiModal>
    </section>

    <!-- ─── UiLightbox ────────────────────────────────────── -->
    <section class="max-w-7xl mx-auto px-6 mb-20">
      <h3 class="font-display text-3xl text-scene-cream mb-2">UiLightbox</h3>
      <p class="text-scene-muted text-sm mb-8">
        Galerie photos avec navigation clavier (← → Escape), swipe tactile, compteur X/N.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button
          v-for="(img, i) in demoImages"
          :key="img"
          class="aspect-[3/4] bg-scene-surface border border-scene-border hover:border-scene-gold transition-colors overflow-hidden rounded-sm group"
          @click="openLightbox(i)"
        >
          <img
            :src="img"
            :alt="`Demo ${i + 1}`"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </button>
      </div>

      <UiLightbox v-model="isLightboxOpen" :images="demoImages" :initial-index="lightboxIndex" />
    </section>

    <!-- ─── Animations fade-up ────────────────────────────── -->
    <section class="max-w-7xl mx-auto px-6 mb-20">
      <h3 class="font-display text-3xl text-scene-cream mb-2">Animations fade-up</h3>
      <p class="text-scene-muted text-sm mb-8">
        Deux approches : <code class="text-scene-gold">useRevealOnScroll</code> (CSS transitions) et <code class="text-scene-gold">motion-v</code> (lib d'animation).
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          ref="revealTarget"
          :class="['reveal-fade-up bg-scene-surface border border-scene-border rounded-sm p-8', { 'reveal-visible': isRevealed }]"
        >
          <h4 class="font-display text-xl text-scene-cream mb-2">CSS Transition via useRevealOnScroll</h4>
          <p class="text-scene-muted text-sm">
            Utilise <code class="text-scene-gold">useIntersectionObserver</code> de VueUse avec la classe utilitaire <code class="text-scene-gold">.reveal-fade-up</code>.
            Animation : opacity + translateY, 800ms ease. Respecte <code class="text-scene-gold">prefers-reduced-motion</code>.
          </p>
        </div>

        <ClientOnly>
          <div class="bg-scene-surface border border-scene-border rounded-sm p-8">
            <h4 class="font-display text-xl text-scene-cream mb-2">motion-v (librairie)</h4>
            <p class="text-scene-muted text-sm">
              Le composant <code class="text-scene-gold">&lt;Motion&gt;</code> offre des animations déclaratives. Fade-in 800ms, translateY 24px → 0.
            </p>
            <div class="mt-4 flex gap-3">
              <Motion
                :initial="{ opacity: 0, y: 24 }"
                :visible="{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0 } }"
              >
                <UiTag label="Fade 1" color="gold" />
              </Motion>
              <Motion
                :initial="{ opacity: 0, y: 24 }"
                :visible="{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.15 } }"
              >
                <UiTag label="Fade 2" color="rouge" />
              </Motion>
              <Motion
                :initial="{ opacity: 0, y: 24 }"
                :visible="{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } }"
              >
                <UiTag label="Fade 3" color="muted" />
              </Motion>
            </div>
          </div>
        </ClientOnly>
      </div>
    </section>

    <!-- ─── Palette & Typographie ─────────────────────────── -->
    <section class="max-w-7xl mx-auto px-6 mb-20">
      <h3 class="font-display text-3xl text-scene-cream mb-8">Palette scene-* & Typographie</h3>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
        <div
          v-for="swatch in palette"
          :key="swatch.name"
          class="flex flex-col items-center gap-2"
        >
          <div
            class="w-16 h-16 rounded-sm border border-scene-border"
            :style="{ backgroundColor: swatch.value }"
          />
          <span class="text-xs text-scene-muted">{{ swatch.name }}</span>
        </div>
      </div>

      <div class="space-y-8">
        <div>
          <p class="text-xs uppercase tracking-widest text-scene-muted mb-2">display-2xl</p>
          <p class="font-display text-display-2xl text-scene-cream">Cormorant Garamond</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-scene-muted mb-2">display-xl</p>
          <p class="font-display text-display-xl text-scene-cream">Théâtre Vivant</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-scene-muted mb-2">display-lg</p>
          <p class="font-display text-display-lg text-scene-cream">Scène & Lumières</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-scene-muted mb-2">body (DM Sans)</p>
          <p class="font-body text-scene-light text-lg">
            Le théâtre est un art vivant, une rencontre entre des corps, des mots et des silences partagés dans la pénombre d'une salle.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false)
const isLightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index: number) {
  lightboxIndex.value = index
  isLightboxOpen.value = true
}

const demoImages = [
  'https://picsum.photos/seed/theatre1/1200/1600',
  'https://picsum.photos/seed/theatre2/1200/1600',
  'https://picsum.photos/seed/theatre3/1200/1600',
  'https://picsum.photos/seed/theatre4/1200/1600',
]

const { target: revealTarget, isRevealed } = useRevealOnScroll()

const palette = [
  { name: 'black', value: '#0c0c0c' },
  { name: 'dark', value: '#161616' },
  { name: 'surface', value: '#1e1e1e' },
  { name: 'light', value: '#e8e2d9' },
  { name: 'cream', value: '#f5f0e8' },
  { name: 'gold', value: '#c9a84c' },
]
</script>
