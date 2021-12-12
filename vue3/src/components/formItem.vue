<template>
  <FormItem v-bind="newProps">
    <slot />
  </FormItem>
</template>
<script setup>
import { useSlots, useAttrs, ref, provide } from "vue";
import core from "./core2";
import { FormItem } from "ant-design-vue";
import props from "./props2";
import { forEach } from "lodash";

const slots = useSlots();
let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});

const attrs = useAttrs();
const p = defineProps({
  ...FormItem.props,
  ...props,
});
const componentName = ref(p.name);
provide("componentName", componentName);
let newProps = Object.assign(core(p, attrs), newSlots);
</script>
