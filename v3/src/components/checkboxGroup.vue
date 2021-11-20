<template>
  <CheckboxGroup v-bind="newProps" :value="value">
    <slot />
  </CheckboxGroup>
</template>
<script>
import core from "./core";
import { CheckboxGroup } from "ant-design-vue";
import props from "./props";
import {forEach} from 'lodash';
let np={...props}
forEach(CheckboxGroup.props,(value, key) => {
  np[`trigger${key[0].toUpperCase() + key.slice(1)}`] = {
    type: [Number, String, Array, Object, Boolean],
    default: undefined,
  }
})
console.log(np,9)
export default {
  props: {
    ...CheckboxGroup.props,
    ...np,
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { CheckboxGroup },
  setup(props, w) {
    let newProps = core(props, w);
    return {
      newProps,
    };
  },
};
</script>
