<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
  props: {
    name: String,
  },
  setup(props) {
    const { name: layoutName } = toRefs(props);
    const route = useRoute();

    const layout = computed(() => {
      const layoutPrefix =
        layoutName.value ?? (route.meta.layoutName as string) ?? "Default";

      return defineAsyncComponent(
        () => import("./" + layoutPrefix + "Layout.vue")
      );
    });

    return {
      layout,
    };
  },
};
</script>
