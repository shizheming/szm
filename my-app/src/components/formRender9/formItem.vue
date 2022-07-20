<template>
  <FormItem v-bind="newSlots">
    <slot />
  </FormItem>
</template>
<script setup lang="ts">
import { useSlots, useAttrs, ref, provide } from "vue";
import core from "./core";
import { FormItem } from "ant-design-vue";
import { PropsInterface } from "./props";

const p = defineProps<{
  isDetail?: Boolean;
  inner?: Function;
  watch?: any[];
  outer?: Function;
  // togetherhas: {
  //   type: Array,
  //   default: undefined,
  // },
  // togethernohas: {
  //   type: Array,
  //   default: undefined,
  // },
  // clear: {
  //   type: Boolean,
  //   default: undefined,
  // },
}>();
const attrs = useAttrs();
const componentName = ref<string>(attrs.name as string);
provide("componentName", componentName);
const { newSlots } = core(p);
</script>
