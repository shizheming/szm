<template>
  <FormItem v-bind="newSlots">
    <slot />
  </FormItem>
</template>
<script setup>
import { useSlots, useAttrs, ref, provide } from "vue";
import core from "./core";
import { FormItem } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const attrs = useAttrs();
const componentName = ref(attrs.name);
provide("componentName", componentName);
const { bindValue, newSlots } = core(p, emit, "formItem");
</script>
