<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld v-model:visible="visible" @success="ok" />
  <a-button type="primary" @click="showModal">Open Modal</a-button>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";

const visible = ref();
const HelloWorld = defineAsyncComponent(() =>
  import("./components/HelloWorld.vue")
);
const showModal = () => {
  visible.value = true;
};
const ok = () => {
  console.log(123);
};
</script>
