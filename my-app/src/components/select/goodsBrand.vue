<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { goods_brand_api } from "../../api/dictionary";
import type { SelectProps } from "ant-design-vue";

const options = ref<SelectProps["options"]>([]);
const inner = async () => {
  let { data }: { data: [] } = await goods_brand_api();
  options.value = data.map(({ id, name }: { id: number; name: string }) => {
    return {
      label: name,
      value: id,
    };
  });
};
</script>
