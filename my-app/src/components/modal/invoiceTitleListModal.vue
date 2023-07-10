<template>
  <a-modal
    :visible="propsObject.visible"
    :ok-button-props="{
      disabled: !tableRowSelectionSelectedRowKeysArray.length,
    }"
    title="添加抬头"
    @ok="modalOkFunction"
    @cancel="modalCancelFunction"
    width="100%"
    wrap-class-name="full-modal"
  >
    <a-form
      ref="formRefObject"
      :model="formModelObject"
      :label-col="{ span: 6 }"
      @finish="formFinishFunction"
    >
      <a-row>
        <a-col :span="8">
          <a-form-item label="发票抬头" :name="['invoice_kind']">
            <a-input v-model:value="formModelObject.invoice_kind" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="税号" :name="['vat_number']">
            <a-input v-model:value="formModelObject.vat_number" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="收票人手机" :name="['invoice_phone_num']">
            <a-input v-model:value="formModelObject.invoice_phone_num" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item :wrapper-col="{ offset: 6 }">
            <a-space style="font-size: 18px" size="large">
              <a-button html-type="submit" type="primary" :loading="loading">
                <search-outlined />
              </a-button>
              <clear-outlined @click="clearOutlinedClickFunction" />
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
      :scroll="{ x: 'max-content' }"
      @change="tableChangeFunction"
    >
      <template
        #bodyCell="{
          column,
          record,
        }: {
          column: TableColumnType,
          record: InvoiceTitleSingleInterface,
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
  InvoiceTitleSingleInterface,
  InvoiceTitleParamsInterface,
} from '../../api/interface';
import { invoiceTitleRequestFunction } from '../../api/list';
import { usePagination } from 'vue-request';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { PageInterface } from '../../interface';
import { TableColumn, TableColumnsType } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
import { INVOICE_HEADER_TYPE_ENMU } from '../../data/dictionary';
const tableColumnsArray: TableColumnsType = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    width: 100,
  },
  {
    title: '发票抬头',
    dataIndex: 'invoice_kind_name',
    key: 'invoice_kind_name',
    width: 100,
  },
  {
    title: '税号',
    dataIndex: 'vat_number',
    key: 'vat_number',
  },
  {
    title: '注册地址',
    dataIndex: 'et_address',
    key: 'et_address',
  },
  {
    title: '注册电话',
    dataIndex: 'et_phone_num',
    key: 'et_phone_num',
  },
  {
    title: '开户银行',
    dataIndex: 'et_bank_name',
    key: 'et_bank_name',
  },
  {
    title: '银行账号',
    dataIndex: 'et_bank_account',
    key: 'et_bank_account',
  },
  {
    title: '收票人',
    dataIndex: 'invoice_username',
    key: 'invoice_username',
  },
  {
    title: '收票人手机',
    dataIndex: 'invoice_phone_num',
    key: 'invoice_phone_num',
  },
  {
    title: '收票人邮箱',
    dataIndex: 'invoice_email',
    key: 'invoice_email',
  },
  {
    title: '收票地址',
    dataIndex: 'invoiceArea',
    key: 'invoiceArea',
  },
  {
    title: '详细地址',
    dataIndex: 'invoice_address',
    key: 'invoice_address',
  },
];

const propsObject = defineProps<{
  visible: boolean;
}>();
const emitsFunction = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (
    event: 'select',
    selectedRowKeysArray: TableRowSelection['selectedRowKeys'],
    selectedRowsArray: InvoiceTitleSingleInterface[]
  ): void;
}>();

const tableRowSelectionSelectedRowKeysArray = ref<
  TableRowSelection['selectedRowKeys']
>([]);
const formRefObject = ref<FormInstance>();
let selectedRowsArray: InvoiceTitleSingleInterface[] = [];
const { data, current, pageSize, run, loading, total } = usePagination(
  invoiceTitleRequestFunction,
  {
    manual: true,
    formatResult: ({ data }) => {
      data.list.forEach((item, index) => {
        item.number = index + 1;
        item.invoice_kind_name = INVOICE_HEADER_TYPE_ENMU[item.invoice_kind];
        return item;
      });
      return data;
    },
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'page_size',
      totalKey: 'total',
    },
  }
);
const formModelObject = reactive<InvoiceTitleParamsInterface>({
  page: current.value,
  page_size: pageSize.value,
});

const tablePaginationObject = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
  };
});

let confirmTableRowSelectionSelectedRowKeysArray: TableRowSelection['selectedRowKeys'] =
  [];
let confirmSelectedRowsArray: InvoiceTitleSingleInterface[] = [];

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
<style>
.full-modal .ant-modal {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
}
.full-modal .ant-modal-content {
  display: flex;
  flex-direction: column;
}
.full-modal .ant-modal-body {
  flex: 1;
}
</style>
