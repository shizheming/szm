<template>
  <TimePicker v-bind="newProps" :value="value">
    <slot />
  </TimePicker>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { TimePicker } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
import { inject } from "vue";

let outer = inject("outer");
const attrs = useAttrs();
const p = defineProps({
  ...TimePicker.props,
  ...addTrigger(TimePicker),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue", "update:echoValue"]);

let newProps = core(p, emit, attrs);
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
