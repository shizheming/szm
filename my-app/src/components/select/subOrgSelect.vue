<template>
  <!-- 订单销售组织 -->
  <a-select :options="selectionOptionsArray" :inner="selectInnerFunction" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { orgRequestFunction } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';
const selectionOptionsArray = ref<SelectProps['options']>([]);
const selectInnerFunction = async () => {
  if (apiDictCacheObject.subOrgOptions) {
    selectionOptionsArray.value = apiDictCacheObject.subOrgOptions;
  } else {
    let {
      data: { list },
    } = await orgRequestFunction({
      page: 1,
      page_size: 100,
    });
    selectionOptionsArray.value = list.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.subOrgOptions = selectionOptionsArray.value;
  }
};
</script>
