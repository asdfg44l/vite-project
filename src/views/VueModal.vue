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

const vfm = useVfm()

function vfmOpen() {
  vfm.open(Symbol.for('Spinner'))
}

const dialogsStore = useDialogsStore()
function formOpen() {
  dialogsStore.OPEN_FORM_MODAL({
    title: 'USER-FORM',
    innerForm: {
      formName: 'UserForm',
    },
    useStore: useProfileStore,
    stateName: 'SearchForm',
    resetAction: 'RESET_SEARCH_FORM',
    submitAction: 'POST_GAME_SEARCH',
  })
}
</script>
