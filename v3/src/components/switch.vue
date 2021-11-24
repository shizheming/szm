<template>
  <Switch v-bind="newProps" :checked="checked" />
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { Switch } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...Switch.props,
  ...addTrigger(Switch),
  ...props,
});
const emit = defineEmits(["update:value", "update:checked", "update:preValue"]);
let newProps = core(p, emit, attrs, "switch");
</script>
