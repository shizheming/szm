<template>
  <RadioGroup v-bind="newSlots" allowClear v-model:value="bindValue">
    <slot />
  </RadioGroup>
</template>
<script setup>
import core from "./core";
import { RadioGroup } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit, "radioGroup");
</script>
