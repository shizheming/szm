<template>
  <a-modal
    :visible="propsObject.visible"
    :ok-button-props="{
      disabled: !tableRowSelectionSelectedRowKeysArray.length,
    }"
    title="选择订单"
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
                <template #icon><search-outlined /></template>
              </a-button>
              <clear-outlined @click="clearOutlinedClickFunction" />
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      row-key="ono"
      :row-selection="{
        selectedRowKeys: tableRowSelectionSelectedRowKeysArray,
        onChange: tableRowSelectionOnChangeFunction,
        getCheckboxProps: tableRowSelectionGetCheckboxPropsFunction,
        preserveSelectedRowKeys: true,
      }"
      :data-source="data?.list"
      :columns="tableColumnsArray"
      :loading="loading"
      :pagination="tablePaginationObject"
      :scroll="{ x: 'max-content' }"
      :expandedRowKeys="tableDefaultExpandedRowKeysArray"
      @change="tableChangeFunction"
    >
      <template
        #expandedRowRender="{
          column,
          record,
        }: {
          column: TableColumnType,
          record: OrderSingleInterface,
        }"
      >
        <a-table
          :columns="tableColumnsInnerArray"
          :data-source="record.sub_list"
          :pagination="false"
        >
        </a-table>
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
  OrderSingleInterface,
  OrderRequestParamsInterface,
  OrderRowSingleInterface,
} from '../../api/interface';
import { orderRequestFunction } from '../../api/list';
import { usePagination } from 'vue-request';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { PageInterface } from '../../interface';
import { TableColumn, TableColumnsType } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
const tableColumnsInnerArray: TableColumnsType = [
  {
    title: '支付状态',
    dataIndex: 'pay_status_name',
    key: 'pay_status_name',
  },
  {
    title: '发货状态',
    dataIndex: 'sub_status_name',
    key: 'sub_status_name',
  },
  {
    title: '商品实付金额',
    dataIndex: 'money_sub_total_pay',
    key: 'money_sub_total_pay',
  },
  {
    title: '销售店铺',
    dataIndex: 'shop_name',
    key: 'shop_name',
  },
  {
    title: '销售组织',
    dataIndex: 'sub_org_name',
    key: 'sub_org_name',
  },
  {
    title: '剩余可申请开票金额',
    dataIndex: 'money_allow_invoice_amount',
    key: 'money_allow_invoice_amount',
  },
  {
    title: '订单创建时间',
    dataIndex: 'create_datetime',
    key: 'create_datetime',
  },
  {
    title: '录入方式',
    dataIndex: 'create_mode_name',
    key: 'create_mode_name',
  },
  {
    title: '订单编号',
    dataIndex: 'osl_seq',
    key: 'osl_seq',
  },
];
const tableColumnsArray: TableColumnsType = [
  {
    title: '主订单号',
    dataIndex: 'ono',
    key: 'ono',
    customCell: ({ rowSpan }) => {
      return {
        rowSpan,
      };
    },
  },
];

const propsObject = defineProps<{
  visible: boolean;
  invoiceCode: string;
}>();
const emitsFunction = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (
    event: 'select',
    selectedRowKeysArray: TableRowSelection['selectedRowKeys'],
    selectedRowsArray: OrderSingleInterface[]
  ): void;
}>();

const tableRowSelectionSelectedRowKeysArray = ref<
  TableRowSelection['selectedRowKeys']
>([]);
const formRefObject = ref<FormInstance>();
let selectedRowsArray: OrderSingleInterface[] = [];
const tableDefaultExpandedRowKeysArray = ref<string[]>([]);
const { data, current, pageSize, run, loading, total } = usePagination(
  orderRequestFunction,
  {
    manual: true,
    formatResult: ({ data }) => {
      tableDefaultExpandedRowKeysArray.value = data.list.map(({ ono }) => ono);
      return data;
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
  source_type: 11,
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
let confirmSelectedRowsArray: OrderSingleInterface[] = [];

const formFinishFunction = async () => {
  run(formModelObject);
};

const tableRowSelectionOnChangeFunction: TableRowSelection['onChange'] = (
  keys,
  rows
) => {
  tableRowSelectionSelectedRowKeysArray.value = keys;
  // 这里就不能这样接了，因为展示的时候是子弹维度，keys用的是主单，主单要合并单元格，所以勾选的时候数据，返回的只是一条主单的子弹，也就是说如果一个主单下面有多个子弹，选中的时候，数据只有一条子弹，所以我要自己手动过滤出子弹
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

const tableRowSelectionGetCheckboxPropsFunction: TableRowSelection['getCheckboxProps'] =
  (record: OrderRowSingleInterface) => {
    return {
      disabled: confirmTableRowSelectionSelectedRowKeysArray.includes(
        record.ono
      ),
    };
  };

const modalOkFunction = async () => {
  formRefObject.value?.resetFields();
  confirmTableRowSelectionSelectedRowKeysArray = cloneDeep(
    tableRowSelectionSelectedRowKeysArray.value
  );

  confirmSelectedRowsArray = cloneDeep(selectedRowsArray);
  console.log(confirmSelectedRowsArray, 2222);

  emitsFunction(
    'select',
    confirmTableRowSelectionSelectedRowKeysArray,
    confirmSelectedRowsArray
  );
  modalCancelFunction();
};
const modalCancelFunction = () => {
  // formRefObject.value?.resetFields();
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
      formModelObject.invoice_code = propsObject.invoiceCode;
      console.log(formModelObject,23);
      
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
