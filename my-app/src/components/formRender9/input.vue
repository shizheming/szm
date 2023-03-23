<template>
  <Input
    allow-clear
    :placeholder="propsObject.isDetail ? '' : '请输入'"
    :disabled="detailStyleObject.disabled"
    :bordered="detailStyleObject.bordered"
    :class="detailStyleObject.class"
    v-bind="newSlotsObject"
  >
    <slot />
  </Input>
</template>
<script setup lang="ts">
import core from './core';
import { PropsInterface } from './props';
import { Input } from 'ant-design-vue';

const propsObject = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject, detailStyleObject } = core(propsObject);
</script>

<style>
.formDetail {
  cursor: context-menu;
}
.formDetail .ant-input {
  color: #000;
  cursor: context-menu;
  background-color: white;
}
</style>
