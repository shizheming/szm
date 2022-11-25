<template>
  <a-form
    ref="formRef"
    :model="model"
    :label-col="{ span: 8 }"
    @finish="finish"
    @finishFailed="finish"
  >
    <h1 style="font-weight: 700">基本信息</h1>
    <a-row>
      <a-col :span="8">
        <a-form-item label="录入方式" :name="['entryMode']">
          <a-input v-model:value="model.entryMode" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="销售渠道" :name="['sale_mode']">
          <a-input v-model:value="model.sale_mode" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="外部订单号" :name="['out_ono']">
          <a-input v-model:value="model.out_ono" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="站点/业务类型" :name="['businessType']">
          <a-input v-model:value="model.businessType" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="用户ID"
          :name="['user_id']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-input-search
            :disabled="true"
            :is-detail="true"
            v-model:value="model.user_id"
            @search="inputSearchSearch"
          >
            <template #enterButton>
              <a-button type="text"><plus-outlined /></a-button>
            </template>
          </a-input-search>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="关联手机号" :name="['phone']">
          <a-input v-model:value="model.phone" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="微信昵称" :name="['wx_nickname']">
          <a-input v-model:value="model.wx_nickname" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="用户等级" :name="['user_level_name']">
          <a-input v-model:value="model.user_level_name" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="用户名" :name="['username']">
          <a-input v-model:value="model.username" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="买家姓名" :name="['name']">
          <a-input v-model:value="model.name" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="企业名称" :name="['company_name']">
          <a-input v-model:value="model.company_name" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="收货人姓名"
          :name="['addressInfo', 'name']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.addressInfo.name" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="收货人手机"
          :name="['addressInfo', 'mobile']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.addressInfo.mobile" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="收货地址"
          :name="['addressInfo', 'addressIds']"
          :rules="{
            required: true,
            validator: addressIdsFormItemRulesValidator,
          }"
        >
          <address-cascader v-model:value="model.addressInfo.addressIds" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="详细地址"
          :name="['addressInfo', 'address']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.addressInfo.address" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="收货人电话" :name="['addressInfo', 'tel']">
          <a-input v-model:value="model.addressInfo.tel" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="邮编" :name="['addressInfo', 'zipcode']">
          <a-input v-model:value="model.addressInfo!.zipcode" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="买家备注" :name="['buyer_note']">
          <a-textarea v-model:value="model.buyer_note" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="商家备注" :name="['merchant_note']">
          <a-textarea v-model:value="model.merchant_note" />
        </a-form-item>
      </a-col>
    </a-row>
    <h1 style="font-weight: 700">发运计划</h1>
    <a-row>
      <a-col :span="8">
        <a-form-item label="库存冻结" :name="['stockFreeze']">
          <a-input v-model:value="model.stockFreeze" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="配送方式" :name="['delivery_mode']">
          <a-select
            v-model:value="model.delivery_mode"
            :options="DELIVERY_MODE_OPTIONS"
            :allow-clear="false"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <h1 style="font-weight: 700">开票申请</h1>
    <a-row>
      <a-col :span="8">
        <a-form-item
          label="开具发票"
          :name="['isInvoice']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-radio-group
            v-model:value="model.isInvoice"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <div v-if="model.isInvoice">
      <a-row>
        <a-col :span="8">
          <a-form-item
            label="增值税发票类型"
            :name="['order_invoice', 'invoice_form']"
            :rules="{
              required: true,
              message: '请选择',
            }"
          >
            <a-radio-group
              v-model:value="model.order_invoice.invoice_form"
              :options="VAT_INVOICE_TYPE_OPTIONS"
            >
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="发票抬头类型"
            :name="['order_invoice', 'invoice_kind']"
            :rules="{
              required: true,
              message: '请选择',
            }"
          >
            <a-radio-group
              v-model:value="model.order_invoice.invoice_kind"
              :watch="[
                () => model.order_invoice.invoice_form,
                invoiceKindRadioGroupWatch,
              ]"
            >
              <a-radio :value="2">企业</a-radio>
              <a-radio :value="1" :disabled="manRadioDisabled">个人</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item
            label="发票内容"
            :name="['order_invoice', 'content_type']"
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
          <a-form-item
            label="开票备注"
            :name="['order_invoice', 'invoice_notice']"
          >
            <a-textarea v-model:value="model.order_invoice.invoice_notice" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="发票抬头"
            :name="['order_invoice', 'invoice_title']"
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
            :name="['order_invoice', 'vat_number']"
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
            :name="['order_invoice', 'et_address']"
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
            :name="['order_invoice', 'et_phone_num']"
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
            :name="['order_invoice', 'et_bank_name']"
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
            :name="['order_invoice', 'et_bank_account']"
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
            :name="['order_invoice', 'invoice_username']"
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
            :name="['order_invoice', 'invoice_phone_num']"
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
          v-if="
            commonElectronPersonalBoolean || commonElectronEnterpriseBoolean
          "
        >
          <a-form-item
            label="收票人邮箱"
            :name="['order_invoice', 'invoice_email']"
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
            label="label"
            :name="['order_invoice', 'mArea']"
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
            :name="['order_invoice', 'invoice_address']"
            :rules="{
              required: true,
              message: '请填写',
            }"
          >
            <a-input v-model:value="model.order_invoice.invoice_address" />
          </a-form-item>
        </a-col>
      </a-row>
    </div>
    <h1 style="font-weight: 700">支付和结算</h1>
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
    <h1 style="font-weight: 700">商品信息</h1>
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
      :row-selection="{
        selectedRowKeys,
        onChange: tableChange,
      }"
    >
      <template
        #bodyCell="{
          column,
          record,
        }: {
          column: TableColumnType,
          record: Api_goods_sku_list_result_item_interface,
        }"
      >
        <template v-if="column.key === 'category_path'">
          <background-category-cascader
            :is-detail="true"
            :value="record.category_path.map(Number)"
            style="width: 100%"
          />
        </template>
        <template v-if="column.key === 'qty'">
          {{ record.qty }}
          <edit-outlined @click="qtyEditOutlinedClick(record)" />
        </template>
      </template>
    </a-table>
    <a-form-item :wrapper-col="{ offset: 1, span: 8 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
  <user-list-modal
    v-model:visible="userListModalVisible"
    @select="userListModalSelect"
  />
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
  Api_proxy_order_Order_BackEnd_submit_params_interface,
  Api_goods_sku_list_result_item_interface,
  Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface,
} from './interface';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons-vue';
import AddressCascader from '../../../components/cascader/address.vue';
import {
  WHETHER_OPTIONS,
  DELIVERY_MODE_OPTIONS,
  IS_SUIT_ENUM,
  VAT_INVOICE_TYPE_OPTIONS,
} from '../../../data/dictionary';
import { orderFormPageGoodsTableColumns } from './data';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import BackgroundCategoryCascader from '../../../components/cascader/backgroundCategory.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { forEach } from 'lodash';
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
const modelObejct = {
  entryMode: '手工创建订单',
  sale_mode: '名气商城',
  businessType: '名气家/精选',
  stockFreeze: '提交订单',
  delivery_mode: 1,
  isInvoice: 0,
  addressInfo: {},
  order_invoice: {
    invoice_form: 3,
    invoice_kind: 2,
  },
  pay_mode: 0,
  dataSource: [],
};
const model = reactive<Api_proxy_order_Order_BackEnd_submit_params_interface>({
  ...modelObejct,
});

