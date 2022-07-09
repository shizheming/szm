<template>
  <Select
    allow-clear
    show-search
    :filter-option="filterOption"
    v-bind="newSlots"
    placeholder="请选择"
  >
    <slot />
  </Select>
</template>
<script setup lang="ts">
import core from "./core";
import props from "./props";
import { Select } from "ant-design-vue";
import { DefaultOptionType } from "ant-design-vue/lib/select";

const p = defineProps(props);
const { newSlots } = core(p);

// 这个antd还有完善
function filterOption(value: string, options: DefaultOptionType) {
  return options.label.includes(value);
}
</script>

<style>
/* .formDetail .ant-select-selection-item {
  color: #000;
  cursor: context-menu;
} */
</style>
