<template>
  <!-- 供应商 -->
  <a-select :options="selectionOptionsArray" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { supplierRequestFunction } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const selectionOptionsArray = ref<SelectProps['options']>([]);
if (apiDictCacheObject.supplierOptions) {
  selectionOptionsArray.value = apiDictCacheObject.supplierOptions;
} else {
  await supplierRequestFunction().then(({ data }) => {
    selectionOptionsArray.value = data.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
    apiDictCacheObject.supplierOptions = selectionOptionsArray.value;
  });
}
</script>

<style></style>
