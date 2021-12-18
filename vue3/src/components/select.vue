<template>
  <Select
    v-bind="newProps"
    :value="value"
    allowClear
    :filter-option="filterOption"
    show-search
  >
    <slot />
  </Select>
</template>
<script setup>
import core from "./core";
import { Select } from "ant-design-vue";
import props from "./props";
import { useSlots } from "vue";
import { forEach } from "lodash";
const slots = useSlots();
let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});
const p = defineProps(props);
const emit = defineEmits(["update:value"]);
let newProps = Object.assign(core(p, emit), newSlots);

function filterOption(input, option) {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}
</script>
