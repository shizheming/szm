<template>
  <TimeRangePicker v-bind="newProps" :value="value">
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

let outer = inject("outer");
const p = defineProps({
  ...TimeRangePicker.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);

let newProps = Object.assign(core(p, emit), newSlots);
/* outer函数 */
if (p.outer) {
  outer[p.name] = () => {
    return p.outer(p.value);
  };
} else {
  outer[`${p.name}_start`] = () => {
    if (p.value) {
      return Math.floor(p.value[0].valueOf() / 1000);
    }
  };
  outer[`${p.name}_end`] = () => {
    if (p.value) {
      return Math.floor(p.value[1].valueOf() / 1000);
    }
  };
}
</script>
