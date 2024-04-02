import { defineConfig, passthroughImageService } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'

import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    mdx(),
    icon(),
    tailwind({
      applyBaseStyles: true,
    }),
    compress({
      // SVG compression will remove all lines in SVG :(
      SVG: false,
    }),
  ],
  image: {
    service: passthroughImageService(),
  }
})
