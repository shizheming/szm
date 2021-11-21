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
<script>
import core from "./core";
import { TreeSelect } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
export default {
  props: {
    ...TreeSelect.props,
    ...addTrigger(TreeSelect),
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { TreeSelect },
  setup(props, w) {
    let newProps = core(props, w);
    return {
      newProps,
    };
  },
};
</script>
