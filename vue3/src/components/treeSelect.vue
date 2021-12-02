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
import { useAttrs } from "vue";
import core from "./core";
import { TreeSelect } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

const attrs = useAttrs();
const p = defineProps({
  ...TreeSelect.props,
  ...addTrigger(TreeSelect),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue", "update:echoValue"]);
let newProps = core(p, emit, attrs);

</script>
