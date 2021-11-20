<template>
  <Checkbox v-bind="newProps" :checked="checked">
    <slot />
  </Checkbox>
</template>
<script>
import core from "./core";
import { Checkbox } from "ant-design-vue";
import props from "./props";
export default {
  props: {
    ...Checkbox.props,
    ...props,
  },
  emits: ["update:value", "update:checked", "update:preValue"],
  components: { Checkbox },
  setup(props, w) {
    let newProps = core(props, w);
    return {
      newProps,
    };
  },
};
</script>
