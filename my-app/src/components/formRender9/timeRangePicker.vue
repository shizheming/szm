<template>
  <TimeRangePicker allow-clear v-bind="newSlotsObject">
    <slot />
  </TimeRangePicker>
</template>
<script setup lang="ts">
import core from './core';
import { TimeRangePicker } from 'ant-design-vue';
import { PropsInterface } from './props';

const propsObject = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject } = core(propsObject);
</script>
