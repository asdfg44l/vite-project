<template>
  <div>
    <label for="mult">Worker:</label>
    <input
      @keypress.enter="sendMessage"
      type="text"
      v-model="multInput"
      name="mult"
      id="mult"
    />
    <button class="btn btn--primary" @click="sendMessage">send</button>
  </div>
  <div v-if="false">
    <label for="socket">WebSocket:</label>
    <input
      @keypress.enter="wsSendMsg"
      type="text"
      v-model="socketInput"
      name="mult"
      id="mult"
    />
    <button class="btn btn--primary" @click="wsSendMsg">send</button>
  </div>
  <!-- <div class="box skew-y-10" v-for="(v, i) in iconAmount" :key="v">
    <p class="">{{ i + 1 }}</p>
  </div> -->
  <h3>
    {{ $format.commonTime(new Date()) }}
  </h3>
  <TSuspense>
    <UserList />
    <template #fallback>loading...</template>
  </TSuspense>
  <TIcon name="card_club" class="w-8 h-8" />
  <!-- <div
    class="observe"
    v-insectOb="{
      onEntry: onViewEntry,
      viewMargin: '10px 0px 10px 0px',
      times: 4,
    }"
  ></div> -->
</template>

<script>
import { onMounted, ref, nextTick, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import mulityWorker from "@/plugins/web_worker/multiply.js?worker";
import { createConnect } from "@/plugins/web_worker/websocket.js";
// import { useWorker } from "@/plugins/web_worker";
// import { useHttp } from "@/plugins/axios";
// import { useFormat } from '@/plugins/format'

//components
import UserList from "@/components/Async/UserList.vue";
import TSuspense from "@/components/TSuspense.vue";
import TIcon from "@/components/TIcon.vue";

export default {
  components: { UserList, TSuspense, TIcon },
  setup() {
    const iconAmount = ref(5);
    const multInput = ref("");
    const socketInput = ref("");
    const { state, dispatch } = useStore();
    const mulity = new mulityWorker();

    const onViewEntry = () => {
      iconAmount.value += 1;
    };
    //worker
    const sendMessage = () => {
      mulity.postMessage(multInput.value);
    };

    mulity.onmessage = function (e) {
      console.log(e.data);
    };
    //websocket
    // let ws = createConnect(
    //   "wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"
    // );
    // const wsSendMsg = () => ws.send(socketInput.value);

    return {
      iconAmount,
      sendMessage,
      multInput,
      //   wsSendMsg,
      //   socketInput,
      onViewEntry,
    };
  },
};
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
