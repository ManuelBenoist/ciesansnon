<template>
  <div>
    <section class="relative pt-32 pb-20 sm:pt-48 sm:pb-28 px-6">
      <div
        ref="heroTarget"
        :class="['reveal-fade-up reveal-visible max-w-4xl mx-auto']"
      >
        <p class="font-body text-xs uppercase tracking-[0.3em] text-scene-gold mb-4">
          Arts de la scène
        </p>
        <h1 class="font-display text-display-xl text-scene-cream mb-8">
          Actions culturelles
        </h1>
        <p class="font-body text-scene-light/80 text-lg leading-relaxed max-w-2xl">
          Aller vers tous les publics. Parce que l'art ne se partage pas seulement sur scène,
          mais aussi dans les salles de classe, les quartiers et les établissements.
        </p>
      </div>
    </section>

    <section class="py-20 sm:py-28 bg-scene-dark px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div
            ref="artsTarget"
            :class="['reveal-fade-up reveal-visible order-2 lg:order-1']"
          >
            <h2 class="font-display text-display-lg text-scene-cream mb-6">
              Arts de la scène
            </h2>
            <div class="font-body text-scene-light/80 text-base leading-relaxed space-y-4">
              <p>
                Nous concevons des ateliers de pratique théâtrale pour tous les âges et tous les
                niveaux. Du jeu dramatique à l'écriture de plateau, chaque atelier est une invitation
                à explorer sa propre créativité, à trouver sa voix et son corps sur scène.
              </p>
              <p>
                Nos interventions s'appuient sur les créations de la compagnie : les participants
                découvrent l'univers d'un spectacle, rencontrent les artistes, puis expérimentent
                par eux-mêmes les outils du théâtre.
              </p>
            </div>
          </div>
          <div
            ref="artsImgTarget"
            :class="['reveal-fade-up reveal-visible order-1 lg:order-2']"
          >
            <div class="relative aspect-[4/3] overflow-hidden rounded-sm">
              <div
                class="absolute inset-0 bg-cover bg-center"
                style="background-image: url('https://picsum.photos/seed/arts-scene/800/600')"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-scene-dark/40 to-transparent" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            ref="publicsImgTarget"
            :class="['reveal-fade-up reveal-visible']"
          >
            <div class="relative aspect-[4/3] overflow-hidden rounded-sm">
              <div
                class="absolute inset-0 bg-cover bg-center"
                style="background-image: url('https://picsum.photos/seed/publics/800/600')"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-scene-dark/40 to-transparent" />
            </div>
          </div>
          <div
            ref="publicsTarget"
            :class="['reveal-fade-up reveal-visible']"
          >
            <h2 class="font-display text-display-lg text-scene-cream mb-6">
              Tous les publics
            </h2>
            <div class="font-body text-scene-light/80 text-base leading-relaxed space-y-4">
              <p>
                Notre engagement envers l'accessibilité se décline à travers des projets sur mesure
                pour chaque public :
              </p>
              <ul class="list-none space-y-3">
                <li class="flex items-start gap-3">
                  <span class="text-scene-gold mt-1.5">▸</span>
                  <span><strong class="text-scene-light">Scolaires</strong> &mdash; du primaire au lycée, parcours de découverte et pratique artistique en lien avec les programmes.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-scene-gold mt-1.5">▸</span>
                  <span><strong class="text-scene-light">Établissements spécialisés</strong> &mdash; ateliers adaptés pour les personnes en situation de handicap, avec des artistes formés à la médiation inclusive.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-scene-gold mt-1.5">▸</span>
                  <span><strong class="text-scene-light">Quartiers prioritaires</strong> &mdash; résidences d'artistes, stages gratuits, restitutions publiques dans l'espace urbain.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-scene-gold mt-1.5">▸</span>
                  <span><strong class="text-scene-light">Public adulte</strong> &mdash; stages amateurs, rencontres, bords de scène.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 sm:py-28 bg-scene-black px-6">
      <div
        ref="ctaTarget"
        :class="['reveal-fade-up reveal-visible max-w-2xl mx-auto text-center']"
      >
        <h2 class="font-display text-3xl sm:text-4xl text-scene-cream mb-4">
          Envie de monter un projet ?
        </h2>
        <p class="font-body text-scene-muted text-sm mb-8">
          Vous êtes enseignant, directeur de structure culturelle, élu ou responsable associatif ?
          Parlons-en.
        </p>
        <UiButton label="Nous contacter" variant="primary" size="lg" to="/contact">
          <template #icon-after>
            <Icon name="mdi:arrow-right" size="16" />
          </template>
        </UiButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Actions culturelles',
  description: 'La Cie Sans Non conçoit des projets de médiation culturelle : ateliers théâtre, interventions scolaires, résidences en quartiers prioritaires. L\'art de la scène pour tous les publics.',
})

const { target: heroTarget } = useRevealOnScroll()
const { target: artsTarget } = useRevealOnScroll()
const { target: artsImgTarget } = useRevealOnScroll()
const { target: publicsTarget } = useRevealOnScroll()
const { target: publicsImgTarget } = useRevealOnScroll()
const { target: ctaTarget } = useRevealOnScroll()
</script>
