<template>
  <Input v-bind="newProps" :value="value" allowClear>
    <slot />
  </Input>
</template>
<script setup>
import core from "./core";
import { Input } from "ant-design-vue";
import props from "./props";

const p = defineProps({
  ...Input.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit, "input");
</script>
