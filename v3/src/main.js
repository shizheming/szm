import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import input from "./components/input.vue";
import select from "./components/select.vue";
import form from "./components/form.vue";
import aswitch from './components/switch.vue';
import cascader from './components/cascader.vue';
import checkbox from './components/checkbox.vue';
import checkboxGroup from './components/checkboxGroup.vue';
import datePicker from './components/datePicker.vue';
import rangePicker from './components/rangePicker.vue';
import inputSearch from './components/inputSearch.vue';
import textarea from './components/textarea.vue';
import inputNumber from './components/inputNumber.vue';
import radio from './components/radio.vue';
import radioGroup from './components/radioGroup.vue';
import rate from './components/rate.vue';
import timePicker from './components/timePicker.vue';
import timeRangePicker from './components/timeRangePicker.vue';
import treeSelect from './components/treeSelect.vue';
import "ant-design-vue/dist/antd.css";

createApp(App)
  .use(Antd)
  .component("s-input", input)
  .component("s-select", select)
  .component("s-form", form)
  .component("s-switch", aswitch)
  .component("s-cascader", cascader)
  .component("s-checkbox", checkbox)
  .component("s-checkbox-group", checkboxGroup)
  .component("s-date-picker", datePicker)
  .component("s-range-picker", rangePicker)
  .component("s-input-search", inputSearch)
  .component("s-textarea", textarea)
  .component("s-input-number", inputNumber)
  .component("s-radio", radio)
  .component("s-radio-group", radioGroup)
  .component("s-rate", rate)
  .component("s-time-picker", timePicker)
  .component("s-time-range-picker", timeRangePicker)
  .component("s-tree-select", treeSelect)
  .mount("#app");
