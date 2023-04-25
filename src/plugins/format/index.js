import { inject } from 'vue'
import { AddTime, commonTime } from './date'

const injectionKey = Symbol('formatPlugin')

const format = {
  commonTime,
  AddTime,
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
