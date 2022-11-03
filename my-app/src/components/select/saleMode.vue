<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api_order_dict } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';

const options = ref<SelectProps['options']>([]);
const inner = async () => {
  let {
    data: { sale_mode },
  } = await api_order_dict({
    type: 'sale_mode',
  });
  options.value = sale_mode.map(({ value, code }) => {
    return {
      label: value,
      value: code,
    };
  });
};
</script>
