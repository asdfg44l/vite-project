import { createRouter, createWebHashHistory } from 'vue-router'

// route modules
import modules from './modulesLoader'

const router = createRouter({
  history: createWebHashHistory(),
  routes: modules,
})

export default router
