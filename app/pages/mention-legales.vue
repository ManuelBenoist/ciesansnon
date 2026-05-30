<template>
  <div>
    <section class="relative pt-28 pb-12 sm:pt-36 sm:pb-16 px-6 border-b-4 border-black">
      <div class="max-w-7xl mx-auto">
        <span class="inline-block font-body text-xs font-bold uppercase tracking-[0.3em] text-white bg-black px-3 py-1 mb-4">
          Informations
        </span>
        <h1 class="font-display font-bold text-display-xl text-black mb-4">
          Mentions légales
        </h1>
        <p class="font-body text-black/70 text-lg leading-relaxed max-w-3xl">
          Informations obligatoires concernant l'édition et l'hébergement du site.
        </p>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-white px-6">
      <div class="max-w-3xl mx-auto space-y-10">
        <div>
          <h2 class="font-display font-bold text-xl text-black mb-4 inline-block bg-scene-yellow border-2 border-black px-3 py-1">
            Éditeur du site
          </h2>
          <div class="font-body text-black/80 text-base leading-relaxed space-y-2 mt-4">
            <p><strong>La Cie Sans Non</strong></p>
            <p>SIRET : 889 998 498 00030</p>
            <p>Licence d'entrepreneur du spectacle : 2022 - 005057 / 2022 - 005058</p>
            <p>Email : <a href="mailto:ciesansnon@gmail.com" class="text-scene-rouge hover:underline font-bold">ciesansnon@gmail.com</a></p>
          </div>
        </div>

        <div class="border-t-2 border-black pt-10">
          <h2 class="font-display font-bold text-xl text-white mb-4 inline-block bg-scene-rouge border-2 border-black px-3 py-1">
            Conception & développement
          </h2>
          <p class="font-body text-black/80 text-base leading-relaxed mt-4">
            Ce site a été conçu et développé par <strong>Manuel BENOIST</strong>.
          </p>
        </div>

        <div class="border-t-2 border-black pt-10">
          <h2 class="font-display font-bold text-xl text-black mb-4 inline-block bg-scene-yellow border-2 border-black px-3 py-1">
            Propriété intellectuelle
          </h2>
          <p class="font-body text-black/80 text-base leading-relaxed mt-4">
            L'ensemble des contenus (textes, images, vidéos) présents sur ce site est la propriété de la Compagnie Sans Non ou fait l'objet d'une autorisation d'utilisation. Toute reproduction, représentation ou diffusion, totale ou partielle, est interdite sans autorisation préalable.
          </p>
        </div>

        <div class="border-t-2 border-black pt-10">
          <h2 class="font-display font-bold text-xl text-white mb-4 inline-block bg-scene-navy border-2 border-black px-3 py-1">
            Données personnelles
          </h2>
          <p class="font-body text-black/80 text-base leading-relaxed mt-4">
            Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre aux messages et ne sont ni conservées au-delà de cet usage, ni cédées à des tiers. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à <a href="mailto:ciesansnon@gmail.com" class="text-scene-rouge hover:underline font-bold">ciesansnon@gmail.com</a>.
          </p>
        </div>

        <div class="border-t-2 border-black pt-10">
          <h2 class="font-display font-bold text-xl text-black mb-4 inline-block bg-scene-yellow border-2 border-black px-3 py-1">
            Cookies
          </h2>
          <p class="font-body text-black/80 text-base leading-relaxed mt-4">
            Ce site n'utilise pas de cookies de suivi ou de profilage. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Mentions légales',
  description: 'Mentions légales du site de la Compagnie Sans Non : éditeur, hébergement, propriété intellectuelle et données personnelles.',
})
</script>
