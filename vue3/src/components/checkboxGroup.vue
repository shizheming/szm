<template>
  <CheckboxGroup v-bind="newProps" :value="value">
    <slot />
  </CheckboxGroup>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { CheckboxGroup } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...CheckboxGroup.props,
  ...addTrigger(CheckboxGroup),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit, attrs);
</script>
