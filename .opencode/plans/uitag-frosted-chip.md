# UiTag — Frosted chip redesign

## File
`app/components/ui/UiTag.vue`

## Changes

Replace the `colors` record and `computedClasses`:

```js
const colors: Record<string, string> = {
  brick: 'bg-scene-brick/85 backdrop-blur-sm text-white',
  navy: 'bg-scene-navy/85 backdrop-blur-sm text-white',
  muted: 'bg-[#222]/70 backdrop-blur-sm border border-scene-border text-scene-muted',
}

const computedClasses = computed(() =>
  [
    'inline-block px-3 py-1 font-semibold uppercase tracking-[0.15em] rounded-sm',
    'font-body text-[0.7rem]',
    colors[props.color],
  ].join(' '),
)
```

## What changed vs before
| Before | After |
|---|---|
| `bg-scene-brick text-white` | `bg-scene-brick/85 backdrop-blur-sm text-white` |
| `bg-scene-navy text-white` | `bg-scene-navy/85 backdrop-blur-sm text-white` |
| `bg-transparent border border-[#444] text-[#888]` | `bg-[#222]/70 backdrop-blur-sm border border-scene-border text-scene-muted` |
| `font-display text-[0.65rem]` | `font-body text-[0.7rem]` |
| `border` in generic classes | removed from generic (muted handles its own) |
