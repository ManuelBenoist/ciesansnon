<template>
  <div>
    <HomeHero />
    <HomeCreations />
    <HomeActions />
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'La Cie Sans Non',
  description: "Toucher l'imaginaire et les émotions d'un public qui ne fait pas forcément du théâtre une pratique culturelle habituelle.",
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
      description: "Toucher l'imaginaire et les émotions d'un public qui ne fait pas forcément du théâtre une pratique culturelle habituelle",
    }),
  }, {
    type: 'application/ld+json',
    innerHTML: safeJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'La Cie Sans Non',
      url: 'https://ciesansnon.com',
      description: "Toucher l'imaginaire et les émotions d'un public qui ne fait pas forcément du théâtre une pratique culturelle habituelle",
    }),
  }],
})
</script>
