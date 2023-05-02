import type { App } from 'vue'
import { inject } from 'vue'
import BigNumber from 'bignumber.js'
import * as datePlugin from './date'
import * as bigNumberPlugin from './bigNumber'

// export to global.d.ts
export const format = {
  BigNumber,
  ...datePlugin,
  ...bigNumberPlugin,
}

const injectionKey = Symbol('formatPlugin')

export function useFormat() {
  return inject(injectionKey) as typeof format
}

export const formatPlugin = {
  install: (app: App<Element>) => {
    app.config.globalProperties.$format = format
    app.config.globalProperties.BigNumber = BigNumber
    app.provide(injectionKey, format)
  },
}
