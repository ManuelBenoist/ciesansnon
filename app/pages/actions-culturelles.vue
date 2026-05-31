<template>
  <div>
    <section class="relative pt-32 pb-20 sm:pt-48 sm:pb-28 px-6">
      <div
        ref="heroTarget"
        :class="['reveal-fade-up reveal-visible max-w-7xl mx-auto']"
      >
        <p class="font-body text-xs uppercase tracking-[0.3em] text-scene-brick mb-4">
          Aller vers tous les publics
        </p>
        <h1 class="font-display font-bold text-display-xl text-scene-cream mb-8">
          Actions culturelles
        </h1>
      </div>
    </section>

    <section class="py-20 sm:py-28 bg-scene-dark px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            ref="publicsImgTarget"
            :class="['reveal-fade-up reveal-visible']"
          >
            <div class="relative aspect-[4/3] overflow-hidden rounded-sm">
              <NuxtImg
                src="/images/actions-culturelles/illu-actions-culturelles.webp"
                alt="Groupe de participants lors d'un atelier de médiation culturelle"
                class="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-scene-dark/40 to-transparent" />
            </div>
          </div>
          <div
            ref="publicsTarget"
            :class="['reveal-fade-up reveal-visible']"
          >
            <h2 class="font-display font-semibold text-display-lg text-scene-cream mb-6">
              Une création de spectacles qui s'appuie sur des ateliers de sensibilisation
            </h2>
            <div class="font-body text-scene-light/80 text-base leading-relaxed space-y-4">
              <p>
                Pendant la période de création du spectacle, des ateliers sont proposés aux usagers des lieux culturels ainsi qu'aux écoles primaires et aux collèges. En plus d'offrir une sensibilisation à la présence scénique (respiration, conscience du corps, de soi et des autres, communication non verbale entre autres), ceux-ci sont centrés sur une initiation au jeu sur le thème de l'interdépendance : en quoi avons-nous besoin des autres ? Il y a donc un travail sur le regard et le toucher, et comment le jugement sur autrui se manifeste sans un mot.
              </p>
              <p>
                Nous proposons aux participants un questionnaire sur leur vécu quant à se sentir jugé par les autres ou être dans une attitude de rejet de l'autre : à quelle occasion cela leur est-il arrivé ? Dans quelle situation précise ? Est-ce que cela a évolué avec l'âge ? A partir des réponses des participants, nous proposons de réaliser des scènes improvisées, si possible sans paroles.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-20">
          <h3 class="font-display font-semibold text-2xl text-scene-cream mb-6 text-center">
            Les ateliers en lien avec la création de SIMPLE
          </h3>
          <div class="relative">
            <div class="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar md:justify-center md:flex-wrap md:overflow-visible md:snap-none pr-8">
              <div
                v-for="a in ateliersCreation"
                :key="a.slug"
                class="flex-shrink-0 w-48 md:w-64 snap-start"
              >
                <AtelierSimpleCard
                  :titre="a.titre"
                  :slug="a.slug"
                  :affiche="a.image || ''"
                  @select="openAtelierSimpleModal"
                />
              </div>
            </div>
            <div class="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-scene-dark via-scene-dark/80 to-transparent pointer-events-none md:hidden" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 sm:py-28 bg-scene-black px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div
            ref="artsTarget"
            :class="['reveal-fade-up reveal-visible order-2 lg:order-1']"
          >
            <h2 class="font-display font-semibold text-display-lg text-scene-cream mb-6">
              Un atelier annuel pour les jeunes de 15 à 25 ans
            </h2>
            <div class="font-body text-scene-light/80 text-base leading-relaxed space-y-4">
              <p>
                 La Compagnie sans Non cherche à développer des actions culturelles variées et ouvertes à un public large, en portant une attention plus particulière aux publics dits « éloignés » de l'offre culturelle.
              </p>
              <p>
                 Chaque année Félix et Marie-Hélène animent un atelier à destination des jeunes de 15 à 25 ans résidant en Quartiers Prioritaires de la Ville et crée, des spectacles théâtraux et musicaux.
              </p>
            </div>
          </div>
          <div
            ref="artsImgTarget"
            :class="['reveal-fade-up reveal-visible order-1 lg:order-2']"
          >
            <div class="relative aspect-[4/3] overflow-hidden rounded-sm">
              <NuxtImg
                src="/images/actions-culturelles/illu-spectacle-prise-de-risque.webp"
                alt="Scène de théâtre avec des jeunes participants en atelier"
                class="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-scene-dark/40 to-transparent" />
            </div>
          </div>
        </div>

        <!-- Bandeau spectacles d'atelier -->
        <div>
          <h3 class="font-display font-semibold text-2xl text-scene-cream mb-6 text-center">
            Les spectacles des ateliers
          </h3>
          <div class="relative">
            <div class="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar md:justify-center md:flex-wrap md:overflow-visible md:snap-none pr-8">
              <div
                v-for="atelier in ateliers"
                :key="atelier.slug"
                class="flex-shrink-0 w-28 md:w-36 snap-start"
              >
                <AtelierCard
                  :titre="atelier.titre"
                  :slug="atelier.slug"
                  :affiche="atelier.affiche"
                  @select="openAtelierModal"
                />
              </div>
            </div>
            <div class="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-scene-black via-scene-black/80 to-transparent pointer-events-none md:hidden" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-4 sm:py-10 bg-white px-6">
      <div
        ref="partenairesTarget"
        :class="['reveal-fade-up reveal-visible max-w-7xl mx-auto text-center']"
      >
        <h2 class="font-display font-semibold text-display-lg text-scene-black mb-6">
          Partenaires & soutiens
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <NuxtImg
            src="/images/soutiens/logo-cite-etudcative-mulhouse.webp"
            alt="Logo de la Cité Éducative de Mulhouse"
            class="h-24 w-auto object-contain mx-auto"
            loading="lazy"
          />
          <NuxtImg
            src="/images/soutiens/logo-ville-de-mulhouse.webp"
            alt="Logo de la Ville de Mulhouse"
            class="h-24 w-auto object-contain mx-auto"
            loading="lazy"
          />
          <NuxtImg
            src="/images/soutiens/logo-fdva.webp"
            alt="Logo du FDVA — Fonds pour le Développement de la Vie Associative"
            class="h-20 w-auto object-contain mx-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <UiModal v-model="isAtelierModalOpen">
      <AtelierModal v-if="selectedAtelier" :atelier="selectedAtelier" />
    </UiModal>

    <UiModal v-model="isAtelierSimpleModalOpen">
      <AtelierSimpleModal v-if="selectedAtelierSimple" :atelier="selectedAtelierSimple" />
    </UiModal>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Actions culturelles',
  description: 'La Cie Sans Non conçoit des projets de médiation culturelle : ateliers théâtre, interventions scolaires, résidences en quartiers prioritaires. L\'art de la scène pour tous les publics.',
})

