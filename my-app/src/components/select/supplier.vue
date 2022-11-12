<template>
  <a-select :options="options" :inner="inner" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api_stock_supplier_get__all_list } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';
const options = ref<SelectProps['options']>([]);
const inner = async () => {
  if (apiDictCacheObject.supplierOptions) {
    options.value = apiDictCacheObject.supplierOptions;
  } else {
    let { data } = await api_stock_supplier_get__all_list();
    options.value = data.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
    apiDictCacheObject.supplierOptions = options.value;
  }
};
</script>

<style></style>
