<template>
  <Textarea v-bind="newProps" :value="value" allowClear auto-size/>
</template>
<script setup>
import core from "./core";
import { Textarea } from "ant-design-vue";
import props from "./props";

// 不删除这个属性会报警告
delete Textarea.props.prefix;

const p = defineProps({
  ...Textarea.props,
  ...props,
});
const emit = defineEmits(["update:value"]);
let newProps = core(p, emit, "input");

</script>
