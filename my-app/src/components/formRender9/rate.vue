<template>
  <Rate v-bind="newSlots">
    <slot />
  </Rate>
</template>
<script setup lang="ts">
import core from "./core";
import { Rate } from "ant-design-vue";
import props from "./props";
import { useSlots, useAttrs } from "vue";

const p = defineProps(props);
const { newSlots } = core(p);
</script>
