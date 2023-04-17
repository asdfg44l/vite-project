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

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object, undefined],
    },
    handleReset: {
      type: Function,
    },
    resetField: {
      type: Function,
    },
  },
  emits: {
    'update:modelValue': null,
  },
  setup(props, { attrs, emit }) {
    const inputValue = ref(null)
    const { handleReset, resetField } = toRefs(props)

    watch(
      () => inputValue.value,
      (val) => emit('update:modelValue', val)
    )

    return {
      attrs,
      inputValue,
      handleReset,
      resetField,
    }
  },
}
</script>
