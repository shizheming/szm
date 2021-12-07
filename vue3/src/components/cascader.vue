<template>
  <Cascader v-bind="newProps" :value="value" :changeOnSelect="true">
    <slot />
  </Cascader>
</template>
<script setup>
import core from "./core";
import { Cascader } from "ant-design-vue";
import props from "./props";

const p = defineProps({
  ...Cascader.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit);
</script>
