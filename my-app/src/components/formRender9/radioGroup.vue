<template>
  <RadioGroup v-bind="newSlots" allow-clear>
    <slot />
  </RadioGroup>
</template>
<script setup lang="ts">
import core from './core';
import { RadioGroup } from 'ant-design-vue';
import { PropsInterface } from './props';

const p = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();

const { newSlots } = core(p);
</script>
