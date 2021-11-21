<template>
  <InputNumber v-bind="newProps" :value="value">
    <slot />
  </InputNumber>
</template>
<script>
import core from "./core";
import { InputNumber } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
export default {
  props: {
    ...InputNumber.props,
    ...addTrigger(InputNumber),
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { InputNumber },
  setup(props, w) {
    let newProps = core(props, w);
    return {
      newProps,
    };
  },
};
</script>