const { data: rawAteliers } = await useAsyncData('ateliers-list', () =>
  queryCollection('ateliers').order('ordre', 'ASC').all()
)

const { data: rawAteliersCreation } = await useAsyncData('ateliers-creation-list', () =>
  queryCollection('ateliers_creation').order('ordre', 'ASC').all()
)

const ateliers = computed(() =>
  (rawAteliers.value || []).filter((a: any) => a.slug && a.titre)
)

const ateliersCreation = computed(() =>
  (rawAteliersCreation.value || []).filter((a: any) => a.slug && a.titre)
)

const isAtelierModalOpen = ref(false)
const selectedAtelier = ref<any>(null)

const isAtelierSimpleModalOpen = ref(false)
const selectedAtelierSimple = ref<any>(null)

function openAtelierModal(slug: string) {
  const found = (ateliers.value || []).find((a: any) => a.slug === slug)
  if (found) {
    selectedAtelier.value = found
    isAtelierModalOpen.value = true
  }
}

function openAtelierSimpleModal(slug: string) {
  const found = (ateliersCreation.value || []).find((a: any) => a.slug === slug)
  if (found) {
    selectedAtelierSimple.value = found
    isAtelierSimpleModalOpen.value = true
  }
}

const { target: heroTarget } = useRevealOnScroll()
const { target: artsTarget } = useRevealOnScroll()
const { target: artsImgTarget } = useRevealOnScroll()
const { target: publicsTarget } = useRevealOnScroll()
const { target: publicsImgTarget } = useRevealOnScroll()
const { target: partenairesTarget } = useRevealOnScroll()
</script>
