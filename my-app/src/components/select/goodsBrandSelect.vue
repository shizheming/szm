<template>
  <!-- 商品品牌 -->
  <a-select :options="selectionOptionsArray" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { brandRequestFunction } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const selectionOptionsArray = ref<SelectProps['options']>([]);
if (apiDictCacheObject.goodsBrandOptions) {
  selectionOptionsArray.value = apiDictCacheObject.goodsBrandOptions;
} else {
  brandRequestFunction().then(({ data }) => {
    selectionOptionsArray.value = data.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.goodsBrandOptions = selectionOptionsArray.value;
  });
}
</script>
