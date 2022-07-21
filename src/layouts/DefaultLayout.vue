<template>
  <h3>default version: {{ VERSION }}</h3>
  <slot></slot>
</template>

<script>
export default {
  setup() {
    return {
      VERSION: __APP_VERSION__,
    };
  },
};
</script>
