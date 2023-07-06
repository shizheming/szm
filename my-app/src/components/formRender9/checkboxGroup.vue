<template>
  <CheckboxGroup v-bind="newSlotsObject">
    <slot />
  </CheckboxGroup>
</template>
<script setup lang="ts">
import core from './core';
import { CheckboxGroup } from 'ant-design-vue';
import { PropsInterface } from './props';

const propsObject = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject } = core(propsObject);
</script>
