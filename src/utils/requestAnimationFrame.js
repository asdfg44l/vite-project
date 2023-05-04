import { inject } from 'vue'

function AnimationFrame(switcher, callback) {
  const animate = (timestamp) => {
    callback(timestamp)
    switcher.value = requestAnimationFrame(animate)
  }
  return animate
}

const injectionKey = Symbol('AnimationFramePlugin')

export function useAnimationFrame() {
  return inject(injectionKey)
}

export const AnimationFramePlugin = {
  install: (app, options) => {
    app.provide(injectionKey, { AnimationFrame })
  },
}
