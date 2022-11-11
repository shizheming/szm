<template>
  <Input
    allow-clear
    :placeholder="$props.isDetail ? '' : '请输入'"
    :disabled="detailStyleObj.disabled"
    :bordered="detailStyleObj.bordered"
    :class="detailStyleObj.class"
    v-bind="newSlots"
  >
    <slot />
  </Input>
</template>
<script setup lang="ts">
import core from './core';
import { PropsInterface } from './props';
import { Input } from 'ant-design-vue';

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
