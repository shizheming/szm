<template>
  <TreeSelect
    allowClear
    show-search
    v-bind="newSlots"
    v-model:value="bindValue"
  >
    <slot />
  </TreeSelect>
</template>
<script setup>
import core from "./core";
import { TreeSelect } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit, "treeSelect");
</script>
