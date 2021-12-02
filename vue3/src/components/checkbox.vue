<template>
  <Checkbox v-bind="newProps" :checked="checked">
    <slot />
  </Checkbox>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { Checkbox } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...Checkbox.props,
  ...addTrigger(Checkbox),
  ...props,
});
const emit = defineEmits(["update:value", "update:checked", "update:preValue", "update:echoValue"]);
let newProps = core(p, emit, attrs, "checkbox");
</script>
