<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :target="target"
    :class="computedClasses"
  >
    <slot name="icon-before" />
    <span>{{ label }}</span>
    <slot name="icon-after" />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :class="computedClasses"
    :disabled="disabled"
  >
    <slot name="icon-before" />
    <span>{{ label }}</span>
    <slot name="icon-after" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  to?: string
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  target?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const variants: Record<string, string> = {
  primary: 'bg-scene-gold text-scene-black hover:bg-scene-gold-dim border-scene-gold',
  ghost: 'text-scene-gold hover:text-scene-cream border-transparent',
  outline: 'border-scene-gold text-scene-gold hover:bg-scene-gold/10',
}

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const computedClasses = computed(() =>
  [
    'inline-flex items-center gap-2 font-body uppercase tracking-widest border rounded-sm transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
    variants[props.variant],
    sizes[props.size],
  ].join(' '),
)
</script>
