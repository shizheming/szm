<template>
  <div>
    <s-select mode="multiple" />
    <s-button @click="siteIdsValueAdd" style="margin: 10px 0">添加</s-button>
    <a-table
      rowKey="id"
      :pagination="false"
      :columns="siteIdsValueColumns"
      :dataSource="siteIdsValueData"
    >
      <template slot="name" slot-scope="text, record">
        <a @click="siteIdsValueGo(record)">{{ record.name }}</a>
      </template>
      <template slot="action" slot-scope="text, record, index">
        <a class="table-button-red" @click="siteIdsValueDelete(record, index)"
          >删除</a
        >
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted } from "vue";
let siteIdsValueData = ref();
const siteIdsValueColumns = [
  {
    title: "站点ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "站点名称",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
function siteIdsValueGo() {}
function siteIdsValueDelete() {}
function siteIdsValueAdd() {}
</script>
