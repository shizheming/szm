<template>
  <Button v-bind="newProps">
    <slot name="icon"/>
    <slot/>
  </Button>
</template>
<script setup>
import { Button } from "ant-design-vue";
import props from "./props2";
import { useSlots, useAttrs } from "vue";
import core from "./core2";
import { forEach } from "lodash";
const slots = useSlots();

let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});
const attrs = useAttrs();
const p = defineProps({
  ...props,
  type: {
    type: String,
    default: "primary",
  },
});
let newProps = Object.assign(core(p, attrs), newSlots);
</script>
