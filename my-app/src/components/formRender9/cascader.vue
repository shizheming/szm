<template>
  <Cascader
    allowClear
    :placeholder="$props.isDetail ? '' : '请选择'"
    :disabled="detailStyleObj.disabled"
    :showArrow="detailStyleObj.showArrow"
    :bordered="detailStyleObj.bordered"
    :class="detailStyleObj.class"
    v-bind="newSlots"
  />
</template>
<script setup lang="ts">
import core from "./core";
import { Cascader } from "ant-design-vue";
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
