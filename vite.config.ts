import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

//plugins
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vuex',
        {
          ['@/plugins/axios']: [
            'useHttp'
          ]
        }
      ]
    }),
    Components(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets")],
      symbolId: "trevi-[name]"
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
  }
})
