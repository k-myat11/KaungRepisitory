// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-highcharts',
  ],
  app: {
    head: {
      title: '円｜SM System'
    }
  },
    vite: {
    server: {
      hmr: {
        protocol: 'wss',
        host: 'fictional-space-sniffle-x5p47qp4qxjj2vrpv-3000.app.github.dev',
        // port property removed to fix type error
      },
    },
  },
});