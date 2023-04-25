<template>
  <h1 class="mb-3 font-bruno">vue-final-modal</h1>
  <div class="flex gap-3">
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

const { dispatch } = useStore()
const vfm = useVfm()

function vfmOpen() {
  vfm.open(Symbol.for('TestModal'))
}
function formOpen() {
  dispatch(DIALOGS.OPEN_FORM_MODAL, {
    keepAlive: true,
    title: 'USER-FORM',
    innerForm: 'UserForm',
    storePath: 'profile/SET_USER_PROFILE',
    resetPath: 'profile/RESET_USER_PROFILE',
    submitPath: 'profile/SEND_PROFILE',
  })
}
</script>
