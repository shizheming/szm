<template>
  <InputSearch
    allow-clear
    placeholder="请输入"
    :disabled="detailStyleObject.disabled"
    :bordered="detailStyleObject.bordered"
    :class="detailStyleObject.class"
    v-bind="newSlotsObject"
  >
    <slot />
  </InputSearch>
</template>
<script setup lang="ts">
import core from './core';
import { InputSearch } from 'ant-design-vue';
import { PropsInterface } from './props';

const propsObject = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject, detailStyleObject } = core(propsObject);
</script>
<style>
.formDetail .ant-input-affix-wrapper {
  cursor: context-menu;
}
.formDetail .ant-input {
  color: #000;
  background-color: white;
}
.formDetail .ant-input-group-addon,
.formDetail .ant-input-group-addon:hover {
  background-color: white;
}
</style>
