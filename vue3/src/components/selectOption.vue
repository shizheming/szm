<template>
  <SelectOption v-bind="newProps" :value="value">
    <slot />
  </SelectOption>
</template>
<script setup>
import { SelectOption } from "ant-design-vue";

const newProps = defineProps({
  ...SelectOption.props,
});
</script>
