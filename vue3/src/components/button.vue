<template>
  <Button v-bind="newProps">
    <slot name="icon"/>
    <slot/>
  </Button>
</template>
<script setup>
import { Button } from "ant-design-vue";
import { useSlots } from "vue";
const slots = useSlots();
const p = defineProps({
  ...Button.props,
  type: {
    type: String,
    default: "primary",
  },
});
const newProps = { ...p };
</script>
