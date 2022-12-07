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
}>();
const { newSlots } = core(p);
</script>
