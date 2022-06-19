<template>
  <RadioGroup v-bind="newProps">
    <slot />
  </RadioGroup>
</template>
<script setup>
import core from "./core";
import { RadioGroup } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
let newProps = core(p, emit, "radioGroup");
</script>
