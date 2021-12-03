<template>
  <Select
    v-bind="newProps"
    :value="value"
    allowClear
    :filter-option="filterOption"
    show-search
  >
    <slot />
  </Select>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { Select } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...Select.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue", "update:echoValue"]);
let newProps = core(p, emit, attrs);
function filterOption(input, option) {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}
console.log(p,2)
</script>
