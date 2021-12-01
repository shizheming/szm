<template>
  <div>
    <s-select
      mode="multiple"
      :inner="selectInner"
      v-model:value="selectValue"
      style="margin-bottom: 10px"
    />
    <s-table
      rowKey="id"
      :pagination="false"
      :columns="siteIdsValueColumns"
      :trigger-dataSource="selectValue"
      :triggeraction-dataSource="dataSourceTrigger"
    >
      <template slot="name" slot-scope="text, record">
        <a @click="siteIdsValueGo(record)">{{ record.name }}</a>
      </template>
      <template slot="action" slot-scope="text, record, index">
        <a class="table-button-red" @click="siteIdsValueDelete(record, index)"
          >删除</a
        >
      </template>
    </s-table>
  </div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted } from "vue";
import { toArray } from "lodash";
import axios from "../../api";

const emit = defineEmits(["update:value"]);
let selectValue = ref();
function selectInner(select) {
  select.options = async function () {
    let {
      data: { list },
    } = await axios.get("/api/sys/site", {
      params: { page: 1, page_size: 1000, status: 1 },
    });
    return list.map((cur) => {
      return {
        ...cur,
        label: cur.name,
        value: cur.id,
      };
    });
  };
}

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
function dataSourceTrigger({ site_ids_value }) {
  let result = site_ids_value.optionsDetail.filter(({ id }) => {
    return toArray(selectValue.value).includes(id);
  });
  emit("update:value", result);
  return result;
}

function siteIdsValueGo() {}
function siteIdsValueDelete() {}
</script>
