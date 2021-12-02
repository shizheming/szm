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
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...RadioGroup.props,
  ...addTrigger(RadioGroup),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue", "update:echoValue"]);
let newProps = core(p, emit, attrs, "radioGroup");
</script>
