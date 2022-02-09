<template>
  <div>
    <s-select
      mode="multiple"
      :allowClear="false"
      :inner-options="selectInner"
      v-model:value="selectValue"
      style="margin-bottom: 10px"
      @change="selectChange"
    />
    <a-table
      rowKey="id"
      :pagination="false"
      :columns="columns"
      :dataSource="dataSource"
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
import { ref, toRefs, reactive, onMounted, watch, inject } from "vue";
import { message, Modal } from "ant-design-vue";
import { useRoute } from "vue-router";
import { toArray, once, cloneDeep } from "lodash";
import axios from "../../api";

const route = useRoute();
const formAttrs = inject("formComponents");
const formDetail = inject("detailData");
let isEdit = inject("isEdit");
let echoSelectValue = [];
const selectValue = ref();
const dataSource = ref();
const props = defineProps(["value", "trigger"]);
const emit = defineEmits(["update:value"]);

// 获取datasource
watch(
  () => selectValue.value,
  (newValue, oldValue) => {
    dataSource.value = formAttrs[
      "use_scope.site_ids_value"
    ].optionsDetail?.filter(({ id }) => {
      return selectValue.value.includes(id);
    });
  }
);

// 更新这个存站点的值
watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue) {
      let [obj] = formAttrs["use_scope.shop_id"].optionsDetail.filter((cur) => {
        return cur.value === newValue;
      });
      echoSelectValue = [obj.site_id];
    } else {
      echoSelectValue = [];
    }
  }
);

if (isEdit) {
  // 编辑的时候存一下站点信息，删除的时候用
  echoSelectValue = formDetail.value.use_scope.site_list
    .filter((item) => {
      return !!item.is_shop_site;
    })
    .map((item) => {
      return item.id;
    });
}

function selectChange(v) {
  formAttrs["use_scope.site_ids_value"].optionsDetail
    .filter((cur) => {
      return Object.values(v).includes(cur.value);
    })
    .forEach((cur) => {
      cur.disabled = true;
    });
  emit("update:value", v);
}

async function selectInner() {
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
  return result;
}

const columns = [
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
      let [detValue] = dataSource.value.splice(index, 1);
      let values = dataSource.value.map((cur) => cur.value);
      formAttrs["use_scope.site_ids_value"].optionsDetail
        .filter((cur) => {
          return detValue.value === cur.value;
        })
        .forEach((cur) => {
          cur.disabled = false;
        });
      selectValue.value = values;
      emit("update:value", values);
      // 这东西有撒用，上面判断都已经不让删掉了
      /* if (!isEdit && echoSelectValue.includes(record.id)) {
        emit("clear");
      } */
    },
  });
}
</script>
