<template>
  <Switch v-bind="newSlots" v-model:value="bindValue">
    <slot />
  </Switch>
</template>
<script setup>
import core from "./core";
import { Switch } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:checked"]);
const { bindValue, newSlots } = core(p, emit, "switch");
</script>
