import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

// import store from '@/store'
// import { useLoginStore, useUIStore } from '@/store'
import router from '@/router'

const instance = axios.create({
  baseUrl: '/api/',
  timeout: 8000,
  headers: {
    'Content-type': 'application/json',
  },
})

const queue = new Map()
function closeGlobalSpinner(config) {
  const uuid = config.uuid
  queue.delete(uuid)
  if (queue.size === 0) {
    // const UIStore = useUIStore()
    // UIStore.CLOSE_GLOBAL_SPINNER()
  }
}

instance.interceptors.request.use(async (config) => {
  if (!config.hideGlobalSpinner) {
    // const UIStore = useUIStore()
    // await UIStore.OPEN_GLOBAL_SPINNER()
  }

  const uuid = uuidv4()
  const controller = new AbortController()
  queue.set(uuid, controller)

  const cfg = {
    ...config,
    uuid,
    signal: controller.signal,
  }
  // add token
  // const loginStore = useLoginStore()
  // if (loginStore.token) {
  //   cfg.headers.Authorization = `${loginStore.token}`
  // }

  return cfg
})

instance.interceptors.response.use(
  (response) => {
    closeGlobalSpinner(response.config)

    /**
     * 處理 server 回傳 200 OK 但是是錯誤的訊息
     */
    // checkServerError(response)

    /**
     * 解構 response data
     */
    return response.data
  },
  (error) => {
    closeGlobalSpinner(error.config)

    /**
     *  SPEC:
     *  如果是 request abort(因router change引起), 則不要顯示錯誤訊息，無視掉該次的操作
     */
    if (error.code === 'ERR_CANCELED') {
      return
    }

    /**
     * 確認是否為 server 引起的錯誤
     */
    if (error.response) {
      // checkServerError(error.response)
    }

    /**
     * throw axios error
     */
    throw error
  }
)

export const VueAxios = {
  install: (app, options) => {
    // app.config.globalProperties.$http = http
    // app.provide(injectionKey, http)
    /**
     * SPEC:
     * 在切換路由時取消所有的request
     */
    router.beforeEach((to, from, next) => {
      queue.forEach((controller) => {
        controller.abort()
      })

      next()
    })
  },
}

export default instance
