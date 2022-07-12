<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { owner_site_api } from "../../api/dictionary";
import type { SelectProps } from "ant-design-vue";

const options = ref<SelectProps["options"]>([]);
const inner = async () => {
  let {
    data: { list },
  }: { data: { list: [] } } = await owner_site_api({
    page: 1,
    page_size: 100,
  });
  options.value = list.map(({ id, name }: { id: number; name: string }) => {
    return {
      label: name,
      value: id,
    };
  });
};
</script>
