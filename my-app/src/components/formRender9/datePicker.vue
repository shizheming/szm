<template>
  <DatePicker v-bind="newSlotsObject">
    <slot />
  </DatePicker>
</template>
<script setup lang="ts">
import core from './core';
import { DatePicker } from 'ant-design-vue';
import { PropsInterface } from './props';
import { useSlots, useAttrs, inject, Ref } from 'vue';

const propsObject = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject } = core(propsObject);
</script>
