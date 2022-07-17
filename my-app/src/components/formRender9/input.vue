<template>
  <Input allow-clear placeholder="请输入" v-bind="newSlots">
    <slot />
  </Input>
</template>
<script setup lang="ts">
import core from "./core";
import { PropsInterface } from "./props";
import { Input } from "ant-design-vue";

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
const { newSlots } = core(p);
</script>

<style>
/* .formDetail .ant-input-disabled {
  color:#000;
  cursor: context-menu;
} */
</style>
