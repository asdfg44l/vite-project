<template>
  <VueFinalModal
    v-bind="attrs"
    class="flex justify-center items-center"
    content-class="flex flex-col justify-between w-[40%] h-[40%] bg-white rounded-[10px]"
  >
    <h1 class="text-center text-2xl my-2">{{ title }}</h1>
    <slot></slot>
    <button class="btn btn-sm btn-confirm" @click="$emit('confirm')">
      confirm
    </button>
  </VueFinalModal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

export default {
  components: {
    VueFinalModal,
  },
  props: {
    title: String,
  },
  emits: {
    confirm: null,
  },
  setup(props, { attrs }) {
    const { title } = toRefs(props)

    return {
      title,
      attrs,
    }
  },
}
</script>
