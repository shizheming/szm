<template>
  <s-select :options="options" :inner="inner" />
</template>

<script setup>
import { ref } from "vue";
import { supplier_api } from "../../api/dictionary";

const options = ref([]);
const inner = async () => {
  let { data } = await supplier_api({
    type: "supplier_id",
  });
  options.value = data.map(({ id, name }) => ({ label: name, value: id }));
};
</script>

<style></style>
