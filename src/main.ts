import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "reset-css";

import ElPlus from "element-plus";
import 'element-plus/theme-chalk/index.css'


const app = createApp(App).use(router)
app.use(ElPlus)

app.mount("#app");
