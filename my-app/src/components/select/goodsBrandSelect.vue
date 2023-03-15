<template>
  <!-- 商品品牌 -->
  <a-select :options="selectionOptionsArray" :inner="selectInnerFunction" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { brandRequestFunction } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const selectionOptionsArray = ref<SelectProps['options']>([]);
const selectInnerFunction = async () => {
  if (apiDictCacheObject.goodsBrandOptions) {
    selectionOptionsArray.value = apiDictCacheObject.goodsBrandOptions;
  } else {
    let { data } = await brandRequestFunction();
    selectionOptionsArray.value = data.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.goodsBrandOptions = selectionOptionsArray.value;
  }
};
</script>
