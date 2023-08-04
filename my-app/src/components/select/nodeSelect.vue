<template>
  <!-- 商品品牌 -->
  <a-select :options="selectionOptionsArray" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { nodeRequestFunction } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const selectionOptionsArray = ref<SelectProps['options']>([]);
if (apiDictCacheObject.goodsBrandOptions) {
  selectionOptionsArray.value = apiDictCacheObject.goodsBrandOptions;
} else {
  nodeRequestFunction({ page: 1, page_size: 999 }).then(
    ({ data: { list } }) => {
      selectionOptionsArray.value = list.map(({ id, name }) => {
        return {
          label: name,
          value: id,
        };
      });
      apiDictCacheObject.goodsBrandOptions = selectionOptionsArray.value;
    }
  );
}
</script>
