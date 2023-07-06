<template>
  <Textarea
    allow-clear
    auto-size
    show-count
    :max-length="200"
    placeholder="请输入"
    v-bind="newSlotsObject"
  >
    <slot />
  </Textarea>
</template>
<script setup lang="ts">
import core from './core';
import { Textarea } from 'ant-design-vue';
import { PropsInterface } from './props';

// 不删除这个属性会报警告
delete Textarea.props.prefix;

const propsObject = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();
const { newSlotsObject } = core(propsObject);
</script>
