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
    public: {
        apiRoot: process.env.API_ROOT,
        telemetryProject: process.env.TELEMETRY_PROJECT,
        telemetryRoot: process.env.TELEMETRY_ROOT,
        turnstileKey: process.env.TURNSTILE_SITEKEY,
        turnstileSecret: process.env.TURNSTILE_SECRET
    }
},

  turnstile: {
    siteKey: '0x4AAAAAAANGxnLjALs96sVq'
  },
})