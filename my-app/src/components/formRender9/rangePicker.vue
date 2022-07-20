<template>
  <RangePicker
    allowClear
    :ranges="ranges"
    style="width: 100%"
    v-bind="newSlots"
  >
    <slot />
  </RangePicker>
</template>
<script setup lang="ts">
import core from "./core";
import { RangePicker } from "ant-design-vue";
import { PropsInterface } from "./props";
import dayjs, { Dayjs } from "dayjs";

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
const ranges: { [name: string]: [Dayjs, Dayjs] } = {
  今天: [dayjs().startOf("day"), dayjs().endOf("day")],
  这周: [
    dayjs().startOf("week").add(1, "day"),
    dayjs().endOf("week").add(1, "day"),
  ],
  本月: [dayjs().startOf("month"), dayjs().endOf("month")],
};
</script>
