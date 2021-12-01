<template>
  <Table v-bind="newProps">
    <slot />
  </Table>
</template>
<script setup>
import { useAttrs } from "vue";
import core from "./core2";
import { Table } from "ant-design-vue";
import { tableProps } from "ant-design-vue/lib/table";
import props from "./props2";
import { addTrigger } from "./tool";
const attrs = useAttrs();
const p = defineProps({
  ...tableProps(),
  ...addTrigger({
    props: tableProps(),
  }),
  ...props,
});
let newProps = core(p, attrs, "table");
</script>
