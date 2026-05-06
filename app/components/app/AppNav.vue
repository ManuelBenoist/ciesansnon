<template>
  <Teleport to="body">
    <Transition name="nav-overlay">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[9997] bg-scene-black/98 flex flex-col"
      >
        <div class="flex items-center justify-between p-6">
          <NuxtLink
            to="/"
            @click="close"
          >
            <NuxtImg
              src="/images/logo_csn.webp"
              alt="La Cie Sans Non — Accueil"
              class="h-8 w-auto brightness-[1.6]"
              loading="eager"
            />
          </NuxtLink>
          <button
            class="p-2 text-scene-light hover:text-scene-gold transition-colors"
            @click="close"
            aria-label="Fermer le menu"
          >
            <Icon name="mdi:close" size="24" />
          </button>
        </div>

        <nav class="flex-1 flex flex-col items-center justify-center gap-8">
          <NuxtLink
            v-for="(link, i) in links"
            :key="link.to"
            :to="link.to"
            class="font-display text-display-lg text-scene-light hover:text-scene-gold transition-colors"
            :style="{ transitionDelay: isOpen ? `${i * 80}ms` : '0ms' }"
            @click="close"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="p-6 flex items-center justify-center gap-6">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            :aria-label="social.name"
            target="_blank"
            rel="noopener noreferrer"
            class="text-scene-muted hover:text-scene-gold transition-colors"
          >
            <Icon :name="social.icon" size="22" />
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed(() => props.modelValue)

function close() {
  emit('update:modelValue', false)
}

const links = [
  { to: '/creations', label: 'Créations' },
  { to: '/la-compagnie', label: 'La Compagnie' },
  { to: '/actions-culturelles', label: 'Actions culturelles' },
  { to: '/contact', label: 'Contact' },
]

const socials = [
  { name: 'Instagram', icon: 'mdi:instagram', url: 'https://www.instagram.com/cie_sans_non' },
  { name: 'Facebook', icon: 'mdi:facebook', url: 'https://www.facebook.com/Ciesansnon' },
  { name: 'YouTube', icon: 'mdi:youtube', url: '#' },
]

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<style scoped>
.nav-overlay-enter-active {
  transition: opacity 400ms ease;
}

.nav-overlay-leave-active {
  transition: opacity 300ms ease;
}

.nav-overlay-enter-from,
.nav-overlay-leave-to {
  opacity: 0;
}
</style>
