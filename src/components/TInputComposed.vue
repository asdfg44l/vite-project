<template>
  <div>
    <label for="hello3">customComposed: </label>
    <input
      id="hello3"
      v-model.lazy="value"
      class="form-control"
      type="text"
      @blur="validateOnBlur()"
    />
    <button class="btn btn-secondary btn-sm">submit</button>
    <p v-if="meta.touched && errorMessage">{{ errorMessage }}</p>
    <!-- <button class="btn btn-sm btn-secondary" @click="handleReset()">
      HandleReset
    </button>
    <button class="btn btn-sm btn-secondary" @click="resetForm()">
      ResetForm
    </button> -->
  </div>
</template>

<script>
import { useForm } from 'vee-validate'
import { watch } from 'vue'

export default {
  props: {
    modelValue: {
      type: [String, Number, Object, undefined],
    },
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: [String, Object, undefined],
    },
  },
  emits: {
    'update:modelValue': null,
  },
  setup(props, { emit }) {
    const { name, rules } = toRefs(props)
    const { resetForm } = useForm()
    const {
      value,
      errorMessage,
      handleBlur,
      handleReset,
      resetField,
      validate,
      meta,
    } = useField(name, rules, {
      initialValue: null,
      validateOnValueUpdate: false, // validate only onblur
    })

    const validateOnBlur = async () => {
      handleBlur()
      if (meta.touched) {
        await validate()
      }
    }

    watch(
      () => value.value,
      (val) => emit('update:modelValue', val)
    )

    return {
      value,
      errorMessage,
      validateOnBlur,
      handleReset,
      resetField,
      resetForm,
      meta,
    }
  },
}
</script>
