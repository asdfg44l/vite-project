<template>
  <h1 class="text-7xl">{{ counter }}</h1>
  <button class="btn btn-sm btn-secondary mt-4 mr-3" @click="animationStart()">
    Start
  </button>
  <button class="btn btn-sm btn-secondary mt-4 mr-3" @click="cancelAnimation()">
    Stop
  </button>
  <button class="btn btn-sm btn-secondary mt-4" @click="resetAnimation()">
    Reset
  </button>
</template>

<script setup>
import BigNumber from 'bignumber.js'
import { useAnimationFrame } from '@/utils/requestAnimationFrame'

const counter = ref(0)
const switcher = ref(null) // 存取 requestAnimationFrame
const startTime = ref(null) // 動畫開始時間，用計算時間間隔

const { AnimationFrame } = useAnimationFrame()

function increase(timestamp) {
  const totalValue = 1000000
  const totalTime = 10000 // 毫秒

  if (counter.value >= totalValue) {
    counter.value = totalValue
    return
  }
  // linear
  // 約每17毫秒更新一次
  // counter.value += (totalValue / totalTime) * 17

  // ease
  if (!startTime.value) startTime.value = timestamp
  const timespace = new BigNumber(timestamp).minus(startTime.value).toNumber()

  /**
   * v = totalValue
   * s = totalTime
   * 斜率= 2v/s^2
   */
  counter.value = new BigNumber(2 * totalValue)
    .div(totalTime ** 2)
    .times(timespace)
    .times(timespace)
    .div(2)
    .toFormat(5, { decimalSeparator: '.', groupSeparator: '' })
}
function cancelAnimation() {
  return cancelAnimationFrame(switcher.value)
}
function resetAnimation() {
  counter.value = 0
  startTime.value = null
  cancelAnimation()
}
const animationStart = AnimationFrame(switcher, increase)
</script>
