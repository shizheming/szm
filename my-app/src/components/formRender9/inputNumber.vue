<template>
  <InputNumber v-bind="newSlots">
    <slot />
  </InputNumber>
</template>
<script setup lang="ts">
import core from "./core";
import { InputNumber } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const { newSlots } = core(p);
</script>

<style>
/* .formDetail .ant-input-number-input {
  color:#000;
  cursor: context-menu;
  background-color:white
} */
</style>
