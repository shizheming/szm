<template>
  <DatePicker v-bind="newSlots">
    <slot />
  </DatePicker>
</template>
<script setup lang="ts">
import core from './core';
import { DatePicker } from 'ant-design-vue';
import { PropsInterface } from './props';
import { useSlots, useAttrs, inject, Ref } from 'vue';

const p = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlots } = core(p);
</script>
