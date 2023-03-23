<template>
  <InputNumber
    style="width: 100%"
    :disabled="detailStyleObject.disabled"
    :bordered="detailStyleObject.bordered"
    :class="detailStyleObject.class"
    v-bind="newSlotsObject"
  >
    <slot />
  </InputNumber>
</template>
<script setup lang="ts">
import core from './core';
import { InputNumber } from 'ant-design-vue';
import { PropsInterface } from './props';

const propsObject = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject, detailStyleObject } = core(propsObject);
</script>

<style>
.formDetail .ant-input-number-input {
  color: #000;
  cursor: context-menu;
  background-color: white;
}
</style>
