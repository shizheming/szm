<template>
  <TreeSelect
    v-bind="newProps"
    :value="value"
    show-search
    allowClear
    tree-default-expand-all
  >
    <slot />
  </TreeSelect>
</template>
<script setup>
import core from "./core";
import { TreeSelect } from "ant-design-vue";
import props from "./props";

const p = defineProps({
  ...TreeSelect.props,
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit);

</script>
