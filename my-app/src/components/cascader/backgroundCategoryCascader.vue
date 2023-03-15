<template>
  <a-cascader
    change-on-select
    :options="cascaderOptionsArray"
    placeholder="请选择"
    :inner="cascaderInnerFunction"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { categoryRequestFunction } from '../../api/dictionary';
import type { CascaderProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const cascaderOptionsArray = ref<CascaderProps['options']>([]);
const formatOptionsArray = (category: CascaderProps['options']) => {
  return category!.map((item) => {
    item.label = item.name;
    item.value = item.id;
    if (item.child) {
      item.children = formatOptionsArray(item.child);
    }
    return item;
  });
};

const cascaderInnerFunction = async () => {
  if (apiDictCacheObject.backgroundCategoryOptions) {
    cascaderOptionsArray.value = apiDictCacheObject.backgroundCategoryOptions;
  } else {
    let { data } = await categoryRequestFunction();
    cascaderOptionsArray.value = formatOptionsArray(data);
    apiDictCacheObject.backgroundCategoryOptions = cascaderOptionsArray.value;
    Object.defineProperty(apiDictCacheObject, 'backgroundCategoryOptions', {
      writable: false,
    });
  }
};
</script>
