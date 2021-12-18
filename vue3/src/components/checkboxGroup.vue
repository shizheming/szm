<template>
  <CheckboxGroup v-bind="newProps" :value="value">
    <slot />
  </CheckboxGroup>
</template>
<script setup>
import core from "./core";
import { CheckboxGroup } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
let newProps = core(p, emit);
</script>
