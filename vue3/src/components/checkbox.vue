<template>
  <Checkbox v-bind="newProps" :checked="checked">
    <slot />
  </Checkbox>
</template>
<script setup>
import core from "./core";
import { Checkbox } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value", "update:checked"]);
let newProps = core(p, emit, "checkbox");
</script>
