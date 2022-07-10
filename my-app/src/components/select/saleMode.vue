<template>
  <a-select :options="options" :inner="inner" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { dictionary_api } from "../../api/dictionary";

const options = ref([]);
const inner = async () => {
  let {
    data: { sale_mode },
  }: { data: { sale_mode: [] } } = await dictionary_api({
    type: "sale_mode",
  });
  options.value = sale_mode.map(({ value, code }) => {
    return {
      label: value,
      value: code,
    };
  });
};
</script>
