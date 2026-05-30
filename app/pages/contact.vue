<template>
  <div>
    <section class="relative pt-32 pb-20 sm:pt-48 sm:pb-28 px-6">
      <div
        ref="heroTarget"
        :class="['reveal-fade-up reveal-visible max-w-4xl mx-auto']"
      >
        <p class="font-body text-xs uppercase tracking-[0.3em] text-scene-brick mb-4">
          Échangeons
        </p>
        <h1 class="font-display font-bold text-display-xl text-scene-cream mb-8">
          Contact
        </h1>
        <p class="font-body text-scene-light/80 text-lg leading-relaxed max-w-xl">
          Une question sur nos créations, un projet d'action culturelle, une demande de résidence ?
          Nous sommes à votre écoute.
        </p>
      </div>
    </section>

    <section class="py-20 sm:py-28 bg-scene-dark px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          <div
            ref="formTarget"
            :class="['reveal-fade-up reveal-visible lg:col-span-3']"
          >
            <h2 class="font-display font-semibold text-3xl text-scene-cream mb-8">
              Envoyez-nous un message
            </h2>
            <ContactForm />
          </div>

          <div
            ref="infoTarget"
            :class="['reveal-fade-up reveal-visible lg:col-span-2']"
          >
            <h2 class="font-display font-semibold text-3xl text-scene-cream mb-8">
              Nos coordonnées
            </h2>

            <div class="space-y-8">
              <div>
                <h3 class="font-body text-xs uppercase tracking-widest text-scene-muted mb-2">
                  Email
                </h3>
                <a
                  href="mailto:ciesansnon@gmail.com"
                  class="text-scene-light hover:text-scene-brick transition-colors text-sm"
                >
                  ciesansnon@gmail.com
                </a>
              </div>

              <div>
                <h3 class="font-body text-xs uppercase tracking-widest text-scene-muted mb-2">
                  Réseaux sociaux
                </h3>
                <div class="flex items-center gap-4">
                  <a href="https://www.instagram.com/cie_sans_non" aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                    class="text-scene-muted hover:text-scene-brick transition-colors p-2">
                    <Icon name="mdi:instagram" size="22" />
                  </a>
                  <a href="https://www.facebook.com/Ciesansnon" aria-label="Facebook" target="_blank" rel="noopener noreferrer"
                    class="text-scene-muted hover:text-scene-brick transition-colors p-2">
                    <Icon name="mdi:facebook" size="22" />
                  </a>
                </div>
              </div>

              <div class="w-full h-px bg-scene-border" />

              <div class="space-y-4">
                <h3 class="font-body text-xs uppercase tracking-widest text-scene-muted mb-2">
                  Informations légales
                </h3>
                <p class="text-scene-muted text-sm">
                  La Cie Sans Non
                </p>
                <p class="text-scene-muted text-sm">
                  SIRET : À renseigner
                </p>
                <p class="text-scene-muted text-sm">
                  Licence d'entrepreneur du spectacle : À renseigner
                </p>
              </div>

              <div class="w-full h-px bg-scene-border" />

              <p class="text-scene-muted text-xs leading-relaxed">
                Vos données personnelles sont collectées uniquement pour répondre à votre message
                et ne sont ni conservées au-delà de cet usage, ni cédées à des tiers.
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification
                et de suppression de vos données.
              </p>
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

useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
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
