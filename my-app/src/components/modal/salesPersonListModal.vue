<template>
  <a-modal
    :visible="propsObject.visible"
    :ok-button-props="{
      disabled: !tableRowSelectionSelectedRowKeysArray.length,
    }"
    title="选择销售人员"
    @ok="modalOkFunction"
    @cancel="modalCancelFunction"
    :width="1400"
  >
    <a-form
      ref="formRefObject"
      :model="formModelObject"
      :label-col="{ span: 6 }"
      @finish="formFinishFunction"
    >
      <a-row>
        <a-col :span="8">
          <a-form-item label="姓名" :name="['display_name']">
            <a-input v-model:value="formModelObject.display_name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="网点" :name="['node_name']">
            <a-input v-model:value="formModelObject.node_name" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item :wrapper-col="{ offset: 6 }">
            <a-space style="font-size: 18px" size="large">
              <a-button html-type="submit" type="primary" :loading="loading">
                <template #icon><search-outlined /></template>
              </a-button>
              <a-button type="text" @click="clearOutlinedClickFunction">
                <template #icon>
                  <clear-outlined />
                </template>
              </a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      row-key="user_id"
      :row-selection="{
        selectedRowKeys: tableRowSelectionSelectedRowKeysArray,
        onChange: tableRowSelectionOnChangeFunction,
        type: 'radio',
      }"
      :data-source="data?.list"
      :columns="tableColumnsArray"
      :loading="loading"
      :pagination="tablePaginationObject"
      @change="tableChangeFunction"
    >
      <template
        #bodyCell="{
          column,
          record,
        }: {
          column: TableColumnType,
          record: UserSingleInterface,
        }"
      >
        <template v-if="column.key === 'operation'"> </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue';
import {
  FormInstance,
  ModalProps,
  TableProps,
  FormProps,
  TableColumnType,
} from 'ant-design-vue';
import {
  UserSingleInterface,
  SalesPersonRequestParamsType,
} from '../../api/interface';
import { subAccountRequestFunction } from '../../api/list';
import { usePagination } from 'vue-request';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { PageInterface } from '../../interface';
import { TableColumn, TableColumnsType } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
const tableColumnsArray: TableColumnsType = [
  {
    title: '姓名',
    dataIndex: 'display_name',
    key: 'display_name',
  },
  {
    title: '账号',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '网点',
    dataIndex: 'node_name',
    key: 'node_name',
  },
];

const propsObject = defineProps<{
  visible: boolean;
  shopId: number;
}>();
const emitsFunction = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (
    event: 'select',
    selectedRowKeysArray: TableRowSelection['selectedRowKeys'],
    selectedRowsArray: UserSingleInterface[]
  ): void;
}>();

const tableRowSelectionSelectedRowKeysArray = ref<
  TableRowSelection['selectedRowKeys']
>([]);
const formRefObject = ref<FormInstance>();
let selectedRowsArray: UserSingleInterface[] = [];
const { data, current, pageSize, run, loading, total } = usePagination(
  subAccountRequestFunction,
  {
    manual: true,
    formatResult: ({ data }) => {
      return data;
    },
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'page_size',
      totalKey: 'total',
    },
  }
);

const formModelObject = reactive<SalesPersonRequestParamsType>({
  status: 1,
  shop_id: propsObject.shopId,
  page: current.value,
  page_size: pageSize.value,
});

const tablePaginationObject = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
    showQuickJumper: true,
  };
});

let confirmTableRowSelectionSelectedRowKeysArray: TableRowSelection['selectedRowKeys'] =
  [];
let confirmSelectedRowsArray: UserSingleInterface[] = [];

const formFinishFunction = async () => {
  run(formModelObject);
};

const tableRowSelectionOnChangeFunction: TableRowSelection['onChange'] = (
  keys,
  rows
) => {
  tableRowSelectionSelectedRowKeysArray.value = keys;
  selectedRowsArray = rows;
};

const tableChangeFunction: TableProps['onChange'] = async (pag) => {
  run({
    ...formModelObject,
    page: pag.current!,
    page_size: pag.pageSize!,
  });
};

const clearOutlinedClickFunction = () => {
  formRefObject.value?.resetFields();
};

const modalOkFunction = async () => {
  formRefObject.value?.resetFields();
  confirmTableRowSelectionSelectedRowKeysArray = cloneDeep(
    tableRowSelectionSelectedRowKeysArray.value
  );
  confirmSelectedRowsArray = cloneDeep(selectedRowsArray);
  emitsFunction(
    'select',
    confirmTableRowSelectionSelectedRowKeysArray,
    confirmSelectedRowsArray
  );
  modalCancelFunction();
};
const modalCancelFunction = () => {
  formRefObject.value?.resetFields();
  tableRowSelectionSelectedRowKeysArray.value = [];
  selectedRowsArray = [];
  emitsFunction('update:visible', false);
};

watch(
  () => propsObject.visible,
  async (newValue) => {
    if (newValue === true) {
      tableRowSelectionSelectedRowKeysArray.value =
        confirmTableRowSelectionSelectedRowKeysArray;
      selectedRowsArray = confirmSelectedRowsArray;
      run(formModelObject);
    }
  }
);
</script>
