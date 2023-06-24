<template>
  <Select
    allow-clear
    show-search
    :filter-option="filterOption"
    :placeholder="propsObject.isDetail ? '' : '请选择'"
    :disabled="detailStyleObject.disabled"
    :show-arrow="detailStyleObject.showArrow"
    :bordered="detailStyleObject.bordered"
    :class="detailStyleObject.class"
    v-bind="newSlotsObject"
  >
    <slot />
  </Select>
</template>
<script setup lang="ts">
import core from './core';
import { PropsInterface } from './props';
import { Select, SelectProps } from 'ant-design-vue';
import { getCurrentInstance } from 'vue';

const propsObject = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject, detailStyleObject } = core(propsObject);

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
