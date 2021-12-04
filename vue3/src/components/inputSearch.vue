<template>
  <InputSearch v-bind="newProps" :value="value">
    <slot />
  </InputSearch>
</template>
<script setup>
import core from "./core";
import { InputSearch } from "ant-design-vue";
import props from "./props";

const p = defineProps({
  ...InputSearch.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit, "input");
</script>
