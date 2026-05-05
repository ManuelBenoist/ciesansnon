export interface RevealOptions {
  threshold?: number
  rootMargin?: string
}

export function useRevealOnScroll(options: RevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px' } = options
  const target = ref<HTMLElement | null>(null)
  const isRevealed = ref(false)

  const prefersReducedMotion = usePreferredReducedMotion()

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting && !isRevealed.value) {
        isRevealed.value = true
        if (!prefersReducedMotion.value) {
          stop()
        }
      }
    },
    { threshold, rootMargin },
  )

  return { target, isRevealed }
}
