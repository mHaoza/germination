import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { markdown } from './scripts/markdown'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const glsl = (await import('vite-plugin-glsl')).default

  return {
    plugins: [vue({ include: [/\.vue$/, /\.md$/] }), glsl(), markdown()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
