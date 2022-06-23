<template>
  <a-config-provider :locale="zhCN">
    <img alt="Vue logo" src="./assets/logo.png" />
    <detailModal v-model:visible="detailModalVisible" />
    <tableModal v-model:visible="tableModalVisible" />

    <test v-model:visible="visible" />
    <a-button type="primary" @click="showModal">弹窗</a-button>
  </a-config-provider>
</template>

<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { ref, defineAsyncComponent } from "vue";

const visible = ref();
const detailModalVisible = ref();
const tableModalVisible = ref();
const detailModal = defineAsyncComponent(() =>
  import("./components/detailModal.vue")
);
const tableModal = defineAsyncComponent(() =>
  import("./components/tableModal.vue")
);
const test = defineAsyncComponent(() => import("./components/test.vue"));

const showModal = () => {
  tableModalVisible.value = true;
};
</script>
