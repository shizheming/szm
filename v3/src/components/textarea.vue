<template>
  <Textarea v-bind="newProps" :value="value" allowClear auto-size/>
</template>
<script>
import core from "./core";
import { Textarea } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";
let p = {
  ...Textarea.props,
  ...addTrigger(Textarea),
  ...props,
};
// 不删除这个属性会报警告
delete p.prefix;
export default {
  props: p,
  emits: ["update:value", "update:preValue"],
  components: { Textarea },
  setup(props, w) {
    console.log(props, 200);
    let newProps = core(props, w, "input");
    return {
      newProps,
    };
  },
};
</script>
