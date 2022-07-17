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
import { PropsInterface } from "./props";
import { Select, SelectProps } from "ant-design-vue";

const p = defineProps<{
  isDetail?: Boolean;
  inner?: Function;
  trigger?: any[];
  outer?: Function;
  // togetherhas: {
  //   type: Array,
  //   default: undefined,
  // },
  // togethernohas: {
  //   type: Array,
  //   default: undefined,
  // },
  // clear: {
  //   type: Boolean,
  //   default: undefined,
  // },
}>();
const { newSlots } = core(p);

// 这个antd还有完善
function filterOption(value: string, options: any) {
  return options.label.includes(value);
}
</script>

<style>
/* .formDetail .ant-select-selection-item {
  color: #000;
  cursor: context-menu;
} */
</style>
