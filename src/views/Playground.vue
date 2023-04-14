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
</template>

<script>
import { onBeforeRouteUpdate } from 'vue-router'
import TextContent from '@/components/Functional/TestFunctional.js'

export default {
  components: { TextContent },
  setup() {
    onBeforeRouteUpdate((to, from) => {
      if (to.params.name === 'hello') {
        console.log(to)
      }
    })
  },
}
</script>
