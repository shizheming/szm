<template>
  <RangePicker v-bind="newSlots" allowClear v-model:value="bindValue">
    <slot />
  </RangePicker>
</template>
<script setup>
import core from "./core";
import { RangePicker } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit);
</script>
