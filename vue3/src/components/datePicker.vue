<template>
  <DatePicker v-bind="newProps" :value="value">
    <slot />
  </DatePicker>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { DatePicker } from "ant-design-vue";
import props from "./props";
import { inject } from "vue";

let outer = inject("outer");
const attrs = useAttrs();
const p = defineProps({
  ...DatePicker.props,
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
  outer[p.name] = () => {
    if (p.value) {
      return Math.floor(p.value.valueOf() / 1000);
    }
  };
}
</script>
