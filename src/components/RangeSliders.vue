<template>
  <div class="bg-black">
    <div class="slider-container w-500 mx-auto">
      <div
        class="slider-digit-bar d-flex justify-content-between align-items-center"
      >
        <span
          v-for="digit in [0, 25, 50, 75, 100]"
          :key="digit"
          class="slider-digit"
          >{{ digit }}</span
        >
      </div>
      <div class="slider-warp">
        <input
          ref="sliderBar"
          v-model="ratio"
          class="slider"
          type="range"
          min="1"
          max="100"
          name="ratio"
        />
      </div>
    </div>
  </div>
  <p class="mx-auto text-center">{{ ratio }}</p>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  emits: ['update:ratio'],
  setup(props, { emit }) {
    const ratio = ref(50)
    const sliderBar = ref(null)

    function onRangeSliderChange(val) {
      sliderBar.value.style.backgroundSize = `${val}% 100%`
      emit('update:ratio', { ratio: val })
    }

    watch(
      () => ratio.value,
      (val) => onRangeSliderChange(val)
    )
    return {
      ratio,
      sliderBar,
    }
  },
}
</script>

<style lang="scss" scoped>
.w-500 {
  width: 400px;
}
.mx-auto {
  margin: 0 auto;
}
.text-center {
  text-align: center;
}

//flex
.d-flex {
  display: flex;
}
.justify-content-between {
  justify-content: space-between;
}

.bg-black {
  padding: 10px 0;
  background-color: black;
}

//slider
$height: 30px;
$thumb-height: 30px;
$track-height: 6px;

// colours
$upper-color: #6de344;
$lower-color: #fc0b36;
$digit-color: #b0bbcc;
.slider {
  appearance: none;
  margin: 0;
  outline: none;
  position: relative;
  top: 50%;
  display: block;
  width: 100%;
  height: $track-height;
  border-radius: 10px;
  background-color: $upper-color;
  background-image: linear-gradient(
    90deg,
    $lower-color 0 50%,
    $lower-color 50% 100%
  );
  background-size: 50% 100%;
  background-repeat: no-repeat;

  &-container {
    box-sizing: border-box;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    background: linear-gradient(180deg, #4c5572 0%, rgba(34, 44, 75, 0) 100%);
    box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.5);
  }
  &-digit {
    &-bar {
      //數字長度不一樣會造成有點偏離，所以往右增加最後一個數字的一半長度
      margin-right: -7px;
    }
    font-size: 12px;
    color: $digit-color;
  }
  &-warp {
    height: $thumb-height;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: $thumb-height;
    background: none;
  }
  &::-webkit-slider-thumb {
    appearance: none;
    cursor: pointer;
    width: $thumb-height;
    height: $thumb-height;
    background: url('@/assets/rangeSlider-btn.png');
  }

  //Firefox
  // .e-range::-moz-range-track,
  // .e-range::-moz-range-progress {
  // width: 100%;
  // height: $height;
  // background: $upper-background;
  // }

  // .e-range::-moz-range-progress {
  // background: $lower-background;
  // }

  // .e-range::-moz-range-thumb {
  //     appearance: none;
  //     margin: 0;
  //     height: $thumb-height;
  //     width: $thumb-height;
  //     border-radius: $border-radius;
  //     border: 0;
  // }
}
</style>
