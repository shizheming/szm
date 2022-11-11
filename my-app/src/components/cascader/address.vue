<template>
  <a-cascader
    change-on-select
    :options="options"
    :load-data="loadData"
    placeholder="请选择"
    :inner="inner"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
import { api_common_area } from '../../api/dictionary';

const options = ref<CascaderProps['options']>([]);
const loadData: CascaderProps['loadData'] = async (selectedOptions) => {
  const targetOption = selectedOptions[selectedOptions.length - 1];
  targetOption.loading = true;

  // load options lazily
  let { data } = await api_common_area({
    parent_id: selectedOptions[selectedOptions.length - 1].value as number,
  });
  targetOption.loading = false;
  targetOption.children = data.map(({ id, name }) => {
    return {
      label: name,
      value: id,
      isLeaf: selectedOptions.length === 3 ? true : false,
    };
  });
};
const inner = async () => {
  let { data } = await api_common_area({
    parent_id: 1,
  });
  options.value = data.map(({ id, name }) => {
    return {
      label: name,
      value: id,
      isLeaf: false,
    };
  });
};
</script>
