<template>
  <a-modal
    :visible="propsObject.visible"
    :ok-button-props="{
      disabled: !tableRowSelectionSelectedRowKeysArray.length,
    }"
    title="选择订单"
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
          <a-form-item label="订单编号" :name="['osl_seq']">
            <a-input v-model:value="formModelObject.osl_seq" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="用户ID" :name="['user_id']">
            <a-input v-model:value="formModelObject.user_id" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="店铺名称" :name="['shop_name']">
            <a-input v-model:value="formModelObject.shop_name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="支付状态" :name="['pay_status']">
            <a-select v-model:value="formModelObject.pay_status" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="下单" :name="['orderTime']">
            <a-range-picker
            v-model:value="formModelObject.orderTime"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
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
      row-key="user_id"
      :row-selection="{
        selectedRowKeys: tableRowSelectionSelectedRowKeysArray,
        onChange: tableRowSelectionOnChangeFunction,
        type: 'radio',
      }"
      :data-source="data"
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
          record: orderSingleInterface,
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
import { orderSingleInterface, OrderRequestParamsInterface } from '../../api/interface';
import { orderRequestFunction } from '../../api/list';
import { usePagination } from 'vue-request';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { PageInterface } from '../../interface';
import { TableColumn, TableColumnsType } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
const tableColumnsArray: TableColumnsType = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: '微信昵称',
    dataIndex: 'wx_nickname',
    key: 'wx_nickname',
  },
  {
    title: '买家姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '用户等级',
    dataIndex: 'user_level_name',
    key: 'user_level_name',
  },
  {
    title: '企业名称',
    dataIndex: 'company_name',
    key: 'company_name',
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
    selectedRowsArray: orderSingleInterface[]
  ): void;
}>();

const tableRowSelectionSelectedRowKeysArray = ref<
  TableRowSelection['selectedRowKeys']
>([]);
const formRefObject = ref<FormInstance>();
let selectedRowsArray: orderSingleInterface[] = [];
const { data, current, pageSize, run, loading, total } = usePagination(
  orderRequestFunction,
  {
    manual: true,
    formatResult: ({ data }) => {
      return data.list;
    },
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'page_size',
      totalKey: 'total',
    },
  }
);
const formModelObject = reactive<OrderRequestParamsInterface>({
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
let confirmSelectedRowsArray: orderSingleInterface[] = [];

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
