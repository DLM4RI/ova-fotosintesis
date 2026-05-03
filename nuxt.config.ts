import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    plugins: [vuetify()],
    build: {
      cssMinify: false,
    },
  },

  app: {
    baseURL: import.meta.env.PROD ? '/ova-fotosintesis/' : '/',
  },
})