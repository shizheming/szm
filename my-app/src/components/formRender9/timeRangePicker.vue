<template>
  <TimeRangePicker allowClear v-bind="newSlots">
    <slot />
  </TimeRangePicker>
</template>
<script setup lang="ts">
import core from "./core";
import { TimeRangePicker } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { newSlots } = core(p);
</script>
