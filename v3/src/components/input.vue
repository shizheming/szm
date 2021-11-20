<template>
  <Input v-bind="newProps" :value="value" />
</template>
<script>
import core from "./core";
import { Input } from "ant-design-vue";
import props from "./props";
export default {
  props: {
    ...Input.props,
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { Input },
  setup(props, w) {
    let newProps = core(props, w, "input");
    return {
      newProps,
    };
  },
};
</script>
