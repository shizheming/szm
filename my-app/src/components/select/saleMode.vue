<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api_order_dict } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const options = ref<SelectProps['options']>([]);
const inner = async () => {
  if (apiDictCacheObject.saleModeOptions) {
    options.value = apiDictCacheObject.saleModeOptions;
  } else {
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
    apiDictCacheObject.saleModeOptions = options.value;
  }
};
</script>
