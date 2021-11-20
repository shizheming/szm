<template>
  <Cascader v-bind="newProps" :value="value">
    <slot />
  </Cascader>
</template>
<script>
import core from "./core";
import { Cascader } from "ant-design-vue";
import props from "./props";
export default {
  props: {
    ...Cascader.props,
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { Cascader },
  setup(props, w) {
    let newProps = core(props, w);
    return {
      newProps,
    };
  },
};
</script>
