<template>
  <TimePicker v-bind="newSlots" allowClear v-model:value="bindValue">
    <slot />
  </TimePicker>
</template>
<script setup>
import core from "./core";
import { TimePicker } from "ant-design-vue";
import props from "./props";
import { useSlots, inject, useAttrs } from "vue";

let outer = inject("outer");
const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { bindValue, newSlots } = core(p, emit);

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
