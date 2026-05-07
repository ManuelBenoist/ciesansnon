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
  brick: 'bg-scene-brick/60 backdrop-blur-sm text-white',
  navy: 'bg-scene-navy/60 backdrop-blur-sm text-white',
  muted: 'bg-[#222]/50 backdrop-blur-sm border border-scene-border text-scene-muted',
}

const computedClasses = computed(() =>
  [
    'inline-block px-3 py-1 font-semibold uppercase tracking-[0.15em] rounded-sm',
    'font-body text-[0.7rem]',
    colors[props.color],
  ].join(' '),
)
</script>
