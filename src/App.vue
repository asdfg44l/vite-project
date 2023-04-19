<template>
  <Layout />
  <ModalsContainer />
  <DialogGroup />
</template>

<script>
import { ModalsContainer } from 'vue-final-modal'
import Layout from '@/layouts/Layout.vue'

export default {
  components: {
    Layout,
    ModalsContainer,
  },
  setup(props, context) {},
}
</script>
