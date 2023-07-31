<template>
  <!-- mulity worker -->
  <div>
    <p class="mb-3">Mulity Worker</p>
    <div>
      <label class="mr-1" for="mult">Worker:</label>
      <input
        id="mult"
        v-model="multInput"
        class="form-control"
        type="text"
        name="mult"
        @keypress.enter="mulitySendMge"
      />
      <button class="btn btn-secondary btn-sm ml-2" @click="mulitySendMge">
        send
      </button>
    </div>
    <div class="mt-1">
      <p>
        Output: <br />
        <span class="ml-4">{{ multOutput }}</span>
      </p>
    </div>
  </div>
  <!-- websocket worker -->
  <div class="mt-4">
    <label class="mr-1" for="socket">WebSocket:</label>
    <input
      id="socket"
      v-model="socketInput"
      class="form-control"
      type="text"
      name="socket"
      @keypress.enter="socketSendMsg"
    />
    <button class="btn btn-secondary btn-sm ml-2" @click="socketSendMsg">
      send
    </button>
  </div>
</template>

<script setup>
import MulityWorker from '@/plugins/Web_worker/multiply.js?worker'
import { createConnect } from '@/plugins/Web_worker/websocket.js'

const socketKey =
  'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV'

// mulity
const multInput = ref('')
const multOutput = ref('')
const mulity = new MulityWorker()
function mulitySendMge() {
  return mulity.postMessage(multInput.value)
}
mulity.onmessage = (e) => (multOutput.value = e.data)

// websocket
const socketInput = ref('')
const ws = createConnect(socketKey)
function socketSendMsg() {
  return ws.send(socketInput.value)
}

onUnmounted(() => {
  ws.close()
})
</script>
