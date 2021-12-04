<template>
  <Table v-bind="newProps">
    <slot />
  </Table>
</template>
<script setup>
/* table没有创建成功，还不能用，碰到的问题是slot里面吃不到，不知道是我不会用，还是这个版本的bug */
import { useAttrs } from "vue";
import core from "./core2";
import { Table, TableColumn } from "ant-design-vue";
import { tableProps } from "ant-design-vue/lib/table";
import props from "./props2";
const attrs = useAttrs();
const p = defineProps({
  ...tableProps(),
  ...props,
});
let newProps = core(p, attrs, "table");
</script>
