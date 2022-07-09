import { createApp } from 'vue'
import App from './App.vue'
import Router from "./router/index";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./main.css";
import { mountFormRender9 } from "./components/formRender9";

let vueApp = createApp(App);
vueApp.use(Antd).use(Router).mount("#app");
mountFormRender9(vueApp);
