<template>
  <Select
    allow-clear
    show-search
    :filter-option="filterOption"
    :placeholder="$props.isDetail ? '' : '请选择'"
    :disabled="detailStyleObj.disabled"
    :show-arrow="detailStyleObj.showArrow"
    :bordered="detailStyleObj.bordered"
    :class="detailStyleObj.class"
    v-bind="newSlots"
  >
    <slot />
  </Select>
</template>
<script setup lang="ts">
import core from './core';
import { PropsInterface } from './props';
import { Select, SelectProps } from 'ant-design-vue';

const p = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
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
const { newSlots, detailStyleObj } = core(p);

function filterOption(value: string, options: any) {
  return options.label.includes(value);
}
</script>

<style>
.formDetail .ant-select-selector {
  cursor: context-menu !important;
}
.formDetail .ant-select-selection-item {
  color: #000;
  cursor: context-menu;
}
</style>
