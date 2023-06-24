<template>
  <FormItem v-bind="newSlotsObject">
    <slot />
  </FormItem>
</template>
<script setup lang="ts">
import { useSlots, useAttrs, ref, provide } from 'vue';
import core from './core';
import { FormItem } from 'ant-design-vue';
import { PropsInterface } from './props';

const propsObject = defineProps<{
  isDetail?: Boolean;
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const attrsObject = useAttrs();
const componentNameStringArray = ref<string | []>(attrsObject.name);
provide('componentName', componentNameStringArray);
const { newSlotsObject } = core(propsObject);
</script>
