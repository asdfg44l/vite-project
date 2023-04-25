import { defineConfig } from 'windicss/helpers'

import plugin from 'windicss/plugin'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        table: '765px',
      },
      fontFamily: {
        // sans: ['brunoAce'], //basic font
        bruno: ['brunoAce'],
      },
    },
  },
  shortcuts: {
    'form-control': 'border rounded border-gray-500',
  },
  plugins: [
    plugin(({ addComponents }) => {
      const buttons = {
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '10px',
          '&-primary': {
            color: colors.gray[100],
            backgroundColor: colors.emerald[500],
          },
          '&-secondary': {
            color: colors.white,
            backgroundColor: colors.gray[600],
          },
          '&-confirm': {
            color: colors.white,
            backgroundColor: colors.blueGray[500],
          },
        },
        '.btn-sm': {
          padding: '.25rem .75rem',
        },
        '.modal': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&-content': {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.white,
            borderRadius: '10px',
          },
          '&-md': {
            width: '40%',
            height: '40%',
          },
          '&-lg': {
            width: '60%',
            height: '60%',
          },
        },
      }

      addComponents(buttons)
    }),
    plugin(({ addDynamic, variants }) => {
      addDynamic('skew-y', ({ Utility, Style }) => {
        return Utility.handler
          .handleStatic(Style('skew-y'))
          .handleNumber(0, 300, 'int', (number) => `skewY(-${number}deg)`)
          .createProperty('transform')
      })
    }),
    plugin(({ addVariant }) => {
      addVariant('hocus', ({ modifySelectors }) => {
        return modifySelectors(({ className }) => {
          return `.${className}:hover:focus`
        })
      })
    }),
  ],
})
