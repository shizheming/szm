<template>
  <TreeSelect
    v-bind="newProps"
    :value="value"
    show-search
    allowClear
    tree-default-expand-all
  >
    <slot />
  </TreeSelect>
</template>
<script setup>
import core from "./core";
import { TreeSelect } from "ant-design-vue";
import props from "./props";
import { useSlots, useAttrs } from "vue";
import { forEach } from "lodash";

const slots = useSlots();
let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});
const p = defineProps({
  ...TreeSelect.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = Object.assign(core(p, emit), newSlots);
</script>
