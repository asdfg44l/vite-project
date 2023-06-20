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
    vue(),
    WindiCSS(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        'vuex',
        'vee-validate',
        {
          '@/plugins/axios': ['useHttp'],
        },
      ],
    }),
    Components({
      dts: 'src/components.d.ts',
      extensions: ['vue'],
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
  },
})
