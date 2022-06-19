<template>
  <InputNumber v-bind="newSlots" v-model:value="bindValue">
    <slot />
  </InputNumber>
</template>
<script setup>
import core from "./core";
import { InputNumber } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit, "inputNumber");
</script>

<style>
/* .formDetail .ant-input-number-input {
  color:#000;
  cursor: context-menu;
  background-color:white
} */
</style>
