<template>
  <div>
    <div>Home Page</div>
    <router-link to="about" custom v-slot="{ href, route, navigate }">
      <a class="mr-2" :href="href" @click="navigate">
        {{ route.name }}
      </a>
    </router-link>
    <router-link to="layouttest">layouttest</router-link>
    <PokerTypeList />
    <div class="container mx-auto mt-3">
      <FlipPoker />
    </div>
    <!-- <DiceRolling /> -->
    <!-- <RangeSliders @update:ratio="handleRatioUpdate"/> -->
  </div>
</template>

<script>
import FlipPoker from "../components/FlipPoker.vue";
import PokerTypeList from "../components/PokerTypeList.vue";
// import DiceRolling from '../components/DiceRolling.vue'
// import RangeSliders from '../components/RangeSliders.vue'
export default {
  components: { FlipPoker, PokerTypeList },
  setup() {
    function handleRatioUpdate(payload) {
      console.log({ payload });
    }

    return {
      handleRatioUpdate,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
