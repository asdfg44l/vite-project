<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const props = defineProps<{
  name?: String
}>()

const { name: layoutName } = toRefs(props)
const route = useRoute()
const layout = shallowRef('div')

watch(
  () => route.meta?.layoutName,
  (val) => {
    const layoutPath = layoutName?.value ?? val ?? 'Default'

    layout.value = defineAsyncComponent(
      () =>
        import(
          layoutPath === 'Default'
            ? `./DefaultLayout.vue`
            : `./${layoutPath}Layout.vue`
        )
    )
  },
  { immediate: true }
)
</script>
