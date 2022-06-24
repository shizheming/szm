import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index.js";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

createApp(App).use(Antd).use(Router).mount("#app");
