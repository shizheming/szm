<template>
  <div>
    <s-select
      mode="multiple"
      :inner="selectInner"
      :value="props.selectValue"
      style="margin-bottom: 10px"
      @change="selectChange"
    />
    <a-table
      rowKey="id"
      :pagination="false"
      :columns="siteIdsValueColumns"
      :dataSource="props.tableValue"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'name'">
          <a @click="siteIdsValueGo(record)">{{ record.name }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <a class="table-button-red" @click="siteIdsValueDelete(record, index)"
            >删除</a
          >
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted, watch } from "vue";
import { message, Modal } from "ant-design-vue";
import { useRoute } from "vue-router";
import { toArray, once } from "lodash";
import axios from "../../api";
const route = useRoute();
// 是否编辑页
let isEdit = ref(!!route.query.marketing_id);
let selectOptions;
let echoSelectValue = [];
const props = defineProps([
  "value",
  "selectValue",
  "tableValue",
  "initialValue",
]);
const emit = defineEmits([
  "update:value",
  "update:selectValue",
  "update:tableValue",
]);
watch(
  () => props.value,
  (newValue, oldValue) => {
    emit("update:selectValue", newValue);
  }
);

watch(
  () => props.initialValue,
  (newValue, oldValue) => {
    echoSelectValue = newValue;
  }
);

watch(
  () => props.selectValue,
  (newValue, oldValue) => {
    let result = selectOptions.filter(({ id }) => {
      return toArray(props.selectValue).includes(id);
    });
    emit("update:tableValue", result);
  }
);

function selectChange(v) {
  emit("update:value", v);
  emit("update:selectValue", v);
}

function selectInner(select) {
  select.options = async function () {
    let {
      data: { list },
    } = await axios.get("/api/sys/site", {
      params: { page: 1, page_size: 1000, status: 1 },
    });
    let result = list.map((cur) => {
      return {
        ...cur,
        label: cur.name,
        value: cur.id,
      };
    });
    selectOptions = result;
    return result;
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
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
  },
];

function siteIdsValueGo(record) {
  alert(
    `我去/center/sys_manage#/site/list/edit?text=edit&id=${record.id}这个页面了`
  );
}
function siteIdsValueDelete(record, index) {
  if (isEdit && echoSelectValue.includes(record.id)) {
    message.warning("已创建活动店铺属于该站点，无法删除该站点");
    return;
  }
  let title = "确认要移除该站点吗？";

  if (!isEdit && echoSelectValue.includes(record.id)) {
    title = `活动适用店铺属于${record.name}站点，如果删除该站点的话，增品相关信息删自动清空，确定删除该站点?`;
  }
  Modal.confirm({
    title,
    onOk() {
      props.tableValue.splice(index, 1);
      if (!isEdit && echoSelectValue.includes(record.id)) {
        // emit("clear");
      }
    },
  });
}
</script>
