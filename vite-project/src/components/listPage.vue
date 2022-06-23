<template>
  <a-form
    ref="formRef"
    style="border: 1px dashed #ccc; background-color: #fcfcfc"
    :model="formModel"
    @finish="finish"
  >
    <a-row :gutter="24" :style="`height:${height};overflow:hidden`">
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 7 }" :name="['a']">
          <a-input v-model:value="formModel.a" placeholder="placeholder" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 7 }" :name="['b']">
          <a-input-number
            v-model:value="formModel.b"
            placeholder="placeholder"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 7 }" :name="['time']">
          <a-range-picker v-model:value="formModel.time" style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 7 }" :name="['c']">
          <a-select v-model:value="formModel.c" placeholder="placeholder">
            <a-select-option :value="0">0</a-select-option>
            <a-select-option :value="1">1</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 7 }" :name="['d']">
          <a-input v-model:value="formModel.d" placeholder="placeholder" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 7 }" :name="['e']">
          <a-input v-model:value="formModel.e" placeholder="placeholder" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 7 }" :name="['f']">
          <a-input v-model:value="formModel.f" placeholder="placeholder" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 7 }" :name="['g']">
          <a-input v-model:value="formModel.g" placeholder="placeholder" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 7 }" :name="['h']">
          <a-input v-model:value="formModel.h" placeholder="placeholder" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row style="border-top: 1px solid #ddd; padding: 10px 100px">
      <a-col :span="24">
        <a-button type="primary" html-type="submit">搜索</a-button>
        <a-button style="margin: 0 8px" @click="resetformClick">重置</a-button>
        <a style="font-size: 12px" @click="expandArrowClick">
          <template v-if="isExpandArrow"> 展开<down-outlined /> </template>
          <template v-else> 收起<up-outlined /> </template>
        </a>
      </a-col>
    </a-row>
  </a-form>
  <a-row style="margin: 30px 0">
    <a-space>
      <router-link to="/">
        <a-button type="primary" @click="createPageClick">创建</a-button>
      </router-link>
      <a-button type="primary" @click="chooseTableClick">选择</a-button>
    </a-space>
  </a-row>
  <a-table
    rowKey="id"
    :row-selection="{ selectedRowKeys, onChange }"
    :dataSource="dataSource"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    @change="tableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <a-space>
          <router-link to="/"><a>查看</a></router-link>
          <router-link to="/"><a>编辑</a></router-link>
        </a-space>
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { ref, watch, reactive } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const isExpandArrow = ref();
const formModel = reactive({});
const formRef = ref();
const dataSource = ref();
const loading = ref();
const height = ref();
const pagination = reactive({});
const selectedRowKeys = ref([]);
const selectedRows = ref();
const columns = ref([
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
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

watch(isExpandArrow, (newValue) => {
  if (newValue) {
    height.value = "100px";
  } else {
    height.value = "auto";
  }
});

const onChange = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRows.value = rows;
};
const finish = async (values) => {
  tableChange();
};

const expandArrowClick = () => {
  isExpandArrow.value = !isExpandArrow.value;
};
const resetformClick = () => {
  formRef.value.resetFields();
};
const tableChange = async () => {
  loading.value = true;
  let submitData = { ...formModel };
  if (submitData.time?.length) {
    submitData.start = submitData.time[0].valueOf() * 1000;
    submitData.end = submitData.time[1].valueOf() * 1000;
  }
  console.log(submitData, 293);
  let { data } = await Promise.resolve({ data: [{ id: 1, name1: 1234 }] });
  dataSource.value = data;
  pagination.total = data.total;
  pagination.page = data.page;
  pagination.pageSize = data.pageSize;
  loading.value = false;
};

const chooseTableClick = async () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning("请选择");
    return;
  }
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    tableChange();
  }, 500);
};
// 初始化
tableChange();
</script>
