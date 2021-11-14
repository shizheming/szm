import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import input from "./components/input.vue";
import select from "./components/select.vue";
import form from "./components/form.vue";
createApp(App)
  .use(Antd)
  .component("s-input", input)
  .component("s-select", select)
  .component("s-form", form)
  .mount("#app");
