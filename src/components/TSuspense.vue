<template>
  <Suspense @pending="pending" @resolve="resolve">
    <slot></slot>
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
  </Suspense>
</template>

<script setup>
const props = defineProps({
  pending: {
    type: Function,
    default: () => console.log('pending'),
  },
  resolve: {
    type: Function,
    default: () => console.log('resolve'),
  },
})
const { pending, resolve } = toRefs(props)
</script>
