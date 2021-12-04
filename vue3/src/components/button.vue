<template>
  <Button v-bind="newProps">
    <slot />
  </Button>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core2";
import { Button } from "ant-design-vue";
import props from "./props2";

const attrs = useAttrs();
const p = defineProps({
  ...Button.props,
  ...props,
  type: {
    type: String,
    default: "primary",
  },
});
let newProps = core(p, attrs, "button");
</script>
