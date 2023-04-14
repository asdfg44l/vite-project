<template>
  <button class="btn" @click="onPokerFlipUp">Flip Card</button>
  <div class="card-warp flex p-3">
    <div
      v-for="card in cardList"
      :key="card.key"
      class="card"
      :class="{ 'card-cover': card.isCover, 'card-checked': card.isCheck }"
      @click="toggleCheck(card)"
    >
      <div class="card-front">
        <p class="card-point text-5xl" :class="[getSuitColor(card.suit)]">
          {{ card.name }}
        </p>
        <p class="card-suit"></p>
      </div>
      <div class="card-back"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const cardList = ref([
      {
        key: 'A',
        name: 'A',
        suit: 'spades',
        isCheck: false,
        isCover: true,
      },
      {
        key: 'K',
        name: 'K',
        suit: 'hearts',
        isCheck: false,
        isCover: true,
      },
      {
        key: 'Q',
        name: 'Q',
        suit: 'hearts',
        isCheck: false,
        isCover: true,
      },
      {
        key: 'J',
        name: 'J',
        suit: 'spades',
        isCheck: false,
        isCover: true,
      },
      {
        key: '10',
        name: '10',
        suit: 'diamonds',
        isCheck: false,
        isCover: true,
      },
    ])
    const flipFrame = ref(null)
    const flipStartTime = ref(null)

    const isCover = ref(true) // 蓋牌狀態
    const isInit = ref(true) // 起始狀態
    const toggleCheck = (card) => {
      if (isCover.value) return
      const { key } = card
      cardList.value.forEach((item) => {
        if (item.key === key) {
          item.isCheck = !item.isCheck
        }
      })
      // 計算牌型...
    }
    // 控制是否逐個翻牌
    // Notice: 因為是蓋牌起手，第一次翻牌的時候不需要動畫
    const onPokerFlipUp = () => {
      isCover.value = !isCover.value
      // 直接切換牌的狀態，不會有動畫 (蓋牌或者第一次翻牌)
      if (isCover.value || isInit.value) {
        cardList.value.forEach((item) => {
          if (!item.isCheck) item.isCover = !item.isCover
        })
        isInit.value = false
      } else {
        // 逐張開牌, 計算結果
        handlePokerFlipUp()
        // 計算結果並用綠框選取起來
      }
    }
    // 逐張開牌
    function handlePokerFlipUp(timestamp) {
      if (!flipStartTime.value) flipStartTime.value = timestamp
      // 每 0.3秒開一張
      if (timestamp - flipStartTime.value >= 300) {
        // Notice: 每次只開一張，並且會確認下一張是誰
        let isAnyCardCover = false
        let isFlipCard = false
        cardList.value.forEach((item) => {
          if (!isFlipCard && item.isCover) {
            item.isCover = false
            isFlipCard = true
          } else if (isFlipCard && item.isCover) {
            isAnyCardCover = true
          }
        })

        flipStartTime.value = timestamp
        if (!isAnyCardCover) {
          cancelAnimationFrame(flipFrame.value)
          return
        }
      }
      flipFrame.value = requestAnimationFrame(handlePokerFlipUp)
    }

    // 取得該花色的字體顏色
    function getSuitColor(suit) {
      const classes = 'card-point'
      return suit === 'spades' || suit === 'clubs'
        ? `${classes}--dark`
        : `${classes}--cherry`
    }

    return {
      cardList,
      getSuitColor,
      toggleCheck,
      onPokerFlipUp,
    }
  },
}
</script>

<style lang="scss" scoped>
.btn {
  background-color: antiquewhite;
  border: 1px solid salmon;
  border-radius: 5px;
}
.card {
  position: relative;
  width: 104px;
  height: 145px;
  margin: 0 0.75rem;
  // 3d setting
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  &-point {
    font-weight: 600;
    margin-top: 10%;
    margin-left: 18%;
    &--dark {
      color: #2e3d52;
    }
    &--cherry {
      color: #ff7171;
    }
  }
  &-warp {
    background-color: black;
  }
  &-cover {
    transform: rotateY(180deg);
  }
  &-front,
  &-back {
    backface-visibility: hidden;
  }
  &-front {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    background-color: #fff;
  }
  //卡背圖片貌似有隱形邊界，所以這樣處理
  &-back {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-image: url('@/assets/card_back.png');
    background-repeat: no-repeat;
    background-size: 105%;
    background-position: 50% 5%;
    transform: rotateY(180deg);
  }
  //style
  &-checked {
    border-radius: 5px;
    box-shadow: 0 0 4px 5px #ffd600;
    .card-front {
      box-shadow: inset 0 0 0 4px #9f1fe8;
    }
  }
}
</style>
