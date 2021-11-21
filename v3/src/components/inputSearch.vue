<template>
  <InputSearch v-bind="newProps" :value="value">
    <slot />
  </InputSearch>
</template>
<script>
import core from "./core";
import { InputSearch } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
export default {
  props: {
    ...InputSearch.props,
    ...addTrigger(InputSearch),
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { InputSearch },
  setup(props, w) {
    let newProps = core(props, w, "input");
    return {
      newProps,
    };
  },
};
</script>
