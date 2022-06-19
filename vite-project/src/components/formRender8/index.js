import { createApp } from "vue";

import input from "./input.vue";
import select from "./select.vue";
import form from "./form.vue";
import aswitch from "./switch.vue";
import cascader from "./cascader.vue";
import checkboxGroup from "./checkboxGroup.vue";
import datePicker from "./datePicker.vue";
import rangePicker from "./rangePicker.vue";
import inputSearch from "./inputSearch.vue";
import textarea from "./textarea.vue";
import inputNumber from "./inputNumber.vue";
import radioGroup from "./radioGroup.vue";
import rate from "./rate.vue";
import timePicker from "./timePicker.vue";
import timeRangePicker from "./timeRangePicker.vue";
import treeSelect from "./treeSelect.vue";
import formItem from "./formItem.vue";
import button from "./button.vue";

export function mountFormRender6(App) {
  App.component("s-input", {
    inheritAttrs: false,
    ...input,
  })
    .component("s-form", {
      inheritAttrs: false,
      ...form,
    })
    .component("s-select", {
      inheritAttrs: false,
      ...select,
    })
    .component("s-switch", {
      inheritAttrs: false,
      ...aswitch,
    })
    .component("s-cascader", {
      inheritAttrs: false,
      ...cascader,
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
    });
}
