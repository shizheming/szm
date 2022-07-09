<template>
  <RadioGroup v-bind="newSlots" allowClear>
    <slot />
  </RadioGroup>
</template>
<script setup lang="ts">
import core from "./core";
import { RadioGroup } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { newSlots } = core(p);
</script>
