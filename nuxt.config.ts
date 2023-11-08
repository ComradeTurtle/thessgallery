// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/ui', 'nuxt-icon', 'vue3-carousel-nuxt', "@nuxt/image"],
  ui: {
    global: true,
    icons: ['mdi', 'heroicons']
  },
  plugins: [ { src: '~/plugins/base64.js' } ]
})