<template>
  <div class="w-600 mx-auto">
    <input
      id=""
      class="hocus:text-red-600"
      type="text"
      name=""
      value="dwadad"
    />
    <button class="roll" @click="rollDice">躑骰子</button>
    <button class="text-bool" @click="diceReset">Reset</button>
    <!-- <p v-if="isShowOutcome">Outcome</p> -->
    <div :ref="(el) => (dice.containerRef = el)" class="box">
      <transition
        :name="dice.transName"
        :css="isAllowTransition"
        @after-enter="onAfterRollingEnd"
      >
        <img
          v-if="dice.currentType === 'purple'"
          key="purple"
          class="dice"
          src="@/assets/dice_defaultPurple.png"
          width="120"
          height="120"
          alt
        />
        <img
          v-else-if="dice.currentType === 'blue'"
          key="blue"
          class="dice"
          src="@/assets/dice_defaultBlue.png"
          width="120"
          height="120"
          alt
        />
        <img
          v-else-if="dice.currentType === 'win'"
          key="win"
          class="dice dice-outcome--win"
          src="@/assets/dice_win.png"
          width="120"
          height="120"
          alt
        />
        <img
          v-else-if="dice.currentType === 'lose'"
          key="lose"
          class="dice dice-outcome--lose"
          src="@/assets/dice_lose.png"
          width="120"
          height="120"
          alt
        />
      </transition>
      <!-- outcome -->
      <div
        v-show="isShowOutcome"
        :class="`outcome-glow outcome-glow--${dice.currentType}`"
      ></div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'

export default {
  name: 'DiceRolling',
  setup() {
    // reactive
    const dice = reactive({
      currentType: 'purple', // 當前的 dice是哪個
      gleamList: ['purple', 'blue'], // 漸變效果需要哪些顏色的 dice
      gleamStartTime: null, // record dice color transition start time
      gleamAnimationFrame: null, // dice requestAnimationFrame (if there mutilple AnimationFrame in this component, split this attr out)
      transName: 'dice-trans', // dice transition name
      containerRef: null, // dice box element
    })
    const isAllowTransition = ref(true)
    const isShowOutcome = ref(false)

    // computed
    const isDefaultDice = computed(() =>
      dice.gleamList.includes(dice.currentType)
    )

    // animation
    // 骰子自動漸變
    function autoSwitchDice(timestamp) {
      if (!dice.gleamStartTime) dice.gleamStartTime = timestamp
      // 根據 gleamList的順序切換當前骰子
      const switchDice = () => {
        const diceCurrentIndex = dice.gleamList.indexOf(dice.currentType)
        const diceNextIndex =
          diceCurrentIndex === dice.gleamList.length - 1
            ? 0
            : diceCurrentIndex + 1

        dice.currentType = dice.gleamList[diceNextIndex]
      }
      // 每 1.2秒漸變一次
      if (timestamp - dice.gleamStartTime > 1200) {
        isAllowTransition.value = true
        switchDice()
        dice.gleamStartTime = timestamp
      }
      dice.gleamAnimationFrame = requestAnimationFrame(autoSwitchDice)
    }

    // change transition name to roll dice
    async function rollDice() {
      // isShowOutcome.value = false //清除上一輪的結果
      dice.currentType = 'purple'
      cancelAnimationFrame(dice.gleamAnimationFrame) // 清掉骰子漸變效果
      dice.transName = 'dice-rolling' // transition 換成 rolling效果

      // Notice: try to clear dice shadow
      if (isDefaultDice.value) {
        dice.containerRef.children[0].className = 'd-none'
      }
      await nextTick()
      // dice.currentType = dice.currentType === 'win' ? 'lose' : 'win'
      dice.currentType = 'win'
    }

    // hook
    function onAfterRollingEnd(e) {
      if (dice.transName === 'dice-rolling') {
      }
    }

    // reset
    // reset dice status
    async function diceReset() {
      isShowOutcome.value = false
      // 避免重置骰子樣式時產生 transition
      isAllowTransition.value = false
      dice.currentType = 'purple'
      dice.transName = 'dice-trans'
      // 先清除 AnimationFrame再打開，以避免錯誤
      cancelAnimationFrame(dice.gleamAnimationFrame)
      autoSwitchDice()
    }

    onMounted(() => {
      autoSwitchDice()
    })
    onUnmounted(() => {
      cancelAnimationFrame(dice.gleamAnimationFrame)
    })
    return {
      dice,
      rollDice,
      diceReset,
      isAllowTransition,
      isShowOutcome,
      onAfterRollingEnd,
    }
  },
}
</script>

