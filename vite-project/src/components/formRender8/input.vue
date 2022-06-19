<template>
  <Input v-bind="newProps" allowClear>
    <slot />
  </Input>
</template>
<script setup>
import core from "./core";
import { Input } from "ant-design-vue";
import props from "./props";
import { useSlots, useAttrs } from "vue";
import { forEach } from "lodash";

const slots = useSlots();
let newSlots = {};
forEach(slots, (value, key) => {
  newSlots[key] = value();
});
const p = defineProps(props);
const emit = defineEmits(["update:value"]);
let newProps = Object.assign(core(p, emit, "input"), newSlots);
</script>

<style>
.formDetail .ant-input-disabled {
  color:#000;
  cursor: context-menu;
}
</style>