<template>
  <TimeRangePicker v-bind="newProps">
    <slot />
  </TimeRangePicker>
</template>
<script setup>
import core from "./core";
import { TimeRangePicker } from "ant-design-vue";
import props from "./props";
import { useSlots, inject, useAttrs } from "vue";
import { forEach } from "lodash";

const slots = useSlots();
let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});

const p = defineProps(props);
const emit = defineEmits(["update:value"]);

let newProps = Object.assign(core(p, emit), newSlots);
</script>
