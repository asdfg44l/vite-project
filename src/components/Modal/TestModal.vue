<template>
  <VueFinalModal v-bind="attrs" class="modal" :content-class="contentClass">
    <h1 class="text-center text-2xl my-2">{{ attrs.title }}</h1>
    <div class="px-4 pt-2 flex-auto">
      <slot></slot>
    </div>
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps({
  size: {
    type: String,
    default: () => 'md',
  },
})
const emit = defineEmits({
  confirm: null,
})
const attrs = useAttrs()

const { size } = toRefs(props)

const contentClass = computed(() => `modal-content modal-${size.value}`)
</script>
