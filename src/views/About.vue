<template>
    <div class="box" v-for="(v, i) in iconAmount" :key="v">
      {{ i + 1 }}
    </div>
    <div class="observe" ref="loadingObserver"></div>
</template>

<script>
import { onMounted, ref, nextTick, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useWorker } from '@/plugins/web_worker'
import { useHttp } from '@/plugins/axios'
// import { useFormat } from '@/plugins/format'

export default {
    setup() {
        const iconAmount = ref(5)
        const loadingObserver = ref(null)
        const { state, dispatch } = useStore()
        const http = useHttp()
        console.log({ state, dispatch })

        const options = {
            root: null, //可視範圍
            rootMargin: "10px 0px 10px 0px", //可視範圍邊界
            threshold: 0.3 //目標元素可視比例
        }
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(async entry => {
                if(entry.isIntersecting) {
                    //目標進入可視範圍時執行
                } else {
                    //目標離開可視範圍時執行
                }
            })
        }, options)

        //worker
        let mulity = useWorker('multiply')
        mulity.postMessage('hello multiply')

        mulity.onmessage = function(e) {
            console.log(e.data)
        }
        
        onMounted(() => {
            observer.observe(loadingObserver.value)
        })
        onBeforeUnmount(() => {
            observer.disconnect()
        })

        return { iconAmount, loadingObserver }
      
    },
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