<template>
  <Switch v-bind="newProps" :checked="checked" />
</template>
<script setup>
import core from "./core";
import { Switch } from "ant-design-vue";
import props from "./props";
import { useSlots, useAttrs } from "vue";
import { forEach } from "lodash";

const slots = useSlots();
let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});
const p = defineProps({
  ...Switch.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:checked", "update:preValue"]);
let newProps = Object.assign(core(p, emit, "switch"), newSlots);
</script>
