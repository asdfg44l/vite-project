<template>
  <div v-for="(v, i) in iconAmount" :key="v" class="box">
    <p class="">{{ i + 1 }}</p>
  </div>

  <div
    v-insectOb="{
      onEntry: onViewEntry,
      viewMargin: '10px 0px 10px 0px',
      // times: 4,
    }"
    class="observe"
  ></div>
</template>

<script setup>
const iconAmount = ref(5)
function onViewEntry() {
  return (iconAmount.value += 1)
}
</script>

<style>
.box {
  text-align: center;
  color: #fff;
  width: 300px;
  height: 200px;
  background-color: green;
  margin-bottom: 100px;
}
</style>
