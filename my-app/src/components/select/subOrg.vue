<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api_sys_org } from '../../api/dictionary';
import type { SelectProps } from 'ant-design-vue';
import { apiDictCacheObject } from '../../utils/global';
const options = ref<SelectProps['options']>([]);
const inner = async () => {
  if (apiDictCacheObject.subOrgOptions) {
    options.value = apiDictCacheObject.subOrgOptions;
  } else {
    let {
      data: { list },
    } = await api_sys_org({
      page: 1,
      page_size: 100,
    });
    options.value = list.map(({ id, name }) => {
      return {
        label: name,
        value: id,
      };
    });
    apiDictCacheObject.subOrgOptions = options.value;
  }
};
</script>
