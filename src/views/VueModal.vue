<template>
  <h1 class="mb-3">vue-final-modal</h1>
  <div class="flex gap-3">
    <button class="btn btn-sm btn-secondary" @click="open()">
      Dynamic Modal
    </button>
    <button class="btn btn-sm btn-secondary" @click="vfmOpen()">
      Static Modal
    </button>
    <button class="btn btn-sm btn-secondary" @click="formOpen()">
      User Modal
    </button>
  </div>
</template>

<script setup lang="ts">
import { useVfm } from 'vue-final-modal'
import { useStore } from 'vuex'
import { DIALOGS } from '@/utils/config'

const { state, dispatch } = useStore()
const vfm = useVfm()

function open() {
  dispatch('dialogs/OpenTestModal', {
    title: 'Hello',
    callback: state.dialogs.callback.ProfileEmail,
  })
}
function vfmOpen() {
  vfm.open(Symbol.for('TestModal'))
}
function formOpen() {
  dispatch(DIALOGS.OPEN_USER_MODAL, {
    title: 'User-Form',
    callback: state.dialogs.callback.ProfileEmail,
  })
}
</script>
