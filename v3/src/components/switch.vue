<template>
  <Switch v-bind="newProps" :checked="checked"/>
</template>
<script>
import core from "./core";
import { Switch } from "ant-design-vue";
import props from "./props";
import {addTrigger} from './tool';
export default {
  props: {
    ...Switch.props,
    ...addTrigger(Switch),
    ...props,
  },
  emits: ["update:value", "update:checked", "update:preValue"],
  components: { Switch },
  setup(props, w) {
    let newProps = core(props, w, 'switch');
    return {
      newProps,
    };
  },
};
</script>
