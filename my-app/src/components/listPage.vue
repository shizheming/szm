<template>
  <a-form ref="formRef" :model="model" @finish="finish">
    <a-row :style="`height:${height};overflow:hidden`">
      <a-col :span="8"> </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item :wrapper-col="{ offset: 6 }">
          <a-space style="font-size: 18px" size="large">
            <a-button html-type="submit" type="primary">
              <search-outlined />
            </a-button>
            <clear-outlined @click="clearOutlinedClick" />
            <up-outlined @click="arrowClick" v-if="isExpandArrowBoolean" />
            <down-outlined @click="arrowClick" v-else />
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>

  <a-table
    rowKey="id"
    :dataSource="dataSource?.list"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    @change="tableChange"
  >
    <template
      #bodyCell="{
        column,
        record,
      }: {
        column: TableColumnType,
        record: ModelInterface,
      }"
    >
      <template v-if="column.key === 'operation'"> </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from "vue";
import {
  message,
  FormInstance,
  TableProps,
  TableColumnType,
  FormProps,
} from "ant-design-vue";
import {} from "../../../data/dictionary";
import { columns } from "./listPageData";
import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  ClearOutlined,
} from "@ant-design/icons-vue";
import type {
  ModelInterface,
  ConfirmsignInterface,
  ConfirmPreOrderInterface,
} from "./interface";
import { api } from "./api";
import { usePagination } from "vue-request";

const model = reactive<ModelInterface>({});
const formRef = ref<FormInstance>();
const height = ref<string>("220px");
const {
  data: dataSource,
  current,
  pageSize,
  run,
  loading,
  total,
} = usePagination(api, {
  formatResult: ({ data }) => {
    return data;
  },
  pagination: {
    currentKey: "page",
    pageSizeKey: "page_size",
    totalKey: "total",
  },
});

const pagination = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
  };
});

const finish: FormProps["onFinish"] = async (values) => {
  console.log(model, 123);
  run({
    page: 1,
    page_size: 10,
    ...model,
  });
};

const arrowClick = () => {
  isExpandArrowBoolean.value = !isExpandArrowBoolean.value;
};

const clearOutlinedClick = () => {
  formRef.value?.resetFields();
  model.order_search_value = undefined;
  model.good_search_value = undefined;
};

const tableChange: TableProps["onChange"] = async (pag) => {
  run({
    page: pag.current as number,
    page_size: pag.pageSize as number,
    ...model,
  });
};

const isExpandArrowBoolean = ref<boolean>(false);
watch(isExpandArrowBoolean, (newValue) => {
  if (newValue) {
    height.value = "auto";
  } else {
    height.value = "220px";
  }
});
</script>
