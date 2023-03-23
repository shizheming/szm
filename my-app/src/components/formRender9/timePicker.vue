<template>
  <TimePicker v-bind="newSlotsObject" allow-clear>
    <slot />
  </TimePicker>
</template>
<script setup lang="ts">
import core from './core';
import { TimePicker } from 'ant-design-vue';
import { PropsInterface } from './props';
import { useSlots, inject, useAttrs } from 'vue';

const propsObject = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject } = core(propsObject);
</script>
