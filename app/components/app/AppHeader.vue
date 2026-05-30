<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
      <NuxtLink to="/" class="block shrink-0 bg-black p-1 sm:p-2">
        <NuxtImg
          src="/images/logo_csn.webp"
          alt="La Cie Sans Non — Accueil"
          class="h-8 w-auto brightness-[1.6]"
          loading="eager"
        />
      </NuxtLink>

      <ul class="hidden lg:flex items-center gap-2">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="font-body text-sm font-bold uppercase tracking-wider border-2 border-black px-4 py-2 bg-white hover:bg-scene-yellow transition-colors duration-200"
            active-class="bg-black text-white hover:bg-black"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <button
        class="lg:hidden border-2 border-black p-2 bg-white hover:bg-scene-yellow transition-colors"
        @click="isMenuOpen = true"
        aria-label="Menu"
      >
        <Icon name="mdi:menu" size="24" />
      </button>
    </nav>

    <AppNav v-model="isMenuOpen" />
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)

const links = [
  { to: '/creations', label: 'Créations' },
  { to: '/la-compagnie', label: 'La Compagnie' },
  { to: '/actions-culturelles', label: 'Actions culturelles' },
  { to: '/contact', label: 'Contact' },
]
</script>
