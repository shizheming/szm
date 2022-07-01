<template>
  <Select
    allow-clear
    show-search
    placeholder="请选择"
    :filter-option="filterOption"
    v-bind="newSlots"
    v-model:value="bindValue"
  >
    <slot />
  </Select>
</template>
<script setup>
import core from "./core";
import { Select } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit, "select");

// 这个antd还有完善
function filterOption(input, option) {
  return option.label.includes(input);
}
</script>

<style>
/* .formDetail .ant-select-selection-item {
  color: #000;
  cursor: context-menu;
} */
</style>
