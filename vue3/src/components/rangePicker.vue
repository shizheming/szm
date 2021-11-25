<template>
  <RangePicker v-bind="newProps" :value="value">
    <slot />
  </RangePicker>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { RangePicker } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
import { inject } from "vue";

let outer = inject("outer");
const attrs = useAttrs();
const p = defineProps({
  ...RangePicker.props,
  ...addTrigger(RangePicker),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);

let newProps = core(p, emit, attrs);
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
