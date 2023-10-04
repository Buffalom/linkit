import { defineNuxtConfig } from 'nuxt/config'

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'de-CH',
      },

      bodyAttrs: {
        // class: process.env.NODE_ENV === 'production' ? 'bg-gray-100' : 'bg-gray-200',
      },
    },
  },

  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      APP_URL: process.env.APP_URL,
      API_URL: process.env.API_URL,
      GQL_HOST: process.env.GQL_HOST,
      CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL,

      GMAPS_KEY: process.env.GMAPS_KEY,
      GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,

      SENTRY_DSN: process.env.SENTRY_DSN,
      SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || 'development',
    },
  },

  devtools: {
    enabled: IN_DEVELOPMENT,
  },

  tailwindcss: {
    cssPath: '~/assets/css/app.css',
    viewer: false,
  },

  components: [

    // We do not want global to be set to true for all components: https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
    // Instead, it can be set on a per-directory basis or the components can be resolved in their respective loader-components.
    // Global should only be set to true for components used through <Component :is="..." />. (Blueprints and Statamic-Components in our case)
    { path: '~/components', global: false, pathPrefix: false },
    {
      path: '~/components/cms/blueprint',
      global: true,
      prefix: 'Blueprint',
    },
    {
      path: '~/components/cms/hero',
      global: true,
      prefix: 'Hero',
    },
    {
      path: '~/components/cms/component',
      global: true,
      prefix: 'Component',
    },
  ],

  postcss: {
    plugins: {
      'postcss-import': {},
      '@tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {},
})
