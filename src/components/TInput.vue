<template>
  <div>
    <label for="hello">custom: </label>
    <input
      v-bind="attrs.field"
      id="hello"
      v-model.lazy="inputValue"
      class="form-control"
      type="text"
    />
    <button class="btn btn-secondary btn-sm">submit</button>
    <p v-if="attrs.meta.touched">{{ attrs.errorMessage }}</p>
    <!-- <button class="btn btn-sm btn-secondary" @click="handleReset()">
      HandleReset
    </button>
    <button class="btn btn-sm btn-secondary" @click="resetField()">
      ResetField
    </button> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  handleReset?: Function
  resetField?: Function
}>()
defineOptions({
  inheritAttrs: false,
})
// defineEmits('update:modelValue')
const attrs: any = useAttrs()
const inputValue = defineModel()

const { handleReset, resetField } = toRefs(props)

// watch(
//   () => inputValue.value,
//   (val) => emit('update:modelValue', val)
// )
</script>
