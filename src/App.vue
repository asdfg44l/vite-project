<template>
  <Layout />
  <ModalsContainer />
  <DialogGroup />
</template>

<script>
import { ModalsContainer } from 'vue-final-modal'
import Layout from '@/layouts/Layout.vue'

export default {
  components: {
    Layout,
    ModalsContainer,
  },
  setup(props, context) {
    const states = reactive({
      deferredPrompt: null,
    })
    onMounted(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        states.deferredPrompt = e
      })
      window.addEventListener('appinstalled', () => {
        states.deferredPrompt = null
      })
      document.querySelector('#app').addEventListener('click', () => {
        if (states.deferredPrompt) {
          states.deferredPrompt.prompt()
          states.deferredPrompt = null
        }
      })
    })
  },
}
</script>
