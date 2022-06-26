<template>
  <a-input @change="change" />
</template>

<script setup>
import { Form } from "ant-design-vue";
const props = defineProps(["value"]);
const emits = defineEmits(["update:value"]);
const change = (e) => {
  emits("update:value", e.target.value);
};
</script>

<style></style>
