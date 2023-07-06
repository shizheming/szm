<template>
  <RadioGroup v-bind="newSlotsObject">
    <slot />
  </RadioGroup>
</template>
<script setup lang="ts">
import core from './core';
import { RadioGroup } from 'ant-design-vue';
import { PropsInterface } from './props';
import Select from './select.vue';
const p = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();

const { newSlotsObject } = core(p);
</script>
