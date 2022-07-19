<template>
  <InputNumber
    :disabled="detailStyleObj.disabled"
    :bordered="detailStyleObj.bordered"
    :showArrow="detailStyleObj.showArrow"
    :class="detailStyleObj.class"
    v-bind="newSlots"
  >
    <slot />
  </InputNumber>
</template>
<script setup lang="ts">
import core from "./core";
import { InputNumber } from "ant-design-vue";
import { PropsInterface } from "./props";

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
const { newSlots, detailStyleObj } = core(p);
</script>

<style>
.formDetail .ant-input-number-input {
  color: #000;
  cursor: context-menu;
  background-color: white;
}
</style>
