<template>
  <TimeRangePicker v-bind="newProps" :value="value">
    <slot />
  </TimeRangePicker>
</template>
<script>
import core from "./core";
import { TimeRangePicker } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
import { inject } from "vue";
export default {
  props: {
    ...TimeRangePicker.props,
    ...addTrigger(TimeRangePicker),
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { TimeRangePicker },
  setup(props, w) {
    let newProps = core(props, w);
    let outer = inject("outer");

    /* outer函数 */
    if (props.outer) {
      outer[props.name] = () => {
        return props.outer(props.value);
      };
    } else {
      outer[`${props.name}_start`] = () => {
        if (props.value) {
          return Math.floor(props.value[0].valueOf() / 1000);
        }
      };
      outer[`${props.name}_end`] = () => {
        if (props.value) {
          return Math.floor(props.value[1].valueOf() / 1000);
        }
      };
    }
    return {
      newProps,
    };
  },
};
</script>
