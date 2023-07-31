<template>
  <div :class="attrs.class">
    <label :class="attrs['label-class']" :for="attrs.id"
      >{{ attrs.title }}
    </label>
    <input
      :id="attrs.id"
      v-model.lazy="modelValue"
      class="form-control"
      :class="attrs['input-class']"
      :type="attrs.type"
      @blur="validateOnBlur()"
    />
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

<script setup lang="ts">
const props = defineProps<{
  name: string
  rules?: string | Record<any, any>
}>()
defineOptions({
  inheritAttrs: false,
})
const attrs: any = useAttrs()
const modelValue = defineModel()

const { name, rules } = toRefs(props)

const { errorMessage, handleBlur, validate, meta } = useField(name, rules, {
  initialValue: null,
  validateOnValueUpdate: false, // validate only onblur
})
async function validateOnBlur() {
  handleBlur()
  if (meta.touched) await validate()
}
</script>
