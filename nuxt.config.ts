// https://nuxt.com/docs/api/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-05',

  future: { compatibilityVersion: 4 },

  site: {
    url: 'https://ciesansnon.com',
    name: 'La Cie Sans Non',
    description: 'Compagnie de théâtre — créations et actions culturelles',
    defaultLocale: 'fr',
  },

  nitro: {
    preset: 'github-pages',
    prerender: {
      failOnError: false,
    },
  },

  app: {
    baseURL: '/ciesansnon/',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'fr',
        class: 'dark',
        style: 'background-color: #0c0c0c; color-scheme: dark;',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0c0c0c' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
  ],

  content: { highlight: false },

  image: { quality: 85, format: ['webp', 'jpg'] },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      formspreeId: '',
    },
  },
})
