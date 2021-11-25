<template>
  <Textarea v-bind="newProps" :value="value" allowClear auto-size/>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core";
import { Textarea } from "ant-design-vue";
import props from "./props";
import { addTrigger } from "./tool";

// 不删除这个属性会报警告
delete Textarea.props.prefix;

const attrs = useAttrs();
const p = defineProps({
  ...Textarea.props,
  ...addTrigger(Textarea),
  ...props,
});
const emit = defineEmits(["update:value", "update:preValue"]);
let newProps = core(p, emit, attrs, "input");

</script>
