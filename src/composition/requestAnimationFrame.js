import { inject } from 'vue'

function AnimationFrame(callback) {
  const animate = (timestamp) => {
    callback(timestamp)
    requestAnimationFrame(animate)
  }

  return () => requestAnimationFrame(animate)
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
