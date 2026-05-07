<template>
  <span :class="computedClasses">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  color?: 'brick' | 'navy' | 'muted'
}>(), {
  color: 'brick',
})

const colors: Record<string, string> = {
  brick: 'bg-scene-brick text-white',
  navy: 'bg-scene-navy text-white',
  muted: 'bg-transparent border border-[#444] text-[#888]',
}

const computedClasses = computed(() =>
  [
    'inline-block px-3 py-1 font-semibold uppercase tracking-[0.15em] border rounded-sm',
    'font-display text-[0.65rem]',
    colors[props.color],
  ].join(' '),
)
</script>
