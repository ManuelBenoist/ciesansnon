<template>
  <form class="space-y-6" @submit.prevent="onSubmit" novalidate>
    <div style="position: absolute; left: -9999px" aria-hidden="true">
      <input type="text" name="_honeypot" v-model="honeypot" tabindex="-1" autocomplete="off" />
    </div>

    <div class="form-group">
      <label for="contact-name" class="form-label">Nom</label>
      <input
        id="contact-name"
        v-model="formData.name"
        type="text"
        name="name"
        required
        class="form-input"
        :aria-describedby="errors.name ? 'error-name' : undefined"
        placeholder="Votre nom"
      />
      <p v-if="errors.name" id="error-name" class="form-error">{{ errors.name }}</p>
    </div>

    <div class="form-group">
      <label for="contact-email" class="form-label">Email</label>
      <input
        id="contact-email"
        v-model="formData.email"
        type="email"
        name="email"
        required
        class="form-input"
        :aria-describedby="errors.email ? 'error-email' : undefined"
        placeholder="votre@email.com"
      />
      <p v-if="errors.email" id="error-email" class="form-error">{{ errors.email }}</p>
    </div>

    <div class="form-group">
      <label for="contact-subject" class="form-label">Sujet</label>
      <select
        id="contact-subject"
        v-model="formData.subject"
        name="subject"
        required
        class="form-input form-select"
        :aria-describedby="errors.subject ? 'error-subject' : undefined"
      >
        <option value="" disabled>Sélectionnez un sujet</option>
        <option value="Diffusion">Diffusion</option>
        <option value="Résidences">Résidences</option>
        <option value="Actions culturelles">Actions culturelles</option>
        <option value="Presse">Presse</option>
        <option value="Autre">Autre</option>
      </select>
      <p v-if="errors.subject" id="error-subject" class="form-error">{{ errors.subject }}</p>
    </div>

    <div class="form-group">
      <label for="contact-message" class="form-label">Message</label>
      <textarea
        id="contact-message"
        v-model="formData.message"
        name="message"
        required
        rows="6"
        class="form-input form-textarea"
        :aria-describedby="errors.message ? 'error-message' : undefined"
        placeholder="Votre message..."
      />
      <p v-if="errors.message" id="error-message" class="form-error">{{ errors.message }}</p>
    </div>

    <div v-if="state.status === 'success'" class="p-4 border border-scene-brick/30 bg-scene-brick/5 rounded-sm">
      <p class="text-scene-brick text-sm font-body">{{ state.message }}</p>
    </div>

    <div v-if="state.status === 'error'" class="p-4 border border-scene-rouge/30 bg-scene-rouge/5 rounded-sm">
      <p class="text-scene-rouge text-sm font-body">{{ state.message }}</p>
    </div>

    <UiButton
      label="Envoyer le message"
      variant="primary"
      size="lg"
      type="submit"
      :disabled="state.status === 'loading'"
    >
      <template v-if="state.status === 'loading'" #icon-after>
        <Icon name="mdi:dots-horizontal" size="18" />
      </template>
    </UiButton>
  </form>
</template>

<script setup lang="ts">
const { state, submit } = useFormspree()

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const honeypot = ref('')
const errors = reactive<Record<string, string>>({})

function validate(): boolean {
  const newErrors: Record<string, string> = {}

  if (!formData.name.trim()) newErrors.name = 'Le nom est requis.'
  if (!formData.email.trim()) {
    newErrors.email = "L'email est requis."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "L'email n'est pas valide."
  }
  if (!formData.subject) newErrors.subject = 'Veuillez choisir un sujet.'
  if (!formData.message.trim()) newErrors.message = 'Le message est requis.'

  Object.keys(newErrors).forEach(key => { errors[key] = newErrors[key] })
  Object.keys(errors).forEach(key => {
    if (!(key in newErrors)) delete errors[key]
  })

  return Object.keys(newErrors).length === 0
}

async function onSubmit() {
  if (!validate()) return
  if (honeypot.value) return

  await submit({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  })
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #e8e2d9;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #1e1e1e;
  border: 1px solid #2e2e2e;
  border-radius: 2px;
  color: #e8e2d9;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #C4573A;
}

.form-input::placeholder {
  color: #5a5a5a;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%235a5a5a' d='M1.41 0L6 4.58 10.59 0 12 1.41l-6 6-6-6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
}

.form-error {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 0.75rem;
  color: #8b2635;
}
</style>
