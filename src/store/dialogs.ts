import { defineStore } from 'pinia'
import { useVfm } from 'vue-final-modal'

interface DIALOGS_STATE {
  TestModal: Record<string, any>
  Spinner: Record<string, any>
  cacheModal: Record<string, any>
}

function _initState(): DIALOGS_STATE {
  return {
    TestModal: {
      key: Symbol.for('BasicFormModal'),
    },
    Spinner: {
      key: Symbol.for('Spinner'),
    },
    cacheModal: {},
  }
}

export default defineStore('dialogs', {
  state: (): DIALOGS_STATE => _initState(),
  actions: {
    OPEN_SPINNER() {
      // const {
      //   Spinner: { key: modalId },
      // } = state
      const modalId = this.Spinner.key

      const vfm = useVfm()
      const { open } = vfm

      /**
       * Issue,
       * 為了避免重複開啟Spinner，且因為open()是非同步的，所以不能用 useModal 的做法
       *
       * 改把 Spinner 放在 DialogGroup裡面
       */
      return open(modalId)
    },
    async CLOSE_SPINNER() {
      // const {
      //   Spinner: { key: modalId },
      // } = state
      const modalId = this.Spinner.key

      const vfm = useVfm()
      const { close } = vfm

      return close(modalId)
    },
  },
})
