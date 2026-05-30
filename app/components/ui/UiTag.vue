<template>
  <span :class="computedClasses">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  color?: 'brick' | 'navy' | 'muted' | 'yellow'
}>(), {
  color: 'brick',
})

const colors: Record<string, string> = {
  brick: 'bg-scene-rouge text-white',
  navy: 'bg-scene-navy text-white',
  muted: 'bg-white text-black',
  yellow: 'bg-scene-yellow text-black',
}

const computedClasses = computed(() =>
  [
    'inline-block px-3 py-1 font-bold uppercase tracking-[0.15em] border-2 border-black',
    'font-body text-[0.7rem]',
    colors[props.color],
  ].join(' '),
)
</script>
