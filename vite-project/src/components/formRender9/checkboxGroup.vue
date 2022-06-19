<template>
  <CheckboxGroup v-bind="newSlots" v-model:value="bindValue">
    <slot />
  </CheckboxGroup>
</template>
<script setup>
import core from "./core";
import { CheckboxGroup } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit, "checkboxGroup");
</script>
