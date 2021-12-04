<template>
  <Switch v-bind="newProps" :checked="checked" />
</template>
<script setup>
import core from "./core";
import { Switch } from "ant-design-vue";
import props from "./props";

const p = defineProps({
  ...Switch.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:checked", "update:preValue"]);
let newProps = core(p, emit, "switch");
</script>
