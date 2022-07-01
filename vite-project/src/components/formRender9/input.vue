<template>
  <Input
    allow-clear
    placeholder="请输入"
    v-bind="newSlots"
    v-model:value="bindValue"
  >
    <slot />
  </Input>
</template>
<script setup>
import core from "./core";
import { Input } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit, "input");
</script>

<style>
/* .formDetail .ant-input-disabled {
  color:#000;
  cursor: context-menu;
} */
</style>
