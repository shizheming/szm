<template>
  <InputSearch allowClear v-bind="newSlots">
    <slot />
  </InputSearch>
</template>
<script setup lang="ts">
import core from "./core";
import { InputSearch } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const { newSlots } = core(p);
</script>
