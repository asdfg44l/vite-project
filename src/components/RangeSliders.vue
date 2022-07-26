<template>
    <div class="slider-container w-500 mx-auto">
        <input class="slider" v-model="rate" type="range" min="1" max="100" name="rate">
        <p>{{ rate }}</p>
    </div>
</template>

<script>
    import { ref } from 'vue'
    export default {
        setup() {
            const rate = ref(50)

            return {
                rate
            }
        }
    }
</script>

<style lang="scss" scoped>
$height: 30px;
$thumb-height: 30px;
$track-height: 6px;

// colours
$upper-color: #6DE344;
$lower-color: #FC0B36;
// $thumb-color: #0199ff;

$upper-background: linear-gradient(to bottom, $upper-color, $upper-color) 100% 50% / 100% $track-height no-repeat transparent;
$lower-background: linear-gradient(to bottom, $lower-color, $lower-color) 100% 50% / 100% $track-height no-repeat transparent;

//border-radius
$border-radius: 50%;

// Webkit cannot style progress so we fake it with a long shadow
// on the thumb element
@function webkit-slider-thumb-shadow($i: 1) {
  $val: #{$i}px 0 0 -#{calc(($thumb-height - $track-height) / 2)} #{$upper-color};
  @if $i == 1 {
    @for $k from 2 through 1000 {
      $val: #{$val}, webkit-slider-thumb-shadow($k);
    }
  }
  @return $val;
}
.w-500 {
    width: 400px;
}
.mx-auto {
    margin: 0 auto;
}

//slider
.slider {
    appearance: none;
    overflow: hidden;
    height: $height;
    border-radius: $border-radius;
    background: none;
    margin: 0;
    display: block;
    width: 100%;
    outline: none;
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: $height;
        background: $lower-background;
        border-radius: $border-radius;
    }
    &::-webkit-slider-thumb {
        appearance: none;
        position: relative;
        cursor: pointer;
        width: $thumb-height;
        height: $thumb-height;
        border: 0;
        top: 50%;
        background: url('@/assets/rangeSlider-btn.png');
        // background: $thumb-color;
        // margin-top: calc(-$thumb-height/2);
        margin-top: -15px;
        box-shadow: webkit-slider-thumb-shadow();
    }

    //Firefox
    .e-range::-moz-range-track,
    .e-range::-moz-range-progress {
    width: 100%;
    height: $height;
    background: $upper-background;
    }

    .e-range::-moz-range-progress {
    background: $lower-background;
    }

    .e-range::-moz-range-thumb {
        appearance: none;
        margin: 0;
        height: $thumb-height;
        width: $thumb-height;
        border-radius: $border-radius;
        border: 0;
    }
}
</style>