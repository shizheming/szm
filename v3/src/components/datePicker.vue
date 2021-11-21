<template>
  <DatePicker v-bind="newProps" :value="value">
    <slot />
  </DatePicker>
</template>
<script>
import core from "./core";
import { DatePicker } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
import { inject } from "vue";
export default {
  props: {
    ...DatePicker.props,
    ...addTrigger(DatePicker),
    ...props,
  },
  emits: ["update:value", "update:preValue"],
  components: { DatePicker },
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
