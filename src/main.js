import { createApp } from "vue";
import App from "./App.vue";
//plugins'
import "virtual:windi.css";
import "virtual:svg-icons-register";
import { APP_INITIAL } from "./plugins/initial";

const app = createApp(App);

APP_INITIAL(app);

app.mount("#app");
