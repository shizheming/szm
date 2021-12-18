import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import input from "./components/input.vue";
import select from "./components/select.vue";
import selectOption from "./components/selectOption.vue";
import form from "./components/form.vue";
import aswitch from "./components/switch.vue";
import cascader from "./components/cascader.vue";
import checkbox from "./components/checkbox.vue";
import checkboxGroup from "./components/checkboxGroup.vue";
import datePicker from "./components/datePicker.vue";
import rangePicker from "./components/rangePicker.vue";
import inputSearch from "./components/inputSearch.vue";
import textarea from "./components/textarea.vue";
import inputNumber from "./components/inputNumber.vue";
import radio from "./components/radio.vue";
import radioGroup from "./components/radioGroup.vue";
import rate from "./components/rate.vue";
import timePicker from "./components/timePicker.vue";
import timeRangePicker from "./components/timeRangePicker.vue";
import treeSelect from "./components/treeSelect.vue";
import formItem from "./components/formItem.vue";
import button from "./components/button.vue";
import table from "./components/table.vue";

createApp(App)
  .use(Antd)
  .use(router)
  .component("s-input", input)
  .component("s-select", {
    inheritAttrs: false,
    ...select,
  })
  .component("s-select-option", selectOption)
  .component("s-form", {
    inheritAttrs: false,
    ...form,
  })
  .component("s-switch", {
    inheritAttrs: false,
    ...aswitch,
  })
  .component("s-cascader", {
    inheritAttrs: false,
    ...cascader,
  })
  .component("s-checkbox", {
    inheritAttrs: false,
    ...checkbox,
  })
  .component("s-checkbox-group", {
    inheritAttrs: false,
    ...checkboxGroup,
  })
  .component("s-date-picker", {
    inheritAttrs: false,
    ...datePicker,
  })
  .component("s-range-picker", {
    inheritAttrs: false,
    ...rangePicker,
  })
  .component("s-input-search", {
    inheritAttrs: false,
    ...inputSearch,
  })
  .component("s-textarea", {
    inheritAttrs: false,
    ...textarea,
  })
  .component("s-input-number", {
    inheritAttrs: false,
    ...inputNumber,
  })
  .component("s-radio", {
    inheritAttrs: false,
    ...radio,
  })
  .component("s-radio-group", {
    inheritAttrs: false,
    ...radioGroup,
  })
  .component("s-rate", {
    inheritAttrs: false,
    ...rate,
  })
  .component("s-time-picker", {
    inheritAttrs: false,
    ...timePicker,
  })
  .component("s-time-range-picker", {
    inheritAttrs: false,
    ...timeRangePicker,
  })
  .component("s-tree-select", {
    inheritAttrs: false,
    ...treeSelect,
  })
  .component("s-form-item", {
    inheritAttrs: false,
    ...formItem,
  })
  .component("s-button", {
    inheritAttrs: false,
    ...button,
  })
  .component("s-table", {
    inheritAttrs: false,
    ...table,
  })
  .mount("#app");
