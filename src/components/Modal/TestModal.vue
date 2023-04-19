<template>
  <VueFinalModal
    v-bind="attrs"
    class="flex justify-center items-center"
    content-class="flex flex-col w-[40%] h-[40%] bg-white rounded-[10px]"
  >
    <h1 class="text-center text-2xl my-2">{{ title }}</h1>
    <div class="px-4 pt-2 flex-auto">
      <slot></slot>
    </div>
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
