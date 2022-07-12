<template>
  <a-cascader
    change-on-select
    :options="options"
    placeholder="请选择"
    :inner="inner"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { background_category_api } from "../../api/dictionary";
import type { CascaderProps } from "ant-design-vue";

interface formatOptionsInterface {
  name: string;
  id: number;
  label: string;
  value: number;
  child?: formatOptionsInterface[];
  children?: formatOptionsInterface[];
}
const options = ref<CascaderProps["options"]>([]);
const formatOptions = (category: formatOptionsInterface[]) => {
  return category.map((item: formatOptionsInterface) => {
    item.label = item.name;
    item.value = item.id;

    if (item.child) {
      item.children = formatOptions(item.child);
    }

    return item;
  });
};
const inner = async () => {
  let { data }: { data: [] } = await background_category_api();
  options.value = formatOptions(data);
};
</script>
