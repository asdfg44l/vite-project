import { defineConfig } from "windicss/helpers";

import plugin from "windicss/plugin"
import colors from "windicss/colors"
import defaultTheme from "windicss/defaultTheme";

export default defineConfig({
    darkMode: "class",
    theme: {
        extend: {
            screens: {
                'table': '765px'
            }
        }
    },
    plugins: [
        plugin(({ addComponents }) => {
            const buttons = {
                '.btn': {
                    padding: '.5rem 1rem',
                    borderRadius: '10px',
                    '&--primary': {
                        backgroundColor: colors.emerald[500]
                    }
                },
                '.btn-sm': {
                    padding: '.25rem .5rem'
                },
                // '.btn--primary': {
                //     backgroundColor: colors.emerald[500]
                // }
            }

            addComponents(buttons)
        }),
        plugin(({ addDynamic, variants }) => {
            addDynamic('skew-y', ({ Utility, Style }) => {
                return Utility.handler
                  .handleStatic(Style('skew-y'))
                  .handleNumber(0, 300, 'int', number => `skewY(-${number}deg)`)
                  .createProperty('transform')
            })
        }),
        plugin(({ addVariant }) => {
            addVariant('hocus', ({ modifySelectors }) => {
              return modifySelectors(({ className }) => {
                return `.${className}:hover:focus`
              })
            })
        })
    ]
})