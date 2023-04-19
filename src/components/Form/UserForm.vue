<template>
  <form class="flex flex-col h-full" @submit="onSubmit">
    <TInputComposed
      v-model="user.account"
      class="mb-4"
      input-class="block w-full px-2 py-1"
      label-class="block mb-1"
      title="Name"
      name="account"
      rules="required"
    />
    <TInputComposed
      v-model="user.email"
      input-class="block w-full px-2 py-1"
      label-class="block mb-1"
      title="Email"
      name="email"
      rules="required|email"
    />
    <button class="btn btn-sm btn-secondary rounded-[10px] block mt-auto -mx-4">
      Confirm
    </button>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate'

const props = defineProps({})

const emit = defineEmits(['update:userForm', 'confirm'])

const attrs = useAttrs()

const user = ref({
  account: '',
  email: '',
})

const { handleSubmit } = useForm()
const onSubmit = handleSubmit((value) => {
  emit('confirm', value)
})

watch(
  () => user.value,
  (val) => {
    emit('update:userForm', val)
  },
  { deep: true }
)
</script>
