<template>
  <Cascader
    allow-clear
    :placeholder="$props.isDetail ? '' : '请选择'"
    :disabled="detailStyleObj.disabled"
    :show-arrow="detailStyleObj.showArrow"
    :bordered="detailStyleObj.bordered"
    :class="detailStyleObj.class"
    v-bind="newSlots"
  />
</template>
<script setup lang="ts">
import core from './core';
import { Cascader } from 'ant-design-vue';
import { PropsInterface } from './props';

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
</script>
