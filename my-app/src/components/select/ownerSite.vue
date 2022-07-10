<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { owner_site_api } from "../../api/dictionary";

const options = ref([]);
const inner = async () => {
  let {
    data: { list },
  }: { data: { list: [] } } = await owner_site_api({
    page: 1,
    page_size: 100,
  });
  options.value = list.map(({ id, name }) => {
    return {
      label: name,
      value: id,
    };
  });
};
</script>
