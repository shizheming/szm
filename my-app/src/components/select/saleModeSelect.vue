<template>
  <!-- 销售渠道 -->
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
import { dictRequestFunction } from '../../api/dictionary';
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
  if (apiDictCacheObject.saleModeOptions) {
    selectionOptionsArray.value = apiDictCacheObject.saleModeOptions;
    emitsFunction('update:options', apiDictCacheObject.saleModeOptions);
  } else {
    let {
      data: { sale_mode },
    } = await dictRequestFunction({
      type: 'sale_mode',
    });
    selectionOptionsArray.value = sale_mode.map(({ value, code }) => {
      return {
        label: value,
        value: code,
      };
    });
    apiDictCacheObject.saleModeOptions = selectionOptionsArray.value;
    emitsFunction('update:options', apiDictCacheObject.saleModeOptions);
  }
};
</script>
