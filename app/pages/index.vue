<template>
  <div>
    <HomeHero />
    <HomeCreations />
    <HomeActions />
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Théâtre vivant',
  description: 'Compagnie de théâtre : créations, actions culturelles et médiation. Des mots, des corps, des silences — un théâtre qui ne dit jamais non à la vie.',
  type: 'website',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: safeJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'La Cie Sans Non',
      url: 'https://ciesansnon.com',
      description: 'Compagnie de théâtre — créations et actions culturelles',
    }),
  }, {
    type: 'application/ld+json',
    innerHTML: safeJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'La Cie Sans Non',
      url: 'https://ciesansnon.com',
      description: 'Compagnie de théâtre — créations et actions culturelles',
    }),
  }],
})
</script>