<style lang="scss" scoped>
// .hocus\:text-red-600:focus {
//     color: red;
// }
.roll {
  @apply btn btn--primary;
}
.w-600 {
  width: 600px;
}
.mx-auto {
  margin: 0 auto;
}
.d-none {
  display: none !important;
}
.stop-animation {
  animation: none !important;
}

.box {
  position: relative;
  width: 400px;
  height: 400px;
  background-image: url('@/assets/dice_bg.png');
  background-position: center center;
  background-size: cover;
}
.dice {
  position: absolute;
  z-index: 1001;
  left: 50%;
  bottom: calc(400px * 0.15);
  transform: translateX(-50%);
  //dice-trans animation
  //duration
  &-trans-enter-active {
    animation: dice-fade-in 1s ease;
  }

  &-trans-leave-active {
    animation: dice-fade-in 3s reverse;
  }
  &-rolling-enter-active {
    animation: dice-fade-in 0.8s ease, dice-rolling 0.2s 4 linear,
      dice-bounce 0.8s linear !important;
  }
  &-rolling-leave-active {
    animation: dice-fade-in 0.8s reverse, dice-rolling 0.2s 4 linear,
      dice-bounce 0.8s linear !important;
  }
  &:not(.dice-rolling-enter-active) {
    &.dice-outcome--win {
      animation: dice-sway 0.25s linear;
      & + .outcome-glow {
        display: block !important;
      }
    }
    &.dice-outcome--lose {
      animation: dice-shake 0.25s linear;
      & + .outcome-glow {
        display: block !important;
      }
    }
  }
}

@keyframes dice-fade-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dice-rolling {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}
@keyframes dice-bounce {
  0% {
    bottom: calc(400px * 0.15);
  }
  25% {
    bottom: calc(400px * 0.25);
  }
  50% {
    bottom: calc(400px * 0.35);
  }
  75% {
    bottom: calc(400px * 0.25);
  }
  100% {
    bottom: calc(400px * 0.15);
  }
}
//outcome effect
@keyframes dice-sway {
  0% {
    transform: translateX(-50%) translateY(0px);
  }
  25% {
    transform: translateX(-50%) translateY(4px);
  }
  50% {
    transform: translateX(-50%) translateY(0px);
  }
  75% {
    transform: translateX(-50%) translateY(-4px);
  }
  100% {
    transform: translateX(-50%) translateY(0px);
  }
}
@keyframes dice-shake {
  0% {
    transform: translateX(-50%);
  }
  25% {
    transform: translateX(calc(-50% - 4px));
  }
  50% {
    transform: translateX(-50%);
  }
  75% {
    transform: translateX(calc(-50% + 4px));
  }
  100% {
    transform: translateX(-50%);
  }
}

.outcome-glow {
  display: none;
  position: absolute;
  left: 50%;
  bottom: calc(400px * 0.35);
  transform: translateX(-50%);
  width: 200px;
  height: 150px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
  opacity: 0.7;

  &--win {
    background-image: linear-gradient(
      360deg,
      #a0fff4 -19.73%,
      rgba(240, 255, 253, 0) 90.64%
    );
    animation: sparking 0.6s ease;
  }
  &--lose {
    background-image: linear-gradient(
      360deg,
      rgba(255, 0, 61, 0.74) -19.73%,
      rgba(142, 142, 142, 0) 90.64%
    );
    animation: sparking 0.6s ease;
  }
}

@keyframes sparking {
  0% {
    opacity: 0.7;
  }
  25% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
  75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.7;
  }
}
</style>
