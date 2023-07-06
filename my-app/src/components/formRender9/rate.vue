<template>
  <Rate v-bind="newSlotsObject">
    <slot />
  </Rate>
</template>
<script setup lang="ts">
import core from './core';
import { Rate } from 'ant-design-vue';
import { PropsInterface } from './props';
import { useSlots, useAttrs } from 'vue';

const propsObject = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject } = core(propsObject);
</script>
