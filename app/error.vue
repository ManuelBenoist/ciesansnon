<template>
  <div class="min-h-screen bg-scene-black flex items-center justify-center px-6">
    <div class="text-center max-w-xl">
      <h1 class="font-display font-bold text-display-xl text-scene-cream mb-6">
        Page introuvable
      </h1>
      <p class="font-body text-scene-light/80 text-lg leading-relaxed mb-10">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <UiButton
        label="Retour à l'accueil"
        variant="primary"
        size="lg"
        to="/"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Page introuvable',
  description: "La page demandée n'existe pas sur le site de la Compagnie Sans Non.",
})
</script>
