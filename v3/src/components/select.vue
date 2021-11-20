<template>
  <Select v-bind="newProps" :value="value">
    <slot />
  </Select>
</template>
<script>
import core from "./core";
import { Select } from "ant-design-vue";
import props from "./props";
export default {
  props: {
    ...Select.props,
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { Select },
  setup(props, w) {
    let newProps = core(props, w, "select");
    return {
      newProps,
    };
  },
};
</script>
