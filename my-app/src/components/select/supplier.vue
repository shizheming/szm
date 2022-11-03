<template>
  <a-select :options="options" :inner="inner" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api_stock_supplier_get__all_list } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
const options = ref<SelectProps['options']>([]);
const inner = async () => {
  let { data } = await api_stock_supplier_get__all_list();
  options.value = data.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
};
</script>

<style></style>
