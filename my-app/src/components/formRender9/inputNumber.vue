<template>
  <InputNumber
    style="width: 100%"
    :disabled="detailStyleObj.disabled"
    :bordered="detailStyleObj.bordered"
    :class="detailStyleObj.class"
    v-bind="newSlots"
  >
    <slot />
  </InputNumber>
</template>
<script setup lang="ts">
import core from './core';
import { InputNumber } from 'ant-design-vue';
import { PropsInterface } from './props';

const p = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlots, detailStyleObj } = core(p);
</script>

<style>
.formDetail .ant-input-number-input {
  color: #000;
  cursor: context-menu;
  background-color: white;
}
</style>
