<template>
  <Button v-bind="newProps">
    <slot/>
  </Button>
</template>
<script setup>
import { Button } from "ant-design-vue";
import props from "./props";
import { useSlots, useAttrs } from "vue";
import core from "./core";
import { forEach } from "lodash";
const slots = useSlots();

let newSlots = {};
console.log(slots,20)
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
const emit = defineEmits(["update:value"]);
let newProps = Object.assign(core(p, emit), newSlots);
</script>
