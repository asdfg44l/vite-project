<template>
    <div class="w-600 mx-auto">
        <p>hello dice</p>
        <button @click="rollDice" :disabled="!isAllowRolling">躑骰子</button>
        <button @click="diceReset">Reset</button>
        <div class="box" :ref="(el) => dice.containerRef = el">
            <transition-group
                :name="dice.transName"
                :css="isAllowTransition"
                @after-leave="diceAfterLeave"
            >
                <img v-if="dice.currentType == 'purple'" key="purple" class="dice"  src="@/assets/dice_defaultPurple.png" width="120" height="120" />
                <img v-else-if="dice.currentType  == 'blue'" key="blue" class="dice"  src="@/assets/dice_defaultBlue.png" width="120" height="120" />
                <img v-else-if="dice.currentType  == 'win'" key="win" class="dice"  src="@/assets/dice_win.png" width="120" height="120" />
                <img v-else-if="dice.currentType  == 'lose'" key="lose" class="dice"  src="@/assets/dice_lose.png" width="120" height="120" />
            </transition-group>
        </div>
    </div>
</template>    

<script>
import { reactive, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
export default {
    name: "DiceRolling",
    setup() {        
        //reactive
        const dice = reactive({
            currentType: 'purple', //當前的 dice是哪個
            gleamList: ['purple', 'blue'], //漸變效果需要哪些顏色的 dice
            gleamStartTime: null, //record dice color transition start time
            gleamAnimationFrame: null, //dice requestAnimationFrame (if there mutilple AnimationFrame in this component, split this attr out)
            transName: 'dice-trans', //dice transition name
            containerRef: null // dice box element
        })
        const isFirstRolling = ref(true)
        const isAllowRolling = ref(true)
        const isAllowTransition = ref(true)

        //animation
        //骰子自動漸變
        function autoSwitchDice(timestamp) {
            if (!dice.gleamStartTime) dice.gleamStartTime = timestamp
            //根據 gleamList的順序切換當前骰子
            const switchDice = () => {
                const diceCurrentIndex = dice.gleamList.indexOf(dice.currentType)
                const diceNextIndex = diceCurrentIndex === dice.gleamList.length - 1 ? 0 : diceCurrentIndex + 1

                dice.currentType = dice.gleamList[diceNextIndex]
            }
            //每 1.2秒漸變一次
            if(timestamp - dice.gleamStartTime > 1200) {
                isAllowTransition.value = true
                switchDice()
                dice.gleamStartTime = timestamp
            }
            dice.gleamAnimationFrame = requestAnimationFrame(autoSwitchDice)
        }


        //change transition name to roll dice
        async function rollDice() {
            cancelAnimationFrame(dice.gleamAnimationFrame)
            dice.transName = 'dice-rolling'

            // Notice: try to clear dice shadow
            if(dice.gleamList.indexOf(dice.currentType) !== -1) {
                dice.containerRef.children[0].setAttribute('height', 0)
            }

            await nextTick()

            dice.currentType = dice.currentType === 'win' ? 'lose' : 'win'
            
            if(isFirstRolling.value) isAllowRolling.value = false
            isFirstRolling.value = false
        }

        //transition hooks
        function diceAfterLeave(el) {
            isAllowRolling.value = true
        }

        //reset
        //reset dice status
        async function diceReset() {
            //避免重置時露出破綻
            isAllowRolling.value = false
            isFirstRolling.value = true //重置為初次擲骰
            //避免重置骰子樣式時產生 transition
            isAllowTransition.value = false
            dice.currentType = 'purple'
            dice.transName = 'dice-trans'
            //先清除 AnimationFrame再打開，以避免錯誤
            cancelAnimationFrame(dice.gleamAnimationFrame)
            autoSwitchDice()
        }

        // watch(
        //     () => dice.currentType,
        //     val => {
        //         if(val === 'win' | val === 'lose') {
        //             console.log('Dice Rolling!!!!!!')
        //         } 
        //     }
        // )

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
            isAllowRolling,
            isAllowTransition,
            diceAfterLeave
        }
    }
}
</script>

<style lang="scss" scoped>
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
    left: 50%;
    bottom: calc(400px * 0.15);
    transform: translateX(-50%);
    //dice-trans animation
    //duration
    &-trans-enter-active{
        animation: dice-fade-in 1s ease;
    }

    &-trans-leave-active {
        animation: dice-fade-in 3s reverse;
    }
    &-rolling-enter-active {
        animation: dice-fade-in 1s ease, dice-rolling .2s 4 linear, dice-bounce .8s linear !important;
    }
    &-rolling-leave-active {
        animation: dice-fade-in 3s reverse, dice-rolling .2s 4 linear, dice-bounce .8s linear !important;
    }
}

@keyframes dice-fade-in {
    0% { opacity: 0 }
    50% { opacity: 0.5 }
    100% { opacity: 1 }
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
    0% { bottom: calc(400px * 0.15) }
    25% { bottom: calc(400px * 0.25) }
    50% { bottom: calc(400px * 0.35) }
    75% { bottom: calc(400px * 0.25) }
    100% { bottom: calc(400px * 0.15) }
}
</style>