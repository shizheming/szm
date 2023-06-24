<template>
  <RadioGroup v-bind="newSlotsObject" v-if="!p.isDetail">
    <slot />
  </RadioGroup>
  <Select v-else v-bind="$props" />
</template>
<script setup lang="ts">
import core from './core';
import { RadioGroup } from 'ant-design-vue';
import { PropsInterface } from './props';
import Select from './select.vue';
const p = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();

const { newSlotsObject } = core(p);
</script>
