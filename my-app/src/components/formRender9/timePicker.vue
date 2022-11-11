<template>
  <TimePicker v-bind="newSlots" allow-clear>
    <slot />
  </TimePicker>
</template>
<script setup lang="ts">
import core from './core';
import { TimePicker } from 'ant-design-vue';
import { PropsInterface } from './props';
import { useSlots, inject, useAttrs } from 'vue';

let outer = inject('outer');
const p = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
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
