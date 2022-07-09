<template>
  <FormItem v-bind="newSlots">
    <slot />
  </FormItem>
</template>
<script setup lang="ts">
import { useSlots, useAttrs, ref, provide } from "vue";
import core from "./core";
import { FormItem } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const attrs = useAttrs();
const componentName = ref<string>(attrs.name as string);
provide("componentName", componentName);
const { newSlots } = core(p);
</script>
