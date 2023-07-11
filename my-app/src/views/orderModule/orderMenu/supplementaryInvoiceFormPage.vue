<template>
  <a-form
    ref="formRefObject"
    :model="formModelObject"
    :label-col="{ span: 8 }"
    @finish="finish"
  >
    <a-divider orientation="left">申请信息</a-divider>
    <a-button @click="chooseInvoiceTitleClickFunction" size="small"
      >选择发票抬头</a-button
    >
    <a-row>
      <a-col :span="8">
        <a-form-item label="发票种类" :name="['invoice_type']">
          <a-radio-group
            v-model:value="formModelObject.invoice_type"
            :options="INVOICE_TYPE_OPTIONS"
          >
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="发票内容">商品明细</a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8" v-if="formModelObject.invoice_type === 1">
        <a-form-item label="发票抬头类型" :name="['invoice_kind']">
          <a-radio-group
            v-model:value="formModelObject.invoice_kind"
            :options="INVOICE_HEADER_TYPE_OPTIONS"
          >
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item
          :label="
            formModelObject.invoice_type === 2
              ? '单位名称'
              : INVOICE_HEADER_TYPE_ENMU[formModelObject.invoice_kind] + '名称'
          "
          :name="['invoice_title']"
          :rules="{
            required: true,
          }"
        >
          <a-input v-model:value="formModelObject.invoice_title" />
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
          }"
        >
          <a-input v-model:value="formModelObject.vat_number" />
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
          }"
        >
          <a-input v-model:value="formModelObject.et_bank_name" />
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
          }"
        >
          <a-input v-model:value="formModelObject.et_bank_account" />
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
          }"
        >
          <a-input v-model:value="formModelObject.et_address" />
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
          }"
        >
          <a-input v-model:value="formModelObject.et_phone_num" />
        </a-form-item>
      </a-col>
      <a-col :span="8" v-if="specialInvoiceBoolean || specialInvoiceBoolean">
        <a-form-item
          label="收票人姓名"
          :name="['invoice_username']"
          :rules="{
            required: true,
          }"
        >
          <a-input v-model:value="formModelObject.invoice_username" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="收票人手机"
          :name="['invoice_phone_num']"
          :rules="{
            required: true,
          }"
        >
          <a-input v-model:value="formModelObject.invoice_phone_num" />
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
          }"
        >
          <a-input v-model:value="formModelObject.invoice_email" />
        </a-form-item>
      </a-col>
      <a-col :span="8" v-if="specialInvoiceBoolean || specialInvoiceBoolean">
        <a-form-item
          label="收票地址"
          :name="['mArea']"
          :rules="{
            required: true,
          }"
        >
          <address-cascader v-model:value="formModelObject.mArea" />
        </a-form-item>
      </a-col>
      <a-col :span="8" v-if="specialInvoiceBoolean || specialInvoiceBoolean">
        <a-form-item
          label="收票详细地址"
          :name="['invoice_address']"
          :rules="{
            required: true,
          }"
        >
          <a-input v-model:value="formModelObject.invoice_address" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-divider orientation="left">开票主体信息</a-divider>
    <a-row>
      <a-col :span="8">
        <a-form-item label="名称" :name="['xxx']">
          <a-select
            v-model:value="formModelObject.name"
            :options="nameSelectOptionsArray"
            @change="nameSelectChangeFunction"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="税号">
          {{ formModelObject.sale_tax_num }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="地址">
          {{ formModelObject.sale_address }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="电话">
          {{ formModelObject.sale_phone }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="开户银行">
          {{ formModelObject.sale_bank }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="银行账号">
          {{ formModelObject.sale_account }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-divider orientation="left">订单信息</a-divider>
    <a-space>
      <a-button @click="selectOrderButtonClickFunction">
        <plus-outlined />
      </a-button>
      <delete-outlined @click="deleteOutlinedClickFunction" />
    </a-space>
    <a-form-item :wrapper-col="{ offset: 1, span: 8 }">
      <a-button type="primary" html-type="submit">
        <save-outlined />
      </a-button>
    </a-form-item>
  </a-form>
  <invoice-title-list-modal
    v-model:visible="invoiceTitleListModalVisibleBoolean"
    @select="personTitleListModalSelectFunction"
  />
  <order-list-modal
    v-model:visible="orderListModalVisibleBoolean"
    :invoice-code="formModelObject.name"
    @select="orderListModalSelectFunction"
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
  SelectProps,
} from 'ant-design-vue';
import { InvoiceRepairInvoiceRequestParamsInterface } from './interface';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons-vue';
import AddressCascader from '../../../components/cascader/addressCascader.vue';
import { INVOICE_HEADER_TYPE_ENMU } from '../../../data/dictionary';
import {
  WHETHER_OPTIONS,
  DELIVERY_METHOD_OPTIONS,
  INVOICE_HEADER_TYPE_OPTIONS,
  INVOICE_TYPE_OPTIONS,
  INVOICE_CONTENT_OPTIONS,
} from '../../../data/options';
import {} from './data';
import {
  InvoiceTitleSingleInterface,
  SkuRequestResultInterface,
} from '../../../api/interface';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { partPartial } from '../../../interface';
import { getInvoiceCodeRequestFunction } from './api';
import { DefaultOptionType } from 'ant-design-vue/lib/select';
const goodsListModalVisible = ref(false);
const selectedRowKeys = ref<TableRowSelection['selectedRowKeys']>([]);
const selectedRows = ref<SkuRequestResultInterface[]>([]);
const InvoiceTitleListModal = defineAsyncComponent(
  () => import('../../../components/modal/invoiceTitleListModal.vue')
);
const OrderListModal = defineAsyncComponent(
  () => import('../../../components/modal/orderListModal.vue')
);
const invoiceTitleListModalVisibleBoolean = ref(false);
const orderListModalVisibleBoolean = ref(false);
const nameSelectOptionsArray = ref<SelectProps['options']>([]);
const formModelObject = reactive<InvoiceRepairInvoiceRequestParamsInterface>({
  invoice_type: 1,
  invoice_kind: 1,
  mArea: [],
  name:''
});
// 增值税电子普通-单位
const electronicCommonInvoiceUnitBoolean = computed(
  () => formModelObject.invoice_type === 1 && formModelObject.invoice_kind === 2
);
// 增值税电子普通-个人
const electronicCommonInvoiceIndividualBoolean = computed(
  () => formModelObject.invoice_type === 1 && formModelObject.invoice_kind === 1
);
// 专票
const specialInvoiceBoolean = computed(
  () => formModelObject.invoice_type === 2
);

const chooseInvoiceTitleClickFunction = () => {
  invoiceTitleListModalVisibleBoolean.value = true;
};

const finish: FormInstance['onFinish'] = (values) => {
  goodsListModalVisible.value = true;
};

const personTitleListModalSelectFunction: (
  rowKeys: TableRowSelection['selectedRowKeys'],
  rows: InvoiceTitleSingleInterface[]
) => void = (keys, [row]) => {
  ({
    invoice_kind: formModelObject.invoice_kind,
    invoice_title: formModelObject.invoice_title,
    vat_number: formModelObject.vat_number,
    et_bank_name: formModelObject.et_bank_name,
    et_bank_account: formModelObject.et_bank_account,
    et_address: formModelObject.et_address,
    et_phone_num: formModelObject.et_phone_num,
    invoice_username: formModelObject.invoice_username,
    invoice_phone_num: formModelObject.invoice_phone_num,
    invoice_email: formModelObject.invoice_email,
    invoice_address: formModelObject.invoice_address,
  } = row);
};

const nameSelectChangeFunction: SelectProps['onChange'] = (value, opt) => {
  ({
    sale_tax_num: formModelObject.sale_tax_num,
    sale_address: formModelObject.sale_address,
    sale_phone: formModelObject.sale_phone,
    sale_bank: formModelObject.sale_bank,
    sale_account: formModelObject.sale_account,
  } = opt as DefaultOptionType);
};

const selectOrderButtonClickFunction = () => {
  orderListModalVisibleBoolean.value = true;
};
const deleteOutlinedClickFunction = () => {};

const orderListModalSelectFunction = () => {};

getInvoiceCodeRequestFunction().then(({ data }) => {
  nameSelectOptionsArray.value = data.map((item) => {
    const { sale_company, invoice_company_code } = item;
    return {
      label: sale_company,
      value: invoice_company_code,
      ...item,
    };
  });
  formModelObject.name = data[0].invoice_company_code;
  nameSelectChangeFunction(undefined, data[0]);
});

const formRefObject = ref<FormInstance>();
</script>
