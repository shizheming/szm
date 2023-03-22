<template>
  <!-- 供应商 -->
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
import { supplierRequestFunction } from '../../api/dictionary';
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
  if (apiDictCacheObject.supplierOptions) {
    selectionOptionsArray.value = apiDictCacheObject.supplierOptions;
    emitsFunction('update:options', apiDictCacheObject.supplierOptions);
  } else {
    let { data } = await supplierRequestFunction();
    selectionOptionsArray.value = data.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
    apiDictCacheObject.supplierOptions = selectionOptionsArray.value;
    emitsFunction('update:options', apiDictCacheObject.supplierOptions);
  }
};
</script>

<style></style>
