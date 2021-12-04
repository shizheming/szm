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

const attrs = useAttrs();
const p = defineProps({
  ...Cascader.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit, attrs);
</script>
