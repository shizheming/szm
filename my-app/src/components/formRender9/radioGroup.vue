<template>
  <RadioGroup v-bind="newSlots" allowClear>
    <slot />
  </RadioGroup>
</template>
<script setup lang="ts">
import core from "./core";
import { RadioGroup } from "ant-design-vue";
import { PropsInterface } from "./props";

const p = defineProps<{
  isDetail?: Boolean;
  inner?: Function;
  trigger?: any[];
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

const { newSlots } = core(p);
</script>
