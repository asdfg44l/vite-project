import type { App } from 'vue'
import { inject } from 'vue'
import BigNumber from 'bignumber.js'
import * as datePlugin from './date.ts'
import * as bigNumberPlugin from './bigNumber.ts'

const injectionKey = Symbol('formatPlugin')

const format = {
  BigNumber,
  ...datePlugin,
  ...bigNumberPlugin,
}

export function useFormat() {
  return inject(injectionKey) as typeof format
}

declare module 'vue' {
  // Bind to `this` keyword
  interface ComponentCustomProperties {
    $format: typeof format
  }
}

export const formatPlugin = {
  install: (app: App<Element>) => {
    app.config.globalProperties.$format = format
    app.config.globalProperties.BigNumber = BigNumber
    app.provide(injectionKey, format)
  },
}
