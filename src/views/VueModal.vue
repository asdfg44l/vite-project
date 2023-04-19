<template>
  <h1 class="mb-3">vue-final-modal</h1>
  <div class="flex gap-3">
    <button class="btn btn-sm btn-secondary" @click="open()">
      Dynamic Modal
    </button>
    <button class="btn btn-sm btn-secondary" @click="vfmOpen()">
      Static Modal
    </button>
  </div>
</template>

<script>
// import TestModal from '@/components/Modal/TestModal.vue'
import { useVfm } from 'vue-final-modal'
import { useStore } from 'vuex'

export default {
  setup() {
    // const { open, close } = useModal({
    //   component: TestModal,
    //   attrs: {
    //     'overlay-transition': 'vfm-fade',
    //     'content-transition': 'vfm-fade',
    //     onConfirm() {
    //       close()
    //     },
    //     title: 'Hello',
    //   },
    // })
    const { dispatch, state } = useStore()
    const vfm = useVfm()

    function open() {
      dispatch('dialogs/OpenTestModal', { title: 'Hello' })
    }
    function vfmOpen() {
      vfm.open(Symbol.for('TestModal'))
    }

    return {
      open,
      vfmOpen,
    }
  },
}
</script>
