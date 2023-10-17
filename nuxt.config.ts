export default defineNuxtConfig({
  extends: '@nuxt-themes/alpine',

  routeRules: {
    '/api/search': {
      prerender: true,
      headers: { 'Content-Type': 'text/plain' },
    },
  },
})
