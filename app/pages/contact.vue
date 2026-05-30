<template>
  <div>
    <section class="relative pt-28 pb-12 sm:pt-36 sm:pb-16 px-6 border-b-4 border-black">
      <div
        ref="heroTarget"
        :class="['reveal-fade-up reveal-visible max-w-7xl mx-auto']"
      >
        <span class="inline-block font-body text-xs font-bold uppercase tracking-[0.3em] text-white bg-black px-3 py-1 mb-4">
          Échangeons
        </span>
        <h1 class="font-display font-bold text-display-xl text-black mb-6">
          Contact
        </h1>
        <p class="font-body text-black/70 text-lg leading-relaxed max-w-2xl">
          Une question sur nos créations, un projet d'action culturelle, une demande de résidence ?
          Nous sommes à votre écoute.
        </p>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-white px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-black">
          <!-- Bloc formulaire -->
          <div
            ref="formTarget"
            :class="['reveal-fade-up reveal-visible p-6 sm:p-10 lg:p-12']"
          >
            <h2 class="font-display font-bold text-2xl text-black mb-8 inline-block bg-scene-yellow border-2 border-black px-3 py-1">
              Envoyez-nous un message
            </h2>
            <ContactForm />
          </div>

          <!-- Bloc infos -->
          <div
            ref="infoTarget"
            :class="['reveal-fade-up reveal-visible bg-scene-navy border-t-4 lg:border-t-0 lg:border-l-4 border-black p-6 sm:p-10 lg:p-12']"
          >
            <h2 class="font-display font-bold text-2xl text-white mb-8 inline-block bg-black border-2 border-white px-3 py-1">
              Nos coordonnées
            </h2>

            <div class="space-y-8">
              <div>
                <h3 class="font-body text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                  Email
                </h3>
                <a
                  href="mailto:ciesansnon@gmail.com"
                  class="text-white hover:bg-white hover:text-scene-navy border-b-2 border-white pb-1 transition-colors text-sm font-bold"
                >
                  ciesansnon@gmail.com
                </a>
              </div>

              <div>
                <h3 class="font-body text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                  Réseaux sociaux
                </h3>
                <div class="flex items-center gap-3">
                  <a href="https://www.instagram.com/cie_sans_non" aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                    class="text-white border-2 border-white p-2 hover:bg-white hover:text-scene-navy transition-colors">
                    <Icon name="mdi:instagram" size="22" />
                  </a>
                  <a href="https://www.facebook.com/Ciesansnon" aria-label="Facebook" target="_blank" rel="noopener noreferrer"
                    class="text-white border-2 border-white p-2 hover:bg-white hover:text-scene-navy transition-colors">
                    <Icon name="mdi:facebook" size="22" />
                  </a>
                </div>
              </div>

              <div class="border-t-2 border-white/30 pt-6">
                <h3 class="font-body text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                  Informations légales
                </h3>
                <p class="text-white/90 text-sm">
                  La Cie Sans Non
                </p>
                <p class="text-white/90 text-sm">
                  SIRET : 889 998 498 00030
                </p>
                <p class="text-white/90 text-sm">
                  Licence d'entrepreneur du spectacle : 2022 - 005057 / 2022 - 005058
                </p>
              </div>

              <div class="border-t-2 border-white/30 pt-6">
                <p class="text-white/70 text-xs leading-relaxed">
                  Vos données personnelles sont collectées uniquement pour répondre à votre message
                  et ne sont ni conservées au-delà de cet usage, ni cédées à des tiers.
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification
                  et de suppression de vos données.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Contact',
  description: 'Contactez la Compagnie Sans Non : diffusion, résidences, actions culturelles. Formulaire de contact, email et réseaux sociaux.',
})

function safeJsonLd(obj: any) {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: safeJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'La Cie Sans Non',
      url: 'https://ciesansnon.com/contact',
      email: 'ciesansnon@gmail.com',
    }),
  }],
})

const { target: heroTarget } = useRevealOnScroll()
const { target: formTarget } = useRevealOnScroll()
const { target: infoTarget } = useRevealOnScroll()
</script>
