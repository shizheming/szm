<template>
  <!-- 商品品牌 -->
  <a-select
    :options="
      propsObject.options === undefined
        ? selectionOptionsArray
        : propsObject.options
    "
    :inner="selectInnerFunction"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { brandRequestFunction } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const propsObject = defineProps<{
  options?: SelectProps['options'];
}>();

const emitsFunction = defineEmits<{
  (event: 'update:options', options: SelectProps['options']): void;
}>();

const selectionOptionsArray = ref<SelectProps['options']>([]);
const selectInnerFunction = async () => {
  if (apiDictCacheObject.goodsBrandOptions) {
    selectionOptionsArray.value = apiDictCacheObject.goodsBrandOptions;
    emitsFunction('update:options', apiDictCacheObject.goodsBrandOptions);
  } else {
    let { data } = await brandRequestFunction();
    selectionOptionsArray.value = data.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.goodsBrandOptions = selectionOptionsArray.value;
    emitsFunction('update:options', apiDictCacheObject.goodsBrandOptions);
  }
};
</script>
