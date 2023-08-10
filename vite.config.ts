import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// plugins
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    WindiCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vuex',
        'vee-validate',
        {
          '@/store/index': ['useProfileStore', 'useUIStore', 'useDialogsStore'],
        },
        {
          '@/plugins/axios': ['useHttp'],
        },
      ],
      dirs: ['./src/components/**'],
      dts: true,
    }),
    Components({
      extensions: ['vue'],
      dirs: ['./src/components/**', './src/layouts/**'],
      resolvers: [
        (componentName) => {
          if (['Form', 'Field', 'ErrorMessage'].includes(componentName))
            return { name: componentName, from: 'vee-validate' }
        },
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets')],
      symbolId: 'trevi-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    // Variable for VueI18n
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  server: {
    port: 3000,
    proxy: {
      // 帶選項寫法：http://localhost:3000/api/bar -> http://10.1.7.106:8080/bar
      '/api': {
        target: 'http://10.1.7.106:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