const commonElectronEnterpriseBoolean = ref(false);
const commonPaperEnterpriseBoolean = ref(false);
const specialPaperEnterpriseBoolean = ref(false);
const commonPaperPersonalBoolean = ref(false);
const commonElectronPersonalBoolean = ref(false);
const manRadioDisabled = ref(false);
const inputSearchSearch = () => {
  if (model.user_id) {
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode(
        'div',
        { style: 'color:red;' },
        '修改买家信息后以下部分信息将需要重新设置，是否继续？（收货地址、开票申请、商品信息等）'
      ),
      onOk() {
        forEach(model, (value, key) => {
          model[
            key as keyof Api_proxy_order_Order_BackEnd_submit_params_interface
          ] = undefined;
        });
        Object.assign(model, modelObejct);
        userListModalVisible.value = true;
      },
    });
  } else {
    userListModalVisible.value = true;
  }
};

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

const addressIdsFormItemRulesValidator = async (
  _rule: Rule,
  value: number[]
) => {
  if (!value) {
    return Promise.reject('请选择');
  } else if (value.length < 3) {
    return Promise.reject('请选择省市区');
  } else {
    return Promise.resolve();
  }
};

const tableChange: TableRowSelection['onChange'] = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRows.value = rows;
};

const formRef = ref<FormInstance>();
const userListModalSelect: (
  rowKeys: TableRowSelection['selectedRowKeys'],
  rows: Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface[]
) => void = (
  rowKeys,
  [
    {
      user_id,
      phone,
      wx_nickname,
      name,
      user_level_name,
      username,
      company_name,
    },
  ]
) => {
  Object.assign(model, {
    user_id,
    phone,
    wx_nickname,
    user_level_name,
    username,
    name,
    company_name,
  });
  formRef.value!.validate(['user_id']);
};

const qtyEditOutlinedClick = ({ qty }: { qty: number }) => {};

const goodsDeleteOutlinedClick = () => {};

const goodsListModalSelect = (
  rows: Api_goods_sku_list_result_item_interface[]
) => {
  model.dataSource = model.dataSource.concat(
    rows.map((item, index) => {
      item.qty = 0;
      item.number = index + 1;
      item.sku_type_name = '实物';
      item.is_suit =
        item.is_suit === 'b' ? '' : IS_SUIT_ENUM[item.is_suit as number];
      return item;
    })
  );
};

const tableRowKey = ({
  sku_id,
  spu_id,
}: Api_goods_sku_list_result_item_interface) => {
  return `${spu_id}/${sku_id}`;
};

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
