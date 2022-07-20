<template>
  <InputSearch
    allowClear
    :placeholder="$props.isDetail ? '' : '请输入'"
    :disabled="detailStyleObj.disabled"
    :bordered="detailStyleObj.bordered"
    :class="detailStyleObj.class"
    v-bind="newSlots"
  >
    <slot />
  </InputSearch>
</template>
<script setup lang="ts">
import core from "./core";
import { InputSearch } from "ant-design-vue";
import { PropsInterface } from "./props";

const p = defineProps<{
  isDetail?: Boolean;
  inner?: Function;
  watch?: any[];
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
.formDetail .ant-input-affix-wrapper {
  cursor: context-menu;
}
.formDetail .ant-input {
  color: #000;
  background-color: white;
}
</style>
