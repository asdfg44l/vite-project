<template>
  <div class="px-2">
    <h3 class="mb-2">[Layout] default version: {{ VERSION }}</h3>
    <div class="flex gap-4">
      <template v-for="router in routerList" :key="router">
        <router-link :to="router" custom v-slot="{ href, route, navigate }">
          <a class="btn btn-primary capitalize" :href="href" @click="navigate">
            {{ route.name }}
          </a>
        </router-link>
      </template>
    </div>
    <div class="mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const routerList = [
      "veevalidate",
      "suspense",
      "svgIcon",
      "intersectionObserver",
      "webworker",
      "playground",
    ];
    return {
      VERSION: __APP_VERSION__,
      routerList,
    };
  },
};
</script>
