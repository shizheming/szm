<template>
  <TimePicker v-bind="newProps" :value="value">
    <slot />
  </TimePicker>
</template>
<script>
import core from "./core";
import { TimePicker } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
import { inject } from "vue";
export default {
  props: {
    ...TimePicker.props,
    ...addTrigger(TimePicker),
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { TimePicker },
  setup(props, w) {
    let newProps = core(props, w);
    let outer = inject("outer");

    /* outer函数 */
    if (props.outer) {
      outer[props.name] = () => {
        return props.outer(props.value);
      };
    } else {
      outer[props.name] = () => {
        if (props.value) {
          return Math.floor(props.value.valueOf() / 1000);
        }
      };
    }
    return {
      newProps,
    };
  },
};
</script>
