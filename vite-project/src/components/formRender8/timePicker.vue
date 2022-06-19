<template>
  <TimePicker v-bind="newProps">
    <slot />
  </TimePicker>
</template>
<script setup>
import core from "./core";
import { TimePicker } from "ant-design-vue";
import props from "./props";
import { useSlots, inject, useAttrs } from "vue";
import { forEach } from "lodash";

const slots = useSlots();
let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});
let outer = inject("outer");
const p = defineProps(props);
const emit = defineEmits(["update:value"]);

let newProps = Object.assign(core(p, emit), newSlots);
/* outer函数 */
if (p.outer) {
  outer[p.name] = () => {
    return p.outer(p.value);
  };
} else {
  outer[p.name] = () => {
    if (p.value) {
      return Math.floor(p.value.valueOf() / 1000);
    }
  };
}
</script>
