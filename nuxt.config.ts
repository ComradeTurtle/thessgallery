// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/ui', 'nuxt-icon', 'vue3-carousel-nuxt', '@nuxt/image', '@nuxtjs/device', '@nuxtjs/turnstile'],
  css: ["assets/css/fonts.css"],
  ui: {
    global: true,
    icons: ['mdi', 'heroicons']
  },
  runtimeConfig: {
    turnstile: {
      secretKey: '0x4AAAAAAANGxvHox_SvEr27itNjWEDR-X0'
    }
  },

  turnstile: {
    siteKey: '0x4AAAAAAANGxnLjALs96sVq'
  },
})