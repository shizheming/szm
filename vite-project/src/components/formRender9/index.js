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
  App.component("s-input", input)
    .component("s-form", form)
    .component("s-select", select)
    .component("s-switch", aswitch)
    .component("s-cascader", cascader)
    .component("s-checkbox-group", checkboxGroup)
    .component("s-date-picker", datePicker)
    .component("s-range-picker", rangePicker)
    .component("s-input-search", inputSearch)
    .component("s-textarea", textarea)
    .component("s-input-number", inputNumber)
    .component("s-radio-group", radioGroup)
    .component("s-rate", rate)
    .component("s-time-picker", timePicker)
    .component("s-time-range-picker", timeRangePicker)
    .component("s-tree-select", treeSelect)
    .component("s-form-item", formItem)
    .component("s-button", button);
}
