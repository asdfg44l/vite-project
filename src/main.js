import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//plugins
import { VueAxios } from './plugins/axios'
import { formatPlugin } from './plugins/format'

const app = createApp(App)

app.use(router)
app.use(VueAxios)
app.use(formatPlugin)
app.use(store)
app.mount('#app')