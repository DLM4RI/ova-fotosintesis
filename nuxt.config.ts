import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    plugins: [vuetify()],
    build: {
      cssMinify: false,
    },
  },

  routeRules: {
    '/**': { prerender: true },
  },

  app: {
    baseURL: '/ova-fotosintesis/',
    head: {
      link: [
        { 
          rel: 'icon', 
          type: 'image/png', 
          // Usa la ruta completa incluyendo el baseURL para evitar errores en GH Pages
          href: '/ova-fotosintesis/icono.png' 
        }
      ]
    }
  },
})