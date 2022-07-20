<template>
  <a-form :model="model" :label-col="{ span: 8 }">
    <h1 style="font-weight: 700">基本信息</h1>
    <a-row>
      <a-col>
        <a-form-item label="录入方式" :name="['entryMode']">
          <a-input v-model:value="model.entryMode" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="销售渠道" :name="['sale_mode']">
          <a-input v-model:value="model.sale_mode" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="外部订单号" :name="['out_ono']">
          <a-input v-model:value="model.out_ono" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="站点/业务类型" :name="['businessType']">
          <a-input v-model:value="model.businessType" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
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
            :style="`width:${userInputSearchStyle}`"
            v-model:value="model.user_id"
            @search="inputSearchSearch"
          >
            <template #enterButton>
              <a-button><plus-outlined /></a-button>
            </template>
          </a-input-search>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="关联手机号" :name="['phone']">
          <a-input v-model:value="model.phone" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="微信昵称" :name="['wx_nickname']">
          <a-input v-model:value="model.wx_nickname" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="用户等级" :name="['user_level_name']">
          <a-input v-model:value="model.user_level_name" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="用户名" :name="['username']">
          <a-input v-model:value="model.username" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="买家姓名" :name="['name']">
          <a-input v-model:value="model.name" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="企业名称" :name="['company_name']">
          <a-input v-model:value="model.company_name" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
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
      <a-col>
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
      <a-col>
        <a-form-item
          label="收货地址"
          :name="['addressInfo', 'addressIds']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <address-cascader v-model:value="model.addressInfo.addressIds" />
        </a-form-item>
      </a-col>
      <a-col>
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
      <a-col>
        <a-form-item label="收货人电话" :name="['addressInfo', 'tel']">
          <a-input v-model:value="model.addressInfo.tel" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="邮编" :name="['addressInfo', 'zipcode']">
          <a-input v-model:value="model.addressInfo.zipcode" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-form-item label="买家备注" :name="['buyer_note']">
          <a-textarea v-model:value="model.buyer_note" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="商家备注" :name="['merchant_note']">
          <a-textarea v-model:value="model.merchant_note" />
        </a-form-item>
      </a-col>
    </a-row>
    <h1 style="font-weight: 700">发运计划</h1>
    <a-row>
      <a-col>
        <a-form-item label="库存冻结" :name="['stockFreeze']">
          <a-input v-model:value="model.stockFreeze" :is-detail="true" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="配送方式" :name="['delivery_mode']">
          <a-input v-model:value="model.delivery_mode" :is-detail="true" />
        </a-form-item>
      </a-col>
    </a-row>
    <h1 style="font-weight: 700">开票申请</h1>
    <a-row>
      <a-col>
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
        <a-col>
          <a-form-item
            label="增值税发票类型"
            :name="['order_invoice', 'invoice_form']"
            :rules="{
              required: true,
              message: '请选择',
            }"
          >
            <a-radio-group v-model:value="model.order_invoice.invoice_form">
              <a-radio :value="3">电子普通发票</a-radio>
              <a-radio :value="2">专用发票</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item
            label="发票抬头类型"
            :name="['order_invoice', 'invoice_kind']"
            :rules="{
              required: true,
              message: '请选择',
            }"
          >
            <a-radio-group v-model:value="model.order_invoice.invoice_kind">
              <a-radio :value="2">企业</a-radio>
              <a-radio :value="1" :disabled="manRadioDisabled">个人</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
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
        <a-col>
          <a-form-item
            label="开票备注"
            :name="['order_invoice', 'invoice_notice']"
            :rules="{
              required: true,
              message: '请填写',
            }"
          >
            <a-textarea v-model:value="model.order_invoice.invoice_notice" />
          </a-form-item>
        </a-col>
        <a-col>
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
        <a-col>
          <a-form-item
            v-if="
              commonElectronEnterpriseBoolean ||
              commonPaperEnterpriseBoolean ||
              specialPaperEnterpriseBoolean
            "
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
        <a-col>
          <a-form-item
            v-if="
              commonElectronEnterpriseBoolean ||
              commonPaperEnterpriseBoolean ||
              specialPaperEnterpriseBoolean
            "
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
        <a-col>
          <a-form-item
            v-if="
              commonElectronEnterpriseBoolean ||
              commonPaperEnterpriseBoolean ||
              specialPaperEnterpriseBoolean
            "
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
        <a-col>
          <a-form-item
            v-if="
              commonElectronEnterpriseBoolean ||
              commonPaperEnterpriseBoolean ||
              specialPaperEnterpriseBoolean
            "
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
        <a-col>
          <a-form-item
            v-if="
              commonElectronEnterpriseBoolean ||
              commonPaperEnterpriseBoolean ||
              specialPaperEnterpriseBoolean
            "
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
        <a-col>
          <a-form-item
            v-if="
              commonPaperPersonalBoolean ||
              commonPaperEnterpriseBoolean ||
              specialPaperEnterpriseBoolean
            "
            label="收票人姓名"
            :name="['order_invoice', 'invoice_username']"
            :rules="{
              required:
                commonPaperPersonalBoolean ||
                commonPaperEnterpriseBoolean ||
                specialPaperEnterpriseBoolean,
              message: '请填写',
            }"
          >
            <a-input v-model:value="model.order_invoice.invoice_username" />
          </a-form-item>
        </a-col>
        <a-col>
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
        <a-col>
          <a-form-item
            v-if="
              commonElectronPersonalBoolean || commonElectronEnterpriseBoolean
            "
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
        <a-col>
          <a-form-item
            v-if="
              commonPaperPersonalBoolean ||
              commonPaperEnterpriseBoolean ||
              specialPaperEnterpriseBoolean
            "
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
        <a-col>
          <a-form-item
            v-if="
              commonPaperPersonalBoolean ||
              commonPaperEnterpriseBoolean ||
              specialPaperEnterpriseBoolean
            "
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
      <a-col>
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
  </a-form>
  <user-list-modal
    v-model:visible="userListModalVisible"
    @select="userListModalSelect"
  />
</template>
<script setup lang="ts">
import { reactive, defineAsyncComponent, ref, watch, computed } from "vue";
import { FormInstance, InputProps } from "ant-design-vue";
import {
  orderCreateFormModelInterface,
  UserFormModelInterface,
} from "./interface";
import { PlusOutlined } from "@ant-design/icons-vue";
import AddressCascader from "../../../components/cascader/address.vue";
import { WHETHER_OPTIONS } from "../../../data/dictionary";

const UserListModal = defineAsyncComponent(
  () => import("./components/userListModal.vue")
);
const userListModalVisible = ref<boolean>(false);
const selectedRowKeys = ref<any[]>([]);
const userInputSearchStyle = ref<string>("0");
const model = reactive<orderCreateFormModelInterface>({
  entryMode: "手工创建订单",
  sale_mode: "名气商城",
  businessType: "名气家/精选",
  user_id: "",
  addressInfo: {
    name: "",
    mobile: "",
    addressIds: [],
    address: "",
  },
  stockFreeze: "提交订单",
  delivery_mode: "快递",
  isInvoice: 0,
  order_invoice: {
    invoice_form: 3,
    invoice_kind: 2,
  },
  pay_mode: 0,
});

const commonElectronEnterpriseBoolean = ref<boolean>(false);
const commonPaperEnterpriseBoolean = ref<boolean>(false);
const specialPaperEnterpriseBoolean = ref<boolean>(false);
const commonPaperPersonalBoolean = ref<boolean>(false);
const commonElectronPersonalBoolean = ref<boolean>(false);
const manRadioDisabled = ref<boolean>(false);
const inputSearchSearch: InputProps["onChange"] = () => {
  userListModalVisible.value = true;
};

const userListModalSelect: (
  rowKeys: any[],
  rows: UserFormModelInterface[]
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
  userInputSearchStyle.value = "50%";
  Object.assign(model, {
    user_id,
    phone,
    wx_nickname,
    user_level_name,
    username,
    name,
    company_name,
  });
};

watch(
  [
    () => model.order_invoice.invoice_kind,
    () => model.order_invoice.invoice_form,
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
watch(
  () => model.order_invoice.invoice_form,
  (newValue) => {
    if (newValue == 1 || newValue == 3) {
      manRadioDisabled.value = false;
    } else {
      manRadioDisabled.value = true;
      model.order_invoice.invoice_kind = 2;
    }
  }
);
</script>
