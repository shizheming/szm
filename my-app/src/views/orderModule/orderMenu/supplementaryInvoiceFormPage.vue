<template>
  <a-form
    ref="formRef"
    :model="model"
    :label-col="{ span: 8 }"
    @finish="finish"
  >
    <a-row>
      <a-col :span="8">
        <a-form-item label="申请信息" :colon="false" style="font-weight: 700" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="增值税发票类型" :name="['invoice_type']">
          <a-radio-group
            v-model:value="model.invoice_type"
            :options="VAT_INVOICE_TYPE_OPTIONS"
          >
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="8" v-if="model.invoice_type === 3">
        <a-form-item label="发票抬头类型" :name="['invoice_kind']">
          <a-radio-group
            v-model:value="model.invoice_kind"
            :options="INVOICE_HEADER_TYPE_OPTIONS"
          >
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="发票内容" :name="['invoiceContent']">
          <a-radio-group
            v-model:value="model.invoiceContent"
            :options="INVOICE_CONTENT_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :label="invoiceTitleFormItemLabel"
          :name="['invoice_title']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.invoice_title" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="electronicCommonInvoiceUnitBoolean || specialInvoiceBoolean"
      >
        <a-form-item
          label="纳税人识别号"
          :name="['vat_number']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.vat_number" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="electronicCommonInvoiceUnitBoolean || specialInvoiceBoolean"
      >
        <a-form-item
          label="开户银行"
          :name="['et_bank_name']"
          :rules="{
            required: specialInvoiceBoolean,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.et_bank_name" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="electronicCommonInvoiceUnitBoolean || specialInvoiceBoolean"
      >
        <a-form-item
          label="银行账号"
          :name="['et_bank_account']"
          :rules="{
            required: specialInvoiceBoolean,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.et_bank_account" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="electronicCommonInvoiceUnitBoolean || specialInvoiceBoolean"
      >
        <a-form-item
          label="注册地址"
          :name="['et_address']"
          :rules="{
            required: specialInvoiceBoolean,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.et_address" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="electronicCommonInvoiceUnitBoolean || specialInvoiceBoolean"
      >
        <a-form-item
          label="注册电话"
          :name="['et_phone_num']"
          :rules="{
            required: specialInvoiceBoolean,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.et_phone_num" />
        </a-form-item>
      </a-col>
      <a-col :span="8" v-if="specialInvoiceBoolean">
        <a-form-item
          label="收票人姓名"
          :name="['invoice_username']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.invoice_username" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="收票人手机"
          :name="['invoice_phone_num']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.invoice_phone_num" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="
          electronicCommonInvoiceIndividualBoolean ||
          electronicCommonInvoiceUnitBoolean
        "
      >
        <a-form-item
          label="收票人邮箱"
          :name="['invoice_email']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.invoice_email" />
        </a-form-item>
      </a-col>
      <a-col :span="8" v-if="specialInvoiceBoolean">
        <a-form-item
          label="收票地址"
          :name="['mArea']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <address-cascader v-model:value="model.mArea" />
        </a-form-item>
      </a-col>
      <a-col :span="8" v-if="specialInvoiceBoolean">
        <a-form-item
          label="收票详细地址"
          :name="['invoice_address']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.invoice_address" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item
          label="开票主体信息"
          :colon="false"
          style="font-weight: 700"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="支付类型" :name="['pay_mode']">
          <a-select
            :options="[
              {
                label: '货到付款',
                value: 0,
              },
            ]"
            :is-detail="true"
            v-model:value="model.pay_mode"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="订单信息" :colon="false" style="font-weight: 700" />
      </a-col>
    </a-row>
    <h1 style="font-weight: 700"></h1>
    <a-space>
      <a-button html-type="submit">
        <plus-outlined />
      </a-button>
      <delete-outlined @click="goodsDeleteOutlinedClick" />
    </a-space>
    <a-table
      :row-key="tableRowKey"
      :columns="orderFormPageGoodsTableColumns"
      :data-source="model.dataSource"
      :pagination="false"
      :scroll="{ x: 3000 }"
      style="margin: 15px 0"
      :row-selection="{
        selectedRowKeys,
        onChange: tableChange,
      }"
    >
      <template
        #bodyCell="{
          column,
          record,
          index,
        }: {
          column: TableColumnType,
          record: Api_goods_sku_list_result_item_interface,
          index: number,
        }"
      >
      </template>
    </a-table>
    <a-form-item :wrapper-col="{ offset: 1, span: 8 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
  <goods-list-modal
    v-model:visible="goodsListModalVisible"
    :model="model"
    @select="goodsListModalSelect"
  />
