<template>
  <Button type="primary" v-bind="newSlots" />
</template>
<script setup>
import { Button } from "ant-design-vue";
import props from "./props";
import core from "./core";

const p = defineProps(props);
const emit = defineEmits(["update:value"]);
const { newSlots } = core(p, emit);
</script>
