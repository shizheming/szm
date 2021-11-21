<template>
  <Rate v-bind="newProps" :value="value">
    <slot />
  </Rate>
</template>
<script>
import core from "./core";
import { Rate } from "ant-design-vue";
import props from "./props";
import {addTrigger} from './tool';
export default {
  props: {
    ...Rate.props,
    ...addTrigger(Rate),
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { Rate },
  setup(props, w) {
    let newProps = core(props, w);
    return {
      newProps,
    };
  },
};
</script>
