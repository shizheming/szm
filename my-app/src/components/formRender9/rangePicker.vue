<template>
  <RangePicker
    allow-clear
    :ranges="rangesObject"
    style="width: 100%"
    v-bind="newSlotsObject"
  >
    <slot />
  </RangePicker>
</template>
<script setup lang="ts">
import core from './core';
import { RangePicker } from 'ant-design-vue';
import { PropsInterface } from './props';
import dayjs, { Dayjs } from 'dayjs';

const propsObject = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject } = core(propsObject);
const rangesObject: { [name: string]: [Dayjs, Dayjs] } = {
  今天: [dayjs().startOf('day'), dayjs().endOf('day')],
  这周: [
    dayjs().startOf('week').add(1, 'day'),
    dayjs().endOf('week').add(1, 'day'),
  ],
  本月: [dayjs().startOf('month'), dayjs().endOf('month')],
};
</script>
