import { defineConfig, passthroughImageService } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'

import sentry from '@sentry/astro'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    sentry({
      dsn: process.env.SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
})
