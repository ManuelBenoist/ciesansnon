<template>
  <div>
    <section class="relative pt-28 pb-16 sm:pt-40 sm:pb-24 px-6">
      <div
        ref="heroTarget"
        :class="['reveal-fade-up reveal-visible max-w-7xl mx-auto']"
      >
        <p class="font-body text-xs uppercase tracking-[0.3em] text-scene-brick mb-4">
          La Compagnie
        </p>
        <h1 class="font-display font-bold text-display-xl text-scene-cream mb-8">
          La Cie Sans Non
        </h1>
        <p class="font-body text-scene-light/80 text-lg leading-relaxed max-w-3xl">
          Implantée à Mulhouse, la Compagnie Sans Non développe des spectacles de théâtre de récit qui donnent une place importante à l’engagement du corps.
        </p>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-scene-dark px-6">
      <div
        ref="presentationTarget"
        :class="['reveal-fade-up reveal-visible max-w-7xl mx-auto']"
      >
        <h2 class="font-display font-semibold text-display-lg text-scene-cream mb-8">
          Notre histoire
        </h2>
        <div class="font-body text-scene-light/80 text-base leading-relaxed space-y-4 max-w-3xl">
          <p>
            La Compagnie Sans Non est fondée alors qu’Olivier Sangwa entame la formation de comédien qui va le mener au Conservatoire national supérieur d’Art Dramatique. Avec Marie-Hélène Benoist et Félix Benoist, il monte un seul en scène d’une heure qui installe les fondements de son jeu physique, engagé, généreux et pose les bases du style de la compagnie : l’imaginaire du spectateur y est constamment sollicité par un narrateur - qui est aussi le personnage central - pour que l’espace, les personnages, la temporalité de la fiction naissent d’un geste, d’une voix ou d’une lumière qui change.
          </p>
          <p>
            Sa formation achevée, et parallèlement aux projets pour lesquels il est employé comme comédien, Olivier relance un nouveau projet pour la compagnie avec Félix et Marie-Hélène, mais aussi avec les jeunes artistes qu’il a rencontrés au CNSAD : comédienne, régisseur, costumière…
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-scene-black px-6">
      <div class="max-w-7xl mx-auto">
        <div
          ref="equipeTarget"
          :class="['reveal-fade-up reveal-visible mb-16']"
        >
          <p class="font-body text-xs uppercase tracking-[0.3em] text-scene-brick mb-4">
            Celles et ceux qui font la compagnie
          </p>
          <h2 class="font-display font-semibold text-display-lg text-scene-cream">
            L'équipe
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14 lg:gap-x-10 lg:gap-y-20">
          <div
            v-for="(membre, index) in membres"
            :key="membre.slug"
            ref="membreCardRefs"
            :class="['reveal-fade-up reveal-visible']"
            :style="{ transitionDelay: `${index * 120}ms` }"
          >
            <CompagnieMembreCard
              :nom="membre.nom"
              :role-court="membre.roleCourt"
              :photo="membre.photo"
              :slug="membre.slug"
              @select="openMemberModal"
            />
          </div>
        </div>
      </div>
    </section>

    <UiModal v-model="isModalOpen">
      <CompagnieMembreModal
        v-if="selectedMembre"
        :nom="selectedMembre.nom"
        :role="selectedMembre.role"
        :photo="selectedMembre.photo"
        :bio="selectedMembre.bio"
      />
    </UiModal>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'La Compagnie',
  description: 'Découvrez la Compagnie Sans Non : son histoire, ses membres, son organigramme et ses partenaires. Une compagnie de théâtre ancrée dans le vivant.',
})

useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'La Cie Sans Non',
      url: 'https://ciesansnon.com/la-compagnie',
      description: 'Compagnie de théâtre — créations et actions culturelles',
    }),
  }],
})

const { data: rawMembres } = await useAsyncData('membres-equipe', () =>
  queryCollection('membres').order('ordre', 'ASC').all()
)

const membres = computed(() =>
  (rawMembres.value || []).map((m: any) => ({
    nom: m.nom,
    slug: m.slug,
    roleCourt: m.role_court,
    role: m.role_compagnie,
    photo: m.photo || '',
    bio: m.bio || undefined,
  }))
)

const isModalOpen = ref(false)
const selectedMembre = ref<{
  nom: string
  role: string
  photo: string
  bio?: string
} | null>(null)

function openMemberModal(slug: string) {
  const membre = membres.value.find(m => m.slug === slug)
  if (membre) {
    selectedMembre.value = {
      nom: membre.nom,
      role: membre.role,
      photo: membre.photo,
      bio: membre.bio,
    }
    isModalOpen.value = true
  }
}

const { target: heroTarget } = useRevealOnScroll()
const { target: presentationTarget } = useRevealOnScroll()
const { target: equipeTarget } = useRevealOnScroll()
const membreCardRefs = ref<HTMLElement[]>([])

onMounted(() => {
  setTimeout(() => {
    membreCardRefs.value.forEach((el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top >= window.innerHeight || rect.bottom <= 0) {
        el.classList.remove('reveal-visible')
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              el.classList.add('reveal-visible')
              stop()
            }
          },
          { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
        )
      }
    })
  }, 100)
})
</script>
