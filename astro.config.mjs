import { defineConfig, passthroughImageService } from 'astro/config'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  image: {
    service: passthroughImageService(),
  },
})
