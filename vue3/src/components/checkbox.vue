<template>
  <Checkbox v-bind="newProps" :checked="checked">
    <slot />
  </Checkbox>
</template>
<script setup>
import core from "./core";
import { Checkbox } from "ant-design-vue";
import props from "./props";

const p = defineProps({
  ...Checkbox.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:checked", "update:preValue"]);
let newProps = core(p, emit, "checkbox");
</script>
