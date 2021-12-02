<template>
  <Input v-bind="newProps" :value="value" allowClear>
    <slot />
  </Input>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { Input } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...Input.props,
  ...addTrigger(Input),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue", "update:echoValue"]);
let newProps = core(p, emit, attrs, "input");
</script>
