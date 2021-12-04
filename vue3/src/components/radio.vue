<template>
  <Radio v-bind="newProps" :checked="checked">
    <slot />
  </Radio>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { Radio } from "ant-design-vue";
import props from "./props";

const attrs = useAttrs();
const p = defineProps({
  ...Radio.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:checked", "update:preValue"]);
let newProps = core(p, emit, attrs, "radio");
</script>
