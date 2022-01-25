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
let isEdit = ref(!!route.query.marketing_id);
let selectOptions = ref();
let echoSelectValue = [];
const selectValue = ref();
const dataSource = ref();
const props = defineProps(["value", "trigger"]);
const emit = defineEmits(["update:value"]);
if (formDetail?.value?.use_scope) {
  selectValue.value = props.value;
  echoSelectValue = formDetail.value.use_scope.site_list
    .filter((item) => {
      return !!item.is_shop_site;
    })
    .map((item) => {
      return item.id;
    });
}

watch(
  () => selectValue.value,
  (newValue, oldValue) => {
    console.log(12);
    selectOptions.value
      ?.filter((cur) => {
        return Object.values(newValue).includes(cur.value);
      })
      .forEach((cur) => {
        cur.disabled = true;
      });
    let result = selectOptions.value?.filter(({ id }) => {
      return toArray(selectValue.value).includes(id);
    });
    dataSource.value = result;
  }
);

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

function selectChange(v) {
  console.log(v,2393)
  selectOptions.value
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
  selectOptions.value = result;
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
      let a = selectOptions.value
        .filter((cur) => {
          return detValue.value === cur.value;
        })
        .forEach((cur) => {
          cur.disabled = false;
        });
      selectValue.value = values;
      emit("update:value", values);
      /* if (!isEdit && echoSelectValue.includes(record.id)) {
        emit("clear");
      } */
    },
  });
}
</script>
