<template>
  <router-view></router-view>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const message = ref("")

    return { message }
  },
}
</script>

