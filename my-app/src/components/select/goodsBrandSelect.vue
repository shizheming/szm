<template>
  <!-- 商品品牌 -->
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { brandRequest } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const options = ref<SelectProps['options']>([]);
const inner = async () => {
  if (apiDictCacheObject.goodsBrandOptions) {
    options.value = apiDictCacheObject.goodsBrandOptions;
  } else {
    let { data } = await brandRequest();
    options.value = data.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.goodsBrandOptions = options.value;
  }
};
</script>
