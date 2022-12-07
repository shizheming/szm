<template>
  <Switch v-bind="newSlots">
    <slot />
  </Switch>
</template>
<script setup lang="ts">
import core from './core';
import { Switch } from 'ant-design-vue';
import { PropsInterface } from './props';

const p = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlots } = core(p);
</script>