</template>
<script setup lang="ts">
import {
  reactive,
  defineAsyncComponent,
  ref,
  watch,
  watchEffect,
  computed,
  createVNode,
} from 'vue';
import {
  FormInstance,
  InputProps,
  TableProps,
  TableColumnType,
  Modal,
} from 'ant-design-vue';
import {
  Api_proxy_order_Manage_Invoice_repairInvoice_params_interface,
  Api_goods_sku_list_result_item_interface,
} from './interface';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue';
import AddressCascader from '../../../components/cascader/addressCascader.vue';
import {
  WHETHER_OPTIONS,
  DELIVERY_METHOD_OPTIONS,
  GOODS_FORM_ENUM,
  INVOICE_HEADER_TYPE_OPTIONS,
  VAT_INVOICE_TYPE_OPTIONS,
  INVOICE_CONTENT_OPTIONS,
} from '../../../data/dictionary';
import {
  orderFormPageGoodsTableColumns,
  goodsListModalLadderPriceTableColumns,
} from './data';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import BackgroundCategoryCascader from '../../../components/cascader/backgroundCategoryCascader.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { cloneDeep, forEach, multiply, subtract } from 'lodash';
import { api_upload_getUrl, confirmRequestFunction } from './api';
import { SelectProps } from 'ant-design-vue/lib/vc-select';
const UserListModal = defineAsyncComponent(
  () => import('../../../components/modal/userListModal.vue')
);
const GoodsListModal = defineAsyncComponent(
  () => import('../../../components/modal/goodsListModal.vue')
);
const userListModalVisible = ref(false);
const goodsListModalVisible = ref(false);
const selectedRowKeys = ref<TableRowSelection['selectedRowKeys']>([]);
const selectedRows = ref<Api_goods_sku_list_result_item_interface[]>([]);
const model =
  reactive<Api_proxy_order_Manage_Invoice_repairInvoice_params_interface>({
    invoice_type: 3,
    invoice_kind: 1,
    invoiceContent: 1,
    et_address: '',
    et_phone_num: '',
    et_bank_name: '',
    et_bank_account: '',
    invoice_username: '',
    invoice_phone_num: '',
    invoice_email: '',
    invoice_address: '',
    invoice_title: '',
    vat_number: '',
    mArea: [],
  });
// 电子普通单位
const electronicCommonInvoiceUnitBoolean = ref(false);
// 电子普通个人
const electronicCommonInvoiceIndividualBoolean = ref(false);
// 专票
const specialInvoiceBoolean = ref(false);

const finish: FormInstance['onFinish'] = (values) => {
  goodsListModalVisible.value = true;
};

const tableChange: TableRowSelection['onChange'] = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRows.value = rows;
};

const formRef = ref<FormInstance>();

const goodsDeleteOutlinedClick = () => {
  if (selectedRowKeys.value.length) {
    model.dataSource = model.dataSource.filter(({ sku_id, spu_id }) => {
      return !selectedRowKeys.value.includes(`${spu_id}/${sku_id}`);
    });
    selectedRowKeys.value = [];
  }
};
const goodsItemDeleteOutlinedClick = (index: number) => {
  model.dataSource.splice(index, 1);
};

const goodsListModalSelect = async (
  rows: Api_goods_sku_list_result_item_interface[]
) => {
  model.dataSource = model.dataSource.concat(rows);
};

const invoiceTitleFormItemLabel = computed(() => {
  return specialInvoiceBoolean.value || electronicCommonInvoiceUnitBoolean.value
    ? '单位名称'
    : '个人名称';
});

// 这个watch概念上就是table的chang事件
watch(
  () => model.dataSource,
  async (newValue) => {
    if (newValue.length !== 0) {
      newValue.forEach((item, index) => {
        item.number = index + 1;
      });
    }
  }
);

const tableRowKey = ({
  sku_id,
  spu_id,
}: Api_goods_sku_list_result_item_interface) => {
  return `${spu_id}/${sku_id}`;
};

// 这里的watch也是change，而且是2个实体的chagne
watch(
  [() => model.invoice_type, () => model.invoice_kind],
  ([invoice_type, invoice_kind]) => {
    electronicCommonInvoiceUnitBoolean.value = false;
    electronicCommonInvoiceIndividualBoolean.value = false;
    specialInvoiceBoolean.value = false;
    if (invoice_type === 3 && invoice_kind == 1) {
      electronicCommonInvoiceIndividualBoolean.value = true;
    } else if (invoice_type === 3 && invoice_kind == 2) {
      electronicCommonInvoiceUnitBoolean.value = true;
    } else if (invoice_type === 2) {
      specialInvoiceBoolean.value = true;
    }
  }
);
</script>
