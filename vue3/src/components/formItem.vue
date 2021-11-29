<template>
  <FormItem v-bind="newProps">
    <slot />
  </FormItem>
</template>
<script setup>
import { useAttrs, ref, provide } from "vue";
import core from "./core2";
import { FormItem } from "ant-design-vue";
import props from "./props2";
import { addTrigger } from "./tool";
const attrs = useAttrs();
const p = defineProps({
  ...FormItem.props,
  ...addTrigger(FormItem),
  ...props,
});
const componentName = ref(p.name);
provide("componentName", componentName);
let newProps = core(p, attrs);
</script>
