<template>
  <div>
    <p>hello Layout test</p>
    <Layout name="default" />
  </div>
</template>

<script lang="ts">
import Layout from '@/layouts/Layout.vue'
import { useTs } from '@/utils/test'

export default {
  components: { Layout },
  inheritAttrs: false,
  setup() {
    const { CMD } = useTs()
    console.log(CMD.GET_WINLOSE_DETAIL)
  },
}
</script>
