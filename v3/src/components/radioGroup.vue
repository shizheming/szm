<template>
  <RadioGroup v-bind="newProps" :value="value">
    <slot />
  </RadioGroup>
</template>
<script>
import core from "./core";
import { RadioGroup } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
export default {
  props: {
    ...RadioGroup.props,
    ...addTrigger(RadioGroup),
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { RadioGroup },
  setup(props, w) {
    let newProps = core(props, w, "radioGroup");
    return {
      newProps,
    };
  },
};
</script>
