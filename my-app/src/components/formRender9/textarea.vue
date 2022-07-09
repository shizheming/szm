<template>
  <Textarea allowClear auto-size v-bind="newSlots">
    <slot />
  </Textarea>
</template>
<script setup lang="ts">
import core from "./core";
import { Textarea } from "ant-design-vue";
import props from "./props";

// 不删除这个属性会报警告
delete Textarea.props.prefix;

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { newSlots } = core(p);
</script>
