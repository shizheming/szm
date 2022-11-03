<template>
  <CheckboxGroup v-bind="newSlots">
    <slot />
  </CheckboxGroup>
</template>
<script setup lang="ts">
import core from './core';
import { CheckboxGroup } from 'ant-design-vue';
import { PropsInterface } from './props';

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
