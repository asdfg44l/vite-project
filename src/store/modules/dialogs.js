import { useModal } from 'vue-final-modal'
import TestModal from '@/components/Modal/TestModal.vue'
import Greeting from '@/components/Greeting.vue'

function _initState() {
  return {
    TestModal: Symbol.for('TestModal'),
  }
}

export default {
  namespaced: true,
  state: () => _initState(),
  actions: {
    OpenTestModal(_, { title = '', slots = {} } = {}) {
      const { open, close } = useModal({
        component: TestModal,
        attrs: {
          'overlay-transition': 'vfm-fade',
          'content-transition': 'vfm-fade',
          onConfirm() {
            close()
          },
          title,
        },
        slots: {
          default: Greeting,
        },
      })
      open()
    },
  },
}
