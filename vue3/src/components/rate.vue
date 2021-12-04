<template>
  <Rate v-bind="newProps" :value="value">
    <slot />
  </Rate>
</template>
<script setup>
import core from "./core";
import { Rate } from "ant-design-vue";
import props from "./props";

const p = defineProps({
  ...Rate.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit);
</script>
