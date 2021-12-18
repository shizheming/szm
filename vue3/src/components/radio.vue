<template>
  <Radio v-bind="newProps" :checked="checked">
    <slot />
  </Radio>
</template>
<script setup>
import core from "./core";
import { Radio } from "ant-design-vue";
import props from "./props";

const p = defineProps({
  ...Radio.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:checked"]);
let newProps = core(p, emit, "radio");
</script>
