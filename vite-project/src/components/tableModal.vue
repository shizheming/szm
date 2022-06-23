<template>
  <a-modal
    :visible="props.visible"
    title="title"
    @cancel="cancel"
    :width="1000"
  >
    <template #footer>
      <a-button type="primary" @click="ok">确定</a-button>
    </template>
    <a-table
      rowKey="id"
      :dataSource="dataSource"
      :columns="columns"
      :loading="loading"
      :pagination="false"
    />
  </a-modal>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps(["visible"]);
const emits = defineEmits(["update:visible"]);
const dataSource = ref();
const loading = ref();
const columns = ref([
  {
    title: "title",
    dataIndex: "name1",
    key: "name1",
  },
  {
    title: "title",
    dataIndex: "name2",
    key: "name2",
  },
  {
    title: "title",
    dataIndex: "name3",
    key: "name3",
  },
  {
    title: "title",
    dataIndex: "name4",
    key: "name4",
  },
]);

watch(
  () => props.visible,
  (newValue) => {
    if (newValue === true) {
      loading.value = true;
      Promise.resolve({ data: [{ id: 1, name1: 1 }] }).then(({ data }) => {
        dataSource.value = data;
        loading.value = false;
      });
    }
  }
);

const ok = () => {
  emits("update:visible", false);
};
const cancel = () => {
  emits("update:visible", false);
};
</script>
