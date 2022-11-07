import { createApp } from 'vue';

import input from './input.vue';
import select from './select.vue';
import form from './form.vue';
import aswitch from './switch.vue';
import cascader from './cascader.vue';
import checkboxGroup from './checkboxGroup.vue';
import datePicker from './datePicker.vue';
import rangePicker from './rangePicker.vue';
import inputSearch from './inputSearch.vue';
import textarea from './textarea.vue';
import inputNumber from './inputNumber.vue';
import radioGroup from './radioGroup.vue';
import rate from './rate.vue';
import timePicker from './timePicker.vue';
import timeRangePicker from './timeRangePicker.vue';
import treeSelect from './treeSelect.vue';
import formItem from './formItem.vue';
import col from './col.vue';

export function mountFormRender9(App) {
  App.component('a-input', input)
    .component('a-input-number', inputNumber)
    .component('a-input-search', inputSearch)
    .component('a-select', select)
    .component('a-tree-select', treeSelect)
    .component('a-switch', aswitch)
    .component('a-cascader', cascader)
    .component('a-checkbox-group', checkboxGroup)
    .component('a-radio-group', radioGroup)
    .component('a-date-picker', datePicker)
    .component('a-range-picker', rangePicker)
    .component('a-textarea', textarea)
    .component('a-rate', rate)
    .component('a-time-picker', timePicker)
    .component('a-time-range-picker', timeRangePicker)
    .component('a-form', form)
    .component('a-form-item', formItem);
  // .component("a-col", col);
}
