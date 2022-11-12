<template>
  <a-cascader
    change-on-select
    :options="options"
    placeholder="请选择"
    :inner="inner"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api_goods_category } from '../../api/dictionary';
import type { CascaderProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const options = ref<CascaderProps['options']>([]);
const formatOptions = (category: CascaderProps['options']) => {
  return category!.map((item) => {
    item.label = item.name;
    item.value = item.id;
    if (item.child) {
      item.children = formatOptions(item.child);
    }
    return item;
  });
};

const inner = async () => {
  if (apiDictCacheObject.backgroundCategoryOptions) {
    options.value = apiDictCacheObject.backgroundCategoryOptions;
  } else {
    let { data } = await api_goods_category();
    options.value = formatOptions(data);
    apiDictCacheObject.backgroundCategoryOptions = options.value;
  }
};
</script>
