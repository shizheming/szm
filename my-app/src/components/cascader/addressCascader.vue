<template>
  <a-cascader
    change-on-select
    :options="
      propsObject.options === undefined
        ? cascaderOptionsArray
        : propsObject.options
    "
    :load-data="cascaderLoadDataFunction"
    placeholder="请选择"
    :inner="cascaderInnerFunction"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
import { areaRequestFunction } from '../../api/dictionary';
import { apiDictCacheObject } from '../../utils/global';

const propsObject = defineProps<{
  options?: CascaderProps['options'];
}>();

const emitsFunction = defineEmits<{
  (event: 'update:options', options: CascaderProps['options']): void;
}>();

const cascaderOptionsArray = ref<CascaderProps['options']>([]);
const cascaderLoadDataFunction: CascaderProps['loadData'] = async (
  selectedOptionsArray
) => {
  const targetOptionObject =
    selectedOptionsArray[selectedOptionsArray.length - 1];
  targetOptionObject.loading = true;

  let { data } = await areaRequestFunction({
    parent_id: selectedOptionsArray[selectedOptionsArray.length - 1]
      .value as number,
  });
  targetOptionObject.loading = false;
  targetOptionObject.children = data.map(({ id, name }) => {
    return {
      label: name,
      value: id,
      isLeaf: selectedOptionsArray.length === 3 ? true : false,
    };
  });
};
const cascaderInnerFunction = async () => {
  if (apiDictCacheObject.addressOptions) {
    cascaderOptionsArray.value = apiDictCacheObject.addressOptions;
    emitsFunction('update:options', apiDictCacheObject.addressOptions);
  } else {
    let { data } = await areaRequestFunction({
      parent_id: 1,
    });
    cascaderOptionsArray.value = data.map(({ id, name }) => {
      return {
        label: name,
        value: id,
        isLeaf: false,
      };
    });
    apiDictCacheObject.addressOptions = cascaderOptionsArray.value;
    emitsFunction('update:options', cascaderOptionsArray.value);
    Object.defineProperty(apiDictCacheObject, 'addressOptions', {
      writable: false,
    });
  }
};
</script>
