<template>
  <a-select :options="options" :inner="inner" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supplier_api } from "../../api/dictionary";

const options = ref([]);
const inner = async () => {
  let { data } = await supplier_api({
    type: "supplier_id",
  });
  options.value = data.map(({ id, name }: { id: number; name: string }) => ({
    label: name,
    value: id,
  }));
};
</script>

<style></style>
