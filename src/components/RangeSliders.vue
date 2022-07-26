<template>
    <div class="bg-black">
        <div class="slider-container w-500 mx-auto">
            <div class="slider-digit-bar d-flex justify-content-between align-items-center">
                <span class="slider-digit" v-for="digit in [0, 25, 50, 75, 100]" :key="digit">{{digit}}</span>
            </div>
            <input class="slider" v-model="rate" type="range" min="1" max="100" name="rate">
        </div>
    </div> 
    <p class="mx-auto text-center">{{rate}}</p>
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
$border-radius: 48%;

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
.slider {
    &-container {
        padding: .5rem .75rem;
        border-radius: 6px;
        background: linear-gradient(180deg, #4C5572 0%, rgba(34, 44, 75, 0) 100%);
        box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.5);
    }
    &-digit {
        &-bar { //數字長度不一樣會造成有點偏離，所以往右增加最後一個數字的一半長度
            margin-right: -7px;
        }
        font-size: 12px;
        color: #B0BBCC;
    }
    appearance: none;
    overflow: hidden;
    height: $height;
    background: none;
    margin: 0;
    display: block;
    width: 100%;
    outline: none;
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: $height;
        background: $lower-background;
    }
    &::-webkit-slider-thumb {
        appearance: none;
        position: relative;
        cursor: pointer;
        width: $thumb-height;
        height: $thumb-height;
        top: 50%;
        background: url('@/assets/rangeSlider-btn.png');
        margin-top: calc(-1 * $thumb-height / 2);
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