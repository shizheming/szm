<template>
  <a-config-provider :locale="zhCN">
    <router-link to="/listPage">列表页</router-link>
    <router-link to="/formPage">表单页</router-link>
    <router-view></router-view>
    <img alt="Vue logo" src="./assets/logo.png" />
    <detailModal v-model:visible="detailModalVisible" />
    <detailDrawer v-model:visible="detailDrawerVisible" />

    <tableModal v-model:visible="tableModalVisible" />
    <searchModal
      v-model:visible="searchModalVisible"
      :selectedRowKeys="searchModalSelectedRowKeys"
      @select="searchModalSelect"
    />
    <formModal v-model:visible="formModalVisible" @submit="formModalSubmit" />

    <test v-model:visible="visible" />
    <a-button type="primary" @click="showDetailModalbuttonClick"
      >显示详情弹窗</a-button
    >
    <a-button type="primary" @click="showTableModalbuttonClick"
      >显示表格弹窗</a-button
    >
    <a-button type="primary" @click="showSearchModalbuttonClick"
      >显示搜索弹窗</a-button
    >
    <a-button type="primary" @click="showFormModalbuttonClick"
      >显示表单弹窗</a-button
    >
    <a-button type="primary" @click="showDetailDrawerbuttonClick"
      >显示抽屉弹窗</a-button
    >
    <a-button type="primary" @click="testClick">test</a-button>
  </a-config-provider>
</template>

<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { ref, defineAsyncComponent } from "vue";

const visible = ref();
const detailModalVisible = ref();
const detailDrawerVisible = ref();
const tableModalVisible = ref();
const searchModalVisible = ref();
const formModalVisible = ref();
const searchModalSelectedRowKeys = ref([1]);
const detailModal = defineAsyncComponent(() =>
  import("./components/detailModal.vue")
);
const detailDrawer = defineAsyncComponent(() =>
  import("./components/detailDrawer.vue")
);
const tableModal = defineAsyncComponent(() =>
  import("./components/tableModal.vue")
);
const searchModal = defineAsyncComponent(() =>
  import("./components/searchModal.vue")
);
const formModal = defineAsyncComponent(() =>
  import("./components/formModal.vue")
);
const test = defineAsyncComponent(() => import("./views/test.vue"));

const showDetailModalbuttonClick = () => {
  detailModalVisible.value = true;
};
const showDetailDrawerbuttonClick = () => {
  detailDrawerVisible.value = true;
};
const showTableModalbuttonClick = () => {
  tableModalVisible.value = true;
};
const showSearchModalbuttonClick = () => {
  searchModalVisible.value = true;
};
const showFormModalbuttonClick = () => {
  formModalVisible.value = true;
};
const searchModalSelect = (data) => {
  console.log(data, 123);
};
const formModalSubmit = () => {
  console.log(1234);
};

const testClick = () => {
  visible.value = true;
};
</script>
