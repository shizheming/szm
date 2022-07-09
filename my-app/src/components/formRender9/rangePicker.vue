<template>
  <RangePicker allowClear v-bind="newSlots">
    <slot />
  </RangePicker>
</template>
<script setup lang="ts">
import core from "./core";
import { RangePicker } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { newSlots } = core(p);
</script>
