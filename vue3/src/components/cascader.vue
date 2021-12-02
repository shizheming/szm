<template>
  <Cascader v-bind="newProps" :value="value">
    <slot />
  </Cascader>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { Cascader } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...Cascader.props,
  ...addTrigger(Cascader),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue", "update:echoValue"]);
let newProps = core(p, emit, attrs);
</script>
