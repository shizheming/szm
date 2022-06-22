<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <detailModal v-model:visible="visible" />
  <test v-model:visible="visible" />
  <a-button type="primary" @click="showModal">Open Modal</a-button>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";

const visible = ref();
const detailModal = defineAsyncComponent(() =>
  import("./components/detailModal.vue")
);
const test = defineAsyncComponent(() => import("./components/test.vue"));
const showModal = () => {
  visible.value = true;
};
</script>
