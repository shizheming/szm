<template>
  <a-form
    ref="formRefObject"
    :model="formModelObject"
    :label-col="{ span: 8 }"
    @finish="finish"
  >
    <a-divider orientation="left">申请信息</a-divider>
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
    <a-divider orientation="left">订单信息</a-divider>
    <a-form-item :wrapper-col="{ offset: 1, span: 8 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
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
import { Api_proxy_order_Manage_Invoice_repairInvoice_params_interface } from './interface';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
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
import { SkuRequestResultInterface } from '../../../api/interface';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
const goodsListModalVisible = ref(false);
const selectedRowKeys = ref<TableRowSelection['selectedRowKeys']>([]);
const selectedRows = ref<SkuRequestResultInterface[]>([]);
const formModelObject =
  reactive<Api_proxy_order_Manage_Invoice_repairInvoice_params_interface>({
    invoice_type: 1,
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

const finish: FormInstance['onFinish'] = (values) => {
  goodsListModalVisible.value = true;
};

const formRefObject = ref<FormInstance>();

</script>
