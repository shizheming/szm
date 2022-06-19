<template>
  <Rate v-bind="newSlots" v-model:value="bindValue">
    <slot />
  </Rate>
</template>
<script setup>
import core from "./core";
import { Rate } from "ant-design-vue";
import props from "./props";
import { useSlots, useAttrs } from "vue";
import { forEach } from "lodash";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit);
</script>
