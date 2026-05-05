<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-scene-dark/95 backdrop-blur-sm border-b border-scene-border">
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="font-display text-xl text-scene-cream">
        La Cie Sans Non
      </NuxtLink>
      <ul class="hidden lg:flex items-center gap-8">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="font-body text-sm uppercase tracking-widest text-scene-light hover:text-scene-gold transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
const links = [
  { to: '/creations', label: 'Créations' },
  { to: '/la-compagnie', label: 'La Compagnie' },
  { to: '/actions-culturelles', label: 'Actions culturelles' },
  { to: '/contact', label: 'Contact' },
]
</script>
