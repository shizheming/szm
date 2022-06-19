<template>
  <InputSearch v-bind="newSlots" allowClear v-model:value="bindValue">
    <slot />
  </InputSearch>
</template>
<script setup>
import core from "./core";
import { InputSearch } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit, "input");
</script>
