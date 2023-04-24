<template>
  <h1>Playground</h1>
  <p>Test everything you want here</p>
  <TextContent
    type="h3"
    content="hello functional"
    :text-list="['hi', 'this', 'is', 'render', 'by', 'functional', 'component']"
  >
    <p>this is a slot</p>
    <p>that is a slot</p>
    <template #title="{ name }">
      <h2>Hello Title: {{ name }}</h2>
    </template>
  </TextContent>
  <hr />
  <UserForm
    class="max-w-md"
    @update:TForm="updateUserForm"
    @exposeSubmit="(value) => (submit = value)"
    @confirm="send"
  />
  <button type="submit" @click="submit()">submit</button>
</template>

<script setup>
import TextContent from '@/components/Functional/TestFunctional.js'

const form = ref({
  username: '',
  userEmail: '',
})
const submit = ref()

function updateUserForm({ account, email }) {
  form.value.username = account
  form.value.userEmail = email
}

function send(value) {
  console.log(value)
}

onBeforeRouteUpdate((to, from) => {
  if (to.params.name === 'hello') {
    console.log(to)
  }
})
</script>
