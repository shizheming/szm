import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import input from "./components/input.vue";
import select from "./components/select.vue";
import form from "./components/form.vue";
import aswitch from './components/switch.vue';
import cascader from './components/cascader.vue';
import checkbox from './components/checkbox.vue';
import checkboxGroup from './components/checkboxGroup.vue';

createApp(App)
  .use(Antd)
  .component("s-input", input)
  .component("s-select", select)
  .component("s-form", form)
  .component("s-switch", aswitch)
  .component("s-cascader", cascader)
  .component("s-checkbox", checkbox)
  .component("s-checkbox-group", checkboxGroup)
  .mount("#app");
