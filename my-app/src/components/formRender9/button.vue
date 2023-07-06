<template>
  <Button v-bind="newSlotsObject">
    <slot />
  </Button>
</template>
<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { useSlots } from 'vue';
import { forEach } from 'lodash';
const slots = useSlots();

const propsObject = defineProps<{
  
  inner?: () => void;
  watch?: any[];
  outer?: () => void;
}>();

let newSlotsObject: { [name: string]: any } = {};
forEach(slots, (value, key) => {
  newSlotsObject[key] = (<Function>value)();
});
</script>
