<template>
  <Cascader allowClear v-bind="newSlots" />
</template>
<script setup lang="ts">
import core from "./core";
import { Cascader } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const { newSlots } = core(p);
</script>
