<template>
  <Textarea allowClear auto-size show-count :maxlength="200" v-bind="newSlots">
    <slot />
  </Textarea>
</template>
<script setup lang="ts">
import core from "./core";
import { Textarea } from "ant-design-vue";
import { PropsInterface } from "./props";

// 不删除这个属性会报警告
delete Textarea.props.prefix;

const p = defineProps<{
  isDetail?: Boolean;
  inner?: Function;
  watch?: any[];
  outer?: Function;
  // togetherhas: {
  //   type: Array,
  //   default: undefined,
  // },
  // togethernohas: {
  //   type: Array,
  //   default: undefined,
  // },
  // clear: {
  //   type: Boolean,
  //   default: undefined,
  // },
}>();
const { newSlots } = core(p);
</script>
