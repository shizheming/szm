<template>
  <TimeRangePicker allowClear v-bind="newSlots">
    <slot />
  </TimeRangePicker>
</template>
<script setup lang="ts">
import core from "./core";
import { TimeRangePicker } from "ant-design-vue";
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
const { newSlots } = core(p);
</script>
