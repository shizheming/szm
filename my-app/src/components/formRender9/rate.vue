<template>
  <Rate v-bind="newSlots">
    <slot />
  </Rate>
</template>
<script setup lang="ts">
import core from './core';
import { Rate } from 'ant-design-vue';
import { PropsInterface } from './props';
import { useSlots, useAttrs } from 'vue';

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
