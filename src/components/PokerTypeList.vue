<template>
  <div class="poker-type-warp p-3">
    <div class="poker-type-list">
      <div class="poker-type-image icon-full-house"></div>
      <div class="poker-type-title flex items-center py-2">
        FULL HOUSE
        <div class="icon-info ml-3"></div>
      </div>
      <div class="poker-type-multipler py-2 mx-2">800.00x</div>
      <div class="poker-type-winamount p-2">
        0.00000000
        <span class="ml-2">icon</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
}
</script>

<style lang="scss" scoped>
.poker-type {
  &-warp {
    @apply mx-auto relative;
    width: 700px;
    color: #fff;
    background: #000;
  }
  &-list {
    width: 100%;
    position: relative;
    display: flex;
  }
  &-image {
    position: absolute;
  }
  &-title,
  &-winamount {
    border: 1px solid gray;
    border-radius: 5px;
  }
  &-title {
    flex-grow: 1;
    padding-left: 65px;
  }
  &-multipler {
    @apply px-2 py-1 flex items-center justify-center rounded-md cursor-pointer bg-[#5E6985] text-white;
  }
}
.icon {
  &-info {
    width: 15px;
    height: 15px;
    background-image: url('@/assets/info.svg');
  }
  &-full-house {
    width: 60px;
    height: 30px;
    left: -5px;
    top: 5px;
    background-image: url('@/assets/FULL_HOUSE.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
}
</style>
