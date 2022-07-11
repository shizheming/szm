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

interface options {
  label: string;
  value: number;
  name: string;
  id: number;
  children?: options[];
  child?: options[];
}
const options: options = ref([]);
const formatOptions = (category: options[]) => {
  return category.map((item) => {
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
