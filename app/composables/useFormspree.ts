export interface FormspreeState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export function useFormspree() {
  const state = ref<FormspreeState>({ status: 'idle', message: '' })
  const formspreeId = useRuntimeConfig().public.formspreeId as string

  async function submit(formData: Record<string, string>) {
    state.value = { status: 'loading', message: '' }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        state.value = { status: 'success', message: 'Votre message a été envoyé avec succès.' }
      } else {
        state.value = { status: 'error', message: 'Une erreur est survenue. Veuillez réessayer.' }
      }
    } catch {
      state.value = { status: 'error', message: 'Une erreur est survenue. Veuillez réessayer.' }
    }
  }

  return { state, submit }
}
