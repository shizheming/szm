<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api_goods_brand_list } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';

const options = ref<SelectProps['options']>([]);
const inner = async () => {
  let { data } = await api_goods_brand_list();
  options.value = data.map(({ id, name }) => {
    return {
      label: name,
      value: id,
    };
  });
};
</script>
