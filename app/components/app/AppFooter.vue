<template>
  <footer class="bg-white border-t-4 border-black">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 border-b-4 border-black">
      <!-- Bloc rouge : Logo -->
      <div class="bg-scene-rouge border-b-4 md:border-b-0 md:border-r-4 border-black p-8 flex flex-col items-center justify-center text-center">
        <NuxtLink to="/" class="inline-block bg-black p-2 mb-4">
          <NuxtImg
            src="/images/logo_csn.webp"
            alt="La Cie Sans Non — Accueil"
            class="h-12 w-auto brightness-[1.6]"
            loading="lazy"
          />
        </NuxtLink>
        <p class="text-sm text-white font-bold uppercase tracking-widest">
          Compagnie de théâtre
        </p>
        <a
          href="mailto:ciesansnon@gmail.com"
          class="mt-2 text-sm text-white/90 hover:underline"
        >
          ciesansnon@gmail.com
        </a>
      </div>

      <!-- Bloc blanc : Navigation -->
      <div class="border-b-4 md:border-b-0 md:border-r-4 border-black p-8">
        <h4 class="font-body text-xs font-bold uppercase tracking-widest text-black mb-6 border-b-2 border-black pb-2 inline-block">
          Navigation
        </h4>
        <ul class="space-y-3">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-base font-bold text-black hover:bg-scene-yellow px-2 py-1 -mx-2 transition-colors duration-200 inline-block"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Bloc bleu : Réseaux -->
      <div class="bg-scene-navy p-8 flex flex-col items-center justify-center text-center">
        <h4 class="font-body text-xs font-bold uppercase tracking-widest text-white mb-6 border-b-2 border-white pb-2 inline-block">
          Suivez-nous
        </h4>
        <div class="flex items-center gap-4">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            :aria-label="social.name"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:bg-white hover:text-scene-navy border-2 border-white p-2 transition-colors duration-200"
          >
            <Icon :name="social.icon" size="24" />
          </a>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-black uppercase tracking-wider">
      <p>&copy; {{ new Date().getFullYear() }} La Cie Sans Non</p>
      <NuxtLink to="/mention-legales" class="border-2 border-black px-3 py-1 hover:bg-scene-yellow transition-colors">
        Mentions légales
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const links = [
  { to: '/creations', label: 'Créations' },
  { to: '/la-compagnie', label: 'La Compagnie' },
  { to: '/actions-culturelles', label: 'Actions culturelles' },
  { to: '/contact', label: 'Contact' },
]

const socials = [
  { name: 'Instagram', icon: 'mdi:instagram', url: 'https://www.instagram.com/cie_sans_non' },
  { name: 'Facebook', icon: 'mdi:facebook', url: 'https://www.facebook.com/Ciesansnon' },
]
</script>
