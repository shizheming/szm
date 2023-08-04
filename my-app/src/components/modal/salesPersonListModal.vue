<template>
  <a-modal
    :visible="propsObject.visible"
    :ok-button-props="{
      disabled: !tableRowSelectionSelectedRowKeysArray.length,
    }"
    title="设置销售人员"
    @ok="modalOkFunction"
    @cancel="modalCancelFunction"
    :confirm-loading="modalConfirmLoadingBoolean"
    :width="700"
  >
    <a-form
      ref="formRefObject"
      :model="formModelObject"
      :label-col="{ span: 6 }"
      @finish="formFinishFunction"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item label="姓名" :name="['display_name']">
            <a-input v-model:value="formModelObject.display_name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="网点" :name="['node_name']">
            <node-select v-model:value="formModelObject.node_id" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item :wrapper-col="{ offset: 6 }">
            <a-space style="font-size: 18px" size="large">
              <a-button html-type="submit" type="primary" :loading="loading">
                <template #icon>
                  <search-outlined />
                </template>
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
      row-key="id"
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
          record: SalesPersonSingleInterface,
        }"
      >
        <template v-if="column.key === 'operation'"> </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed, defineAsyncComponent } from 'vue';
import {
  FormInstance,
  ModalProps,
  TableProps,
  FormProps,
  TableColumnType,
  message,
} from 'ant-design-vue';
import {
  SalesPersonSingleInterface,
  SalesPersonRequestParamsType,
} from '../../api/listInterface';
import { subAccountRequestFunction } from '../../api/list';
import { salesManRequestFunction } from '../../api/form';
import { usePagination } from 'vue-request';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { PageInterface } from '../../interface';
import { TableColumn, TableColumnsType } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
const NodeSelect = defineAsyncComponent(
  () => import('../select/nodeSelect.vue')
);
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
  oslSeq: string;
}>();
const emitsFunction = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'select'): void;
}>();
const modalConfirmLoadingBoolean = ref(false);
const tableRowSelectionSelectedRowKeysArray = ref<
  TableRowSelection['selectedRowKeys']
>([]);
const formRefObject = ref<FormInstance>();
let selectedRowsArray: SalesPersonSingleInterface[] = [];
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
let confirmSelectedRowsArray: SalesPersonSingleInterface[] = [];

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
  await formRefObject.value?.resetFields();
  modalConfirmLoadingBoolean.value = true;
  const [{ node_id, id, user_id = 0 }] = selectedRowsArray;
  await salesManRequestFunction({
    osl_seq: propsObject.oslSeq,
    salesman_node_id: node_id,
    shop_account_id: id,
    shop_user_id: Number(user_id),
  }).catch(() => {
    modalConfirmLoadingBoolean.value = false;
    return Promise.reject();
  });
  confirmTableRowSelectionSelectedRowKeysArray = cloneDeep(
    tableRowSelectionSelectedRowKeysArray.value
  );
  confirmSelectedRowsArray = cloneDeep(selectedRowsArray);
  tableRowSelectionSelectedRowKeysArray.value = [];
  selectedRowsArray = [];
  modalConfirmLoadingBoolean.value = false;
  message.success('成功');
  emitsFunction('select');
  modalCancelFunction();
};
const modalCancelFunction = async () => {
  await formRefObject.value?.resetFields();
  emitsFunction('update:visible', false);
};
const wantchShopIDFunction = watch(
  () => propsObject.shopId,
  (newValue) => {
    formModelObject.shop_id = newValue;
    wantchShopIDFunction();
  }
);
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
