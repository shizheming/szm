<template>
  <Table v-bind="newProps">
    <slot />
  </Table>
</template>
<script setup>
/* table没有创建成功，还不能用，碰到的问题是slot里面吃不到，不知道是我不会用，还是这个版本的bug */
import core from "./core";
import { Table, TableColumn } from "ant-design-vue";
import { tableProps } from "ant-design-vue/lib/table";
import props from "./props";
const p = defineProps(props);
let newProps = core(p, "table");
</script>
