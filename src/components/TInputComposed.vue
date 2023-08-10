<template>
  <div :class="attrs.class">
    <label :class="attrs['label-class']" :for="attrs.id"
      >{{ attrs.title }}
    </label>
    <input
      :id="attrs.id"
      v-model="value"
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
import { useTInput } from './_useInput'

const props = defineProps<{
  modelValue: string | number | Record<string, any> | undefined
  name: string
  rules?: string | Record<any, any>
}>()
const emit = defineEmits(['update:modelValue'])
defineOptions({
  inheritAttrs: false,
})
const attrs: any = useAttrs()

const { modelValue, name, rules } = toRefs(props)

const { value, errorMessage, handleBlur, validate, meta } = useTInput(emit, {
  modelValue,
  name,
  rules,
})

async function validateOnBlur() {
  handleBlur()
  if (meta.touched) await validate()
}
</script>
