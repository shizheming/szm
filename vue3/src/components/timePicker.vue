<template>
  <TimePicker v-bind="newProps" :value="value">
    <slot />
  </TimePicker>
</template>
<script setup>
import core from "./core";
import { TimePicker } from "ant-design-vue";
import props from "./props";
import { inject } from "vue";

let outer = inject("outer");
const p = defineProps({
  ...TimePicker.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);

let newProps = core(p, emit);
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
