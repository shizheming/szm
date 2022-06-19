<template>
  <Select
    allowClear
    show-search
    v-bind="newProps"
    :filter-option="filterOption"
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
let newProps = Object.assign(core(p, emit, "select", newSlots), newSlots);

// 这个antd还有完善
function filterOption(input, option) {
  return option.label.includes(input);
}
</script>

<style>
.formDetail .ant-select-selection-item {
  color: #000;
  cursor: context-menu;
}
</style>
