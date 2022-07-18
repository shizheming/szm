<template>
  <a-modal
    :visible="props.visible"
    title="title"
    @ok="ok"
    @cancel="cancel"
    :width="1400"
  >
    <a-form
      ref="formRef"
      :model="model"
      :label-col="{ span: 6 }"
      @finish="finish"
    >
      <a-row>
        <a-col>
          <a-form-item label="用户ID" :name="['user_id']">
            <a-input v-model:value="model.user_id" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item :wrapper-col="{ offset: 6 }">
            <a-space style="font-size: 18px" size="large">
              <a-button html-type="submit" type="primary">
                <search-outlined />
              </a-button>
              <clear-outlined @click="clearOutlinedClick" />
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      rowKey="id"
      :row-selection="{
        selectedRowKeys,
        onChange: rowSelectionOnChange,
        getCheckboxProps,
        type: 'radio',
      }"
      :dataSource="dataSource?.list"
      :columns="userListModalColumns"
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
          record: UserFormModelInterface,
        }"
      >
        <template v-if="column.key === 'operation'"> </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from "vue";
import {
  FormInstance,
  ModalProps,
  TableProps,
  FormProps,
  TableColumnType,
} from "ant-design-vue";
import { UserFormModelInterface } from "../interface";
import { epUserSearch_api } from "../api";
import { userListModalColumns } from "../data";
import { usePagination } from "vue-request";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons-vue";
import { TableRowSelection } from "ant-design-vue/es/table/interface";

const props = defineProps<{
  visible: boolean;
  selectedRowKeys: UserFormModelInterface[];
}>();
const emits = defineEmits<{
  (event: "update:visible", visible: boolean): void;
  (
    event: "select",
    selectedRowKeys: any[],
    selectedRowsArray: UserFormModelInterface[]
  ): void;
}>();

const selectedRowKeys = ref<any>([]);
const model = reactive<UserFormModelInterface>({});
const formRef = ref<FormInstance>();
const selectedRowsArray = ref<UserFormModelInterface[]>([]);
const {
  data: dataSource,
  current,
  pageSize,
  run,
  loading,
  total,
} = usePagination(epUserSearch_api, {
  manual: true,
  formatResult: ({ data }) => {
    return data;
  },
  pagination: {
    currentKey: "page",
    pageSizeKey: "page_size",
    totalKey: "total",
  },
});

const finish: FormProps["onFinish"] = async (values) => {
  run({
    page: 1,
    page_size: 10,
    ...model,
  });
};

const pagination = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
  };
});

const rowSelectionOnChange: TableRowSelection["onChange"] = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRowsArray.value = rows;
};

const tableChange: TableProps["onChange"] = async (pag) => {
  run({
    page: pag.current as number,
    page_size: pag.pageSize as number,
    ...model,
  });
};

const getCheckboxProps: TableRowSelection["getCheckboxProps"] = (record) => {
  return {
    disabled: props.selectedRowKeys.includes(record.id),
  };
};

const clearOutlinedClick = () => {
  formRef.value?.resetFields();
};

const ok: ModalProps["onOk"] = async (e) => {
  formRef.value?.resetFields();

  emits("select", selectedRowKeys.value, selectedRowsArray.value);
  emits("update:visible", false);
};
const cancel: ModalProps["onCancel"] = (e) => {
  formRef.value?.resetFields();
  emits("update:visible", false);
};

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue === true) {
      run({
        page: 1,
        page_size: 10,
      });
    }
  }
);
</script>
