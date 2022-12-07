<template>
  <TimeRangePicker allow-clear v-bind="newSlots">
    <slot />
  </TimeRangePicker>
</template>
<script setup lang="ts">
import core from './core';
import { TimeRangePicker } from 'ant-design-vue';
import { PropsInterface } from './props';

const p = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlots } = core(p);
</script>
