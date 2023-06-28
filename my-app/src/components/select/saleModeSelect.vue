<template>
  <!-- 销售渠道 -->
  <a-select :options="selectionOptionsArray" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { dictRequestFunction } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const selectionOptionsArray = ref<SelectProps['options']>([]);
if (apiDictCacheObject.saleModeOptions) {
  selectionOptionsArray.value = apiDictCacheObject.saleModeOptions;
} else {
  dictRequestFunction({
    type: 'sale_mode',
  }).then(({ data: { sale_mode } }) => {
    selectionOptionsArray.value = sale_mode.map(({ value, code }) => {
      return {
        label: value,
        value: code,
      };
    });
    apiDictCacheObject.saleModeOptions = selectionOptionsArray.value;
  });
}
</script>
