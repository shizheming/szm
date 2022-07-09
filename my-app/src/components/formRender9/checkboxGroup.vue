<template>
  <CheckboxGroup v-bind="newSlots">
    <slot />
  </CheckboxGroup>
</template>
<script setup lang="ts">
import core from "./core";
import { CheckboxGroup } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const { newSlots } = core(p);
</script>
