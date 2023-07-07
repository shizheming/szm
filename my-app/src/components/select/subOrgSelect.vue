<template>
  <!-- 订单销售组织 -->
  <a-select :options="selectionOptionsArray" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { orgRequestFunction } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const selectionOptionsArray = ref<SelectProps['options']>([]);
if (apiDictCacheObject.subOrgOptions) {
  selectionOptionsArray.value = apiDictCacheObject.subOrgOptions;
} else {
  orgRequestFunction({
    page: 1,
    page_size: 100,
  }).then(({ data: { list } }) => {
    selectionOptionsArray.value = list.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.subOrgOptions = selectionOptionsArray.value;
  });
}
</script>
