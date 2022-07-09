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

export function mountFormRender9(App) {
  App.component("a-input", input)
    .component("a-form", form)
    .component("a-select", select)
    .component("a-switch", aswitch)
    .component("a-cascader", cascader)
    .component("a-checkbox-group", checkboxGroup)
    .component("a-date-picker", datePicker)
    .component("a-range-picker", rangePicker)
    .component("a-input-search", inputSearch)
    .component("a-textarea", textarea)
    .component("a-input-number", inputNumber)
    .component("a-radio-group", radioGroup)
    .component("a-rate", rate)
    .component("a-time-picker", timePicker)
    .component("a-time-range-picker", timeRangePicker)
    .component("a-tree-select", treeSelect)
    .component("a-form-item", formItem);
}
