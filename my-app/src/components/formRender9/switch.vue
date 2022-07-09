<template>
  <Switch v-bind="newSlots">
    <slot />
  </Switch>
</template>
<script setup lang="ts">
import core from "./core";
import { Switch } from "ant-design-vue";
import props from "./props";

const p = defineProps(props);
const emit = defineEmits(["update:checked"]);
const { newSlots } = core(p);
</script>
