export interface RevealOptions {
  threshold?: number
  rootMargin?: string
}

export function useRevealOnScroll(options: RevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options
  const target = ref<HTMLElement | null>(null)
  const isRevealed = ref(true)

  onMounted(() => {
    if (!target.value) return

    const rect = target.value.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    isRevealed.value = false
    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          isRevealed.value = true
        }
      },
      { threshold, rootMargin },
    )
  })

  return { target, isRevealed }
}
