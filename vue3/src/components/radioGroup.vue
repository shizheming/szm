<template>
  <RadioGroup v-bind="newProps" :value="value">
    <slot />
  </RadioGroup>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { RadioGroup } from "ant-design-vue";
import props from "./props";

const attrs = useAttrs();
const p = defineProps({
  ...RadioGroup.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit, attrs, "radioGroup");
</script>
