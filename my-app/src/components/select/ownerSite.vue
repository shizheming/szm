<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api_sys_site } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';

const options = ref<SelectProps['options']>([]);
const inner = async () => {
  if (apiDictCacheObject.ownerSiteOptions) {
    options.value = apiDictCacheObject.ownerSiteOptions;
  } else {
    let {
      data: { list },
    } = await api_sys_site({
      page: 1,
      page_size: 100,
    });
    options.value = list.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.ownerSiteOptions = options.value;
  }
};
</script>
