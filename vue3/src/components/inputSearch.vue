<template>
  <InputSearch v-bind="newProps" :value="value">
    <slot />
  </InputSearch>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { InputSearch } from "ant-design-vue";
import props from "./props";

const attrs = useAttrs();
const p = defineProps({
  ...InputSearch.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit, attrs, "input");
</script>
