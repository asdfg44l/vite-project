<template>
  <div :class="attrs.class">
    <label :class="attrs['label-class']" :for="attrs.id"
      >{{ attrs.title }}
    </label>
    <input
      :id="attrs.id"
      v-model.lazy="value"
      class="form-control"
      :class="attrs['input-class']"
      :type="attrs.type"
      @blur="validateOnBlur()"
    />
    <!-- <button class="btn btn-secondary btn-sm">submit</button> -->
    <p v-if="meta.touched && errorMessage">{{ errorMessage }}</p>
    <p v-else class="invisible">default</p>
    <!-- <button class="btn btn-sm btn-secondary" @click="handleReset()">
      HandleReset
    </button>
    <button class="btn btn-sm btn-secondary" @click="resetForm()">
      ResetForm
    </button> -->
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
const props = defineProps({
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
})
const emit = defineEmits(['update:modelValue'])
const attrs = useAttrs()

const { name, rules } = toRefs(props)

const { value, errorMessage, handleBlur, validate, meta } = useField(
  name,
  rules,
  {
    initialValue: null,
    validateOnValueUpdate: false, // validate only onblur
  }
)
async function validateOnBlur() {
  handleBlur()
  if (meta.touched) await validate()
}

watch(
  () => value.value,
  (val) => emit('update:modelValue', val)
)
</script>
