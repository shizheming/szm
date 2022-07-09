<template>
  <Input allow-clear placeholder="请输入" v-bind="newSlots">
    <slot />
  </Input>
</template>
<script setup lang="ts">
import core from "./core";
import props from "./props";
import { Input } from "ant-design-vue";

const p = defineProps(props);
const { newSlots } = core(p);
</script>

<style>
/* .formDetail .ant-input-disabled {
  color:#000;
  cursor: context-menu;
} */
</style>
