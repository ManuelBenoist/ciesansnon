<template>
  <span :class="computedClasses">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  color?: 'gold' | 'rouge' | 'muted'
}>(), {
  color: 'gold',
})

const colors: Record<string, string> = {
  gold: 'bg-scene-gold/15 text-scene-gold border-scene-gold/30',
  rouge: 'bg-scene-rouge/15 text-scene-rouge border-scene-rouge/30',
  muted: 'bg-scene-muted/15 text-scene-muted border-scene-muted/30',
}

const computedClasses = computed(() =>
  [
    'inline-block px-3 py-1 text-xs font-body uppercase tracking-widest border rounded-sm',
    colors[props.color],
  ].join(' '),
)
</script>
