<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b"
    :class="[
      isScrolled
        ? 'bg-scene-dark/95 backdrop-blur-sm border-scene-border'
        : 'bg-transparent border-transparent'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="block relative z-20 shrink-0">
        <NuxtImg
          src="/images/logo_csn.webp"
          alt="La Cie Sans Non — Accueil"
          class="h-8 w-auto brightness-[1.6]"
          loading="eager"
        />
      </NuxtLink>

      <ul class="hidden lg:flex items-center gap-8">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="nav-underline font-body text-sm uppercase tracking-widest text-scene-light hover:text-scene-gold transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <button
        class="lg:hidden relative z-20 p-2 text-scene-light hover:text-scene-gold transition-colors"
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
const { y } = useScroll(window)
const isScrolled = computed(() => y.value > 60)
const isMenuOpen = ref(false)

const links = [
  { to: '/creations', label: 'Créations' },
  { to: '/la-compagnie', label: 'La Compagnie' },
  { to: '/actions-culturelles', label: 'Actions culturelles' },
  { to: '/contact', label: 'Contact' },
]
</script>
