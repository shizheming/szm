<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api_goods_brand_list } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const options = ref<SelectProps['options']>([]);
const inner = async () => {
  if (apiDictCacheObject.goodsBrand) {
    options.value = apiDictCacheObject.goodsBrand;
  } else {
    let { data } = await api_goods_brand_list();
    options.value = data.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.goodsBrand = options.value;
  }
};
</script>
