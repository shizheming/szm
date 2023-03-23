<template>
  <Switch v-bind="newSlotsObject">
    <slot />
  </Switch>
</template>
<script setup lang="ts">
import core from './core';
import { Switch } from 'ant-design-vue';
import { PropsInterface } from './props';

const propsObject = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject } = core(propsObject);
</script>
