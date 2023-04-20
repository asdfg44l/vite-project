import { createVfm } from 'vue-final-modal'
import { VueAxios } from './axios'
import { formatPlugin } from './Format'
import { IntersectionObserver } from './Vdirectives/IntersectionObserver'
import initVeeValidateRules from './VeeValidate'
import i18n from '@/plugins/I18n'
import store from '@/store'
import router from '@/router'

export function APP_INITIAL(app) {
  // import.meta.globEager("@/assets/*.svg")
  app.use(i18n)
  app.use(router)
  app.use(store)
  app.use(VueAxios)
  app.use(createVfm())
  app.use(formatPlugin)
  app.directive('insectOb', IntersectionObserver)
  app.config.globalProperties.console = console
  initVeeValidateRules()

  return app
}
