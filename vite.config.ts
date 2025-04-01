// ts
import { fileURLToPath, URL } from 'node:url'

// @ts-ignore
import tailwindcss from '@tailwindcss/vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    //  @ts-ignore
    vueDevTools(),
    //  @ts-ignore
    tailwindcss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    lazyImport({
      resolvers: [
        VxeResolver({
          libraryName: 'vxe-table',
        }),
        VxeResolver({
          libraryName: 'vxe-pc-ui',
        }),
      ],
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5177',
        // target: 'http://192.168.8.252:9100/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // 如果不需要/api前缀，可以取消注释
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将第三方库分离打包
          'vendor': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus'],
          'vxe': ['vxe-table', 'vxe-pc-ui'],
        },
      },
    },
  },
})
