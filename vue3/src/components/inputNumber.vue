<template>
  <InputNumber v-bind="newProps" :value="value">
    <slot />
  </InputNumber>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { InputNumber } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...InputNumber.props,
  ...addTrigger(InputNumber),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue", "update:echoValue"]);
let newProps = core(p, emit, attrs);
</script>
