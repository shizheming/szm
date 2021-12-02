<template>
  <Rate v-bind="newProps" :value="value">
    <slot />
  </Rate>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { Rate } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...Rate.props,
  ...addTrigger(Rate),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue", "update:echoValue"]);
let newProps = core(p, emit, attrs);
</script>
