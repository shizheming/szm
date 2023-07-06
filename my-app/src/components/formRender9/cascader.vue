<template>
  <Cascader
    allow-clear
    placeholder="请选择"
    :disabled="detailStyleObject.disabled"
    :show-arrow="detailStyleObject.showArrow"
    :bordered="detailStyleObject.bordered"
    :class="detailStyleObject.class"
    v-bind="newSlotsObject"
  />
</template>
<script setup lang="ts">
import core from './core';
import { Cascader } from 'ant-design-vue';
import { PropsInterface } from './props';

const propsObject = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();

const { newSlotsObject, detailStyleObject } = core(propsObject);
</script>
