<template>
  <TimePicker v-bind="newSlots" allowClear>
    <slot />
  </TimePicker>
</template>
<script setup lang="ts">
import core from "./core";
import { TimePicker } from "ant-design-vue";
import props from "./props";
import { useSlots, inject, useAttrs } from "vue";

let outer = inject("outer");
const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { newSlots } = core(p);
</script>
