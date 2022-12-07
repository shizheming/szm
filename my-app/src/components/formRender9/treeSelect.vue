<template>
  <TreeSelect allow-clear show-search v-bind="newSlots">
    <slot />
  </TreeSelect>
</template>
<script setup lang="ts">
import core from './core';
import { TreeSelect } from 'ant-design-vue';
import { PropsInterface } from './props';

const p = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlots } = core(p);
</script>
