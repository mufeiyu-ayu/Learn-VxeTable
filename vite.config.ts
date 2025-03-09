// ts
import { fileURLToPath, URL } from 'node:url'

// @ts-ignore
import tailwindcss from '@tailwindcss/vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //  @ts-ignore
    vueDevTools(),
    //  @ts-ignore
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
