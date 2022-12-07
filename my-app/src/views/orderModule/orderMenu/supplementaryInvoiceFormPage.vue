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
        <a-form-item
          label="增值税发票类型"
          :name="['invoice_type']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-radio-group
            v-model:value="model.invoice_type"
            :options="VAT_INVOICE_TYPE_OPTIONS"
          >
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="发票抬头类型"
          :name="['invoice_kind']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-radio-group
            v-model:value="model.invoice_kind"
            :watch="[() => model.invoice_form, invoiceKindRadioGroupWatch]"
            :options="INVOICE_HEADER_TYPE_OPTIONS"
          >
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item
          label="发票内容"
          :name="['content_type']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-radio-group v-model:value="model.order_invoice.content_type">
            <a-radio :value="0">商品明细</a-radio>
            <a-radio :value="1">商品类别</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="开票备注" :name="['invoice_notice']">
          <a-textarea v-model:value="model.order_invoice.invoice_notice" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="发票抬头"
          :name="['invoice_title']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.order_invoice.invoice_title" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="
          commonElectronEnterpriseBoolean ||
          commonPaperEnterpriseBoolean ||
          specialPaperEnterpriseBoolean
        "
      >
        <a-form-item
          label="税号"
          :name="['vat_number']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.order_invoice.vat_number" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="
          commonElectronEnterpriseBoolean ||
          commonPaperEnterpriseBoolean ||
          specialPaperEnterpriseBoolean
        "
      >
        <a-form-item
          label="注册地址"
          :name="['et_address']"
          :rules="{
            required: specialPaperEnterpriseBoolean,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.order_invoice.et_address" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="
          commonElectronEnterpriseBoolean ||
          commonPaperEnterpriseBoolean ||
          specialPaperEnterpriseBoolean
        "
      >
        <a-form-item
          label="注册电话"
          :name="['et_phone_num']"
          :rules="{
            required: specialPaperEnterpriseBoolean,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.order_invoice.et_phone_num" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="
          commonElectronEnterpriseBoolean ||
          commonPaperEnterpriseBoolean ||
          specialPaperEnterpriseBoolean
        "
      >
        <a-form-item
          label="开户银行"
          :name="['et_bank_name']"
          :rules="{
            required: specialPaperEnterpriseBoolean,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.order_invoice.et_bank_name" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="
          commonElectronEnterpriseBoolean ||
          commonPaperEnterpriseBoolean ||
          specialPaperEnterpriseBoolean
        "
      >
        <a-form-item
          label="银行账号"
          :name="['et_bank_account']"
          :rules="{
            required: specialPaperEnterpriseBoolean,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.order_invoice.et_bank_account" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="
          commonPaperPersonalBoolean ||
          commonPaperEnterpriseBoolean ||
          specialPaperEnterpriseBoolean
        "
      >
        <a-form-item
          label="收票人姓名"
          :name="['invoice_username']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.order_invoice.invoice_username" />
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
          <a-input v-model:value="model.order_invoice.invoice_phone_num" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="commonElectronPersonalBoolean || commonElectronEnterpriseBoolean"
      >
        <a-form-item
          label="收票人邮箱"
          :name="['invoice_email']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.order_invoice.invoice_email" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="
          commonPaperPersonalBoolean ||
          commonPaperEnterpriseBoolean ||
          specialPaperEnterpriseBoolean
        "
      >
        <a-form-item
          label="收票人地址"
          :name="['mArea']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <address-cascader v-model:value="model.order_invoice.mArea" />
        </a-form-item>
      </a-col>
      <a-col
        :span="8"
        v-if="
          commonPaperPersonalBoolean ||
          commonPaperEnterpriseBoolean ||
          specialPaperEnterpriseBoolean
        "
      >
        <a-form-item
          label="收票详细地址"
          :name="['invoice_address']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.order_invoice.invoice_address" />
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
  Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface,
} from './interface';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue';
import AddressCascader from '../../../components/cascader/address.vue';
import {
  WHETHER_OPTIONS,
  DELIVERY_METHOD_OPTIONS,
  GOODS_FORM_ENUM,
  INVOICE_HEADER_TYPE_OPTIONS,
  VAT_INVOICE_TYPE_OPTIONS,
} from '../../../data/dictionary';
import {
  orderFormPageGoodsTableColumns,
  goodsListModalLadderPriceTableColumns,
} from './data';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import BackgroundCategoryCascader from '../../../components/cascader/backgroundCategory.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { cloneDeep, forEach, multiply, subtract } from 'lodash';
import {
  api_upload_getUrl,
  api_proxy_order_Order_BackEnd_confirm,
} from './api';
import { SelectProps } from 'ant-design-vue/lib/vc-select';
import { Api_goods_category_result_item_interface } from '../../../api/interface';
const UserListModal = defineAsyncComponent(
  () => import('./components/userListModal.vue')
);
const GoodsListModal = defineAsyncComponent(
  () => import('./components/goodsListModal.vue')
);
const userListModalVisible = ref(false);
const goodsListModalVisible = ref(false);
const selectedRowKeys = ref<TableRowSelection['selectedRowKeys']>([]);
const selectedRows = ref<Api_goods_sku_list_result_item_interface[]>([]);
const model =
  reactive<Api_proxy_order_Manage_Invoice_repairInvoice_params_interface>({});

const commonElectronEnterpriseBoolean = ref(false);
const commonPaperEnterpriseBoolean = ref(false);
const specialPaperEnterpriseBoolean = ref(false);
const commonPaperPersonalBoolean = ref(false);
const commonElectronPersonalBoolean = ref(false);
const manRadioDisabled = ref(false);

const finish: FormInstance['onFinish'] = (values) => {
  goodsListModalVisible.value = true;
};
const invoiceKindRadioGroupWatch = (newValue: number) => {
  if (newValue == 1 || newValue == 3) {
    manRadioDisabled.value = false;
  } else {
    manRadioDisabled.value = true;
    model.order_invoice!.invoice_kind = 2;
  }
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
  [
    () => model.order_invoice!.invoice_kind,
    () => model.order_invoice!.invoice_form,
  ],
  ([invoice_kind, invoice_form]) => {
    commonPaperPersonalBoolean.value = false;
    commonPaperEnterpriseBoolean.value = false;
    commonElectronPersonalBoolean.value = false;
    commonElectronEnterpriseBoolean.value = false;
    specialPaperEnterpriseBoolean.value = false;
    if (invoice_kind == 1 && invoice_form == 1) {
      commonPaperPersonalBoolean.value = true;
    } else if (invoice_kind == 2 && invoice_form == 1) {
      commonPaperEnterpriseBoolean.value = true;
    } else if (invoice_kind == 1 && invoice_form == 3) {
      commonElectronPersonalBoolean.value = true;
    } else if (invoice_kind == 2 && invoice_form == 3) {
      commonElectronEnterpriseBoolean.value = true;
    } else if (invoice_kind == 2 && invoice_form == 2) {
      // 专票纸质
      specialPaperEnterpriseBoolean.value = true;
    }
  }
);
</script>
