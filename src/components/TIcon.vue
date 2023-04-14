<template>
  <svg class="svg-icon" aria-hidden="true">
    <use class="svg-icon" :href="symbolId" />
  </svg>
</template>

<script>
import { computed, toRefs } from 'vue'

export default {
  props: {
    prefix: {
      type: String,
      default: 'trevi',
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { prefix, name } = toRefs(props)
    // console.log(props);
    const symbolId = computed(() => `#${prefix.value}-${name.value}`)
    // const symbolId = computed(() => "t-card_club");

    return {
      symbolId,
    }
  },
}
</script>

<style scoped>
.svg-icon {
}
</style>
