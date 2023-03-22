<template>
  <!-- 销售站点 -->
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
import { siteRequestFunction } from '../../api/dictionary';
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
  if (apiDictCacheObject.ownerSiteOptions) {
    selectionOptionsArray.value = apiDictCacheObject.ownerSiteOptions;
    emitsFunction('update:options', apiDictCacheObject.ownerSiteOptions);
  } else {
    let {
      data: { list },
    } = await siteRequestFunction({
      page: 1,
      page_size: 100,
    });
    selectionOptionsArray.value = list.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.ownerSiteOptions = selectionOptionsArray.value;
    emitsFunction('update:options', apiDictCacheObject.ownerSiteOptions);
  }
};
</script>
