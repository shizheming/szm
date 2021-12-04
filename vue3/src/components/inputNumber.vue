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

const attrs = useAttrs();
const p = defineProps({
  ...InputNumber.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit, attrs);
</script>
