<template>
  <div class="flex flex-col h-full" :validation-schema="validationSchema">
    <TInputComposed
      v-model="user.name"
      class="mb-4"
      input-class="block w-full px-2 py-1"
      label-class="block mb-1"
      title="Name"
      name="name"
    />
    <TInputComposed
      v-model="user.type"
      input-class="block w-full px-2 py-1"
      label-class="block mb-1"
      title="Type"
      name="type"
    />
    <button
      v-if="attrs.haveButton"
      class="btn btn-secondary block mt-auto -mx-4"
      @click="onSubmit()"
    >
      Confirm
    </button>
  </div>
</template>

<script setup>
import { object, string } from 'yup'
import { useTForm } from './_useTForm'

const emit = defineEmits(['update:TForm', 'confirm', 'exposeSubmit'])

const attrs = useAttrs()

const user = reactive({
  name: '',
  type: '',
})
// form rule schema
const validationSchema = object({
  name: string().required(),
  type: string().required(),
})

const { onSubmit } = useTForm(user, emit, validationSchema)
</script>
