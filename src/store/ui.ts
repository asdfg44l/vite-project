import { defineStore } from 'pinia'
import useDialogsStore from './dialogs'

function _init() {
  return {}
}
export default defineStore('ui', {
  state: () => _init(),
  actions: {
    OPEN_GLOBAL_SPINNER() {
      const dialogsStore = useDialogsStore()
      // return dispatch('dialogs/OPEN_SPINNER', payload, { root: true })
      return dialogsStore.OPEN_SPINNER()
    },
    CLOSE_GLOBAL_SPINNER() {
      const dialogsStore = useDialogsStore()
      // return dispatch('dialogs/CLOSE_SPINNER', payload, { root: true })
      return dialogsStore.CLOSE_SPINNER()
    },
    // OPEN_SYSTEM_DIALOG(payload: Record<string, any>) {
    //   const dialogsStore = useDialogsStore()
    //   // return dispatch('dialogs/GENERATE_INFO_MODAL', payload, { root: true })
    //   return dialogsStore.GENERATE_INFO_MODAL(payload)
    // },
  },
})
