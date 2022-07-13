<template>
  <TreeSelect allowClear show-search v-bind="newSlots">
    <slot />
  </TreeSelect>
</template>
<script setup lang="ts">
import core from "./core";
import { TreeSelect } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const { newSlots } = core(p);
</script>
