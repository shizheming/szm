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
import props from "./props";
import dayjs, { Dayjs } from "dayjs";

const p = defineProps(props);
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
