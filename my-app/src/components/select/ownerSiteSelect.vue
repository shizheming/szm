<template>
  <!-- 销售站点 -->
  <a-select :options="selectionOptionsArray" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { siteRequestFunction } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const selectionOptionsArray = ref<SelectProps['options']>([]);
if (apiDictCacheObject.ownerSiteOptions) {
  selectionOptionsArray.value = apiDictCacheObject.ownerSiteOptions;
} else {
  siteRequestFunction({
    page: 1,
    page_size: 100,
  }).then(({ data: { list } }) => {
    selectionOptionsArray.value = list.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.ownerSiteOptions = selectionOptionsArray.value;
  });
}
</script>
