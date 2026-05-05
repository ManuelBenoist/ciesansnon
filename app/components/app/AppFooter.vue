<template>
  <footer class="bg-scene-black border-t border-scene-border py-16 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <NuxtLink to="/" class="font-display text-2xl text-scene-cream">
            La Cie Sans Non
          </NuxtLink>
          <p class="mt-3 text-sm text-scene-muted">
            Compagnie de théâtre
          </p>
          <a
            href="mailto:contact@ciesansnon.com"
            class="mt-2 inline-block text-sm text-scene-muted hover:text-scene-gold transition-colors"
          >
            contact@ciesansnon.com
          </a>
        </div>
        <div>
          <h4 class="font-body text-xs uppercase tracking-widest text-scene-light mb-4">Navigation</h4>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-scene-muted hover:text-scene-gold transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-body text-xs uppercase tracking-widest text-scene-light mb-4">Suivez-nous</h4>
          <div class="flex items-center gap-4">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="text-scene-muted hover:text-scene-gold transition-colors"
            >
              <Icon :name="social.icon" size="20" />
            </a>
          </div>
        </div>
      </div>
      <div class="mt-12 pt-8 border-t border-scene-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-scene-muted">
        <p>&copy; {{ new Date().getFullYear() }} La Cie Sans Non</p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/mention-legales" class="hover:text-scene-gold transition-colors">Mentions légales</NuxtLink>
          <span>Crédits photos</span>
        </div>
      </div>
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
  { name: 'Instagram', icon: 'mdi:instagram', url: '#' },
  { name: 'Facebook', icon: 'mdi:facebook', url: '#' },
  { name: 'YouTube', icon: 'mdi:youtube', url: '#' },
]
</script>
