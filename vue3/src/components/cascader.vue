<template>
  <Cascader v-bind="newProps" :value="value" :changeOnSelect="true">
    <slot />
  </Cascader>
</template>
<script setup>
import core from "./core";
import { Cascader } from "ant-design-vue";
import props from "./props";
import { useSlots, useAttrs } from "vue";
import { forEach } from "lodash";

const slots = useSlots();
let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});
const p = defineProps({
  ...Cascader.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = Object.assign(core(p, emit), newSlots);
</script>
