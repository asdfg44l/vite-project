<template>
  <div>
    <p>layoutTestChild</p>
    <input type="date" v-model="days" name="time" />
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  setup() {
    const days = ref();
    watch(days, (val) => console.log(new Date(val).getTime()));
    return {
      days,
    };
  },
};
</script>
