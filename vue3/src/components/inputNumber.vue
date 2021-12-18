<template>
  <InputNumber v-bind="newProps" :value="value">
    <slot />
  </InputNumber>
</template>
<script setup>
import core from "./core";
import { InputNumber } from "ant-design-vue";
import props from "./props";
import { useSlots, useAttrs } from "vue";
import { forEach } from "lodash";

const slots = useSlots();
let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});
const p = defineProps({
  ...InputNumber.props,
  ...props,
});
const emit = defineEmits(["update:value"]);
let newProps = Object.assign(core(p, emit), newSlots);
</script>
