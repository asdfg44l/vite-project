import { inject } from 'vue'
import { commonTime } from './date'

const injectionKey = Symbol('formatPlugin')

const format = {
  commonTime,
}

export function useFormat() {
  return inject(injectionKey)
}

export const formatPlugin = {
  install: (app, options) => {
    app.config.globalProperties.$format = format
    app.provide(injectionKey, format)
  },
}
