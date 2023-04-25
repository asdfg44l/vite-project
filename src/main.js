import { createApp } from 'vue'
import App from './App.vue'
// plugins'
import '@/assets/fonts/_fontCSS.scss'
import 'virtual:windi.css'
import 'virtual:svg-icons-register'
import 'vue-final-modal/style.css'
import { APP_INITIAL } from './plugins/initial'

const app = createApp(App)

APP_INITIAL(app)

app.mount('#app')
