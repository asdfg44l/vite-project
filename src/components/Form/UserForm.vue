<template>
  <form class="flex flex-col h-full" @submit="onSubmit">
    <TInputComposed
      v-model="user.account"
      class="mb-4"
      input-class="block w-full px-2 py-1"
      label-class="block mb-1"
      title="Name"
      name="account"
    />
    <TInputComposed
      v-model="user.email"
      input-class="block w-full px-2 py-1"
      label-class="block mb-1"
      title="Email"
      name="email"
    />
    <button
      v-if="attrs.haveButton"
      class="btn btn-secondary block mt-auto -mx-4"
    >
      Confirm
    </button>
  </form>
</template>

<script setup>
import { object, string } from 'yup'
import { useTForm } from './_useTForm'

const emit = defineEmits(['update:TForm', 'confirm', 'exposeSubmit'])

const attrs = useAttrs()

const user = ref({
  account: '',
  email: '',
})
// form rule schema
const validationSchema = object({
  account: string().required(),
  email: string().required().email(),
})

const { onSubmit } = useTForm(user, emit, validationSchema)
</script>
