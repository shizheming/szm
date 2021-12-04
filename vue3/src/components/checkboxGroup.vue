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

const attrs = useAttrs();
const p = defineProps({
  ...CheckboxGroup.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit, attrs);
</script>
