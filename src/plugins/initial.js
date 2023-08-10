import { createVfm } from 'vue-final-modal'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { vMaska } from 'maska'
import { VueAxios } from './axios'
import { formatPlugin } from './Format'
import { IntersectionObserver } from './Vdirectives/IntersectionObserver'
import initVeeValidateRules from './VeeValidate'
import { AnimationFramePlugin } from '@/utils/requestAnimationFrame'
import i18n from '@/plugins/I18n'
import router from '@/router'

export function APP_INITIAL(app) {
  const pinia = createPinia()
  pinia.use(piniaPersist)

  app.use(i18n)
  app.use(router)
  app.use(pinia)
  app.use(VueAxios)
  app.use(createVfm())
  app.use(formatPlugin)
  app.use(AnimationFramePlugin)
  app.directive('insectOb', IntersectionObserver)
  app.directive('maska', vMaska)
  app.config.globalProperties.console = console
  initVeeValidateRules()

  return app
}
