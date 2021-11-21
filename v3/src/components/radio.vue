<template>
  <Radio v-bind="newProps" :checked="checked">
    <slot />
  </Radio>
</template>
<script>
import core from "./core";
import { Radio } from "ant-design-vue";
import props from "./props";
import {addTrigger} from './tool';
export default {
  props: {
    ...Radio.props,
    ...addTrigger(Radio),
    ...props,
  },
  emits: ["update:value", "update:checked", "update:preValue"],
  components: { Radio },
  setup(props, w) {
    let newProps = core(props, w, "radio");
    return {
      newProps,
    };
  },
};
</script>
