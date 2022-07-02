<template>
  <a-input allow-clear placeholder="请输入" v-bind="newSlots">
    <slot />
  </a-input>
</template>
<script setup>
import core from "./core";
import props from "./props";

const p = defineProps(props);
const { newSlots } = core(p, "input");
</script>

<style>
/* .formDetail .ant-input-disabled {
  color:#000;
  cursor: context-menu;
} */
</style>
