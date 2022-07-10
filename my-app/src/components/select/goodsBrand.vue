<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { goods_brand_api } from "../../api/dictionary";

const options = ref([]);
const inner = async () => {
  let { data }: { data: [] } = await goods_brand_api();
  options.value = data.map(({ id, name }) => {
    return {
      label: name,
      value: id,
    };
  });
};
</script>
