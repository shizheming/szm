<template>
  <a-select allow-clear show-search v-bind="newSlots" placeholder="请选择">
    <slot />
  </a-select>
</template>
<script setup>
import core from "./core";
import props from "./props";

const p = defineProps(props);
const { newSlots } = core(p, "select");

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
