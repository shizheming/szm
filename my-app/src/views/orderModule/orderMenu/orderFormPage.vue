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
      <a-col> </a-col>
    </a-row>
  </a-form>
  <user-list-modal
    v-model:visible="userListModalVisible"
    @select="userListModalSelect"
  />
</template>
<script setup lang="ts">
import { reactive, defineAsyncComponent, ref, watch } from "vue";
import { FormInstance, InputProps } from "ant-design-vue";
import {
  orderCreateFormModelInterface,
  UserFormModelInterface,
} from "./interface";
import { PlusOutlined } from "@ant-design/icons-vue";
import AddressCascader from "../../../components/cascader/address.vue";
import { EditOutlined } from "@ant-design/icons-vue";

const UserListModal = defineAsyncComponent(
  () => import("./components/userListModal.vue")
);
const userListModalVisible = ref<boolean>(false);
const selectedRowKeys = ref<any[]>([]);
const userInputSearchStyle = ref<string>("0");
const model = reactive<orderCreateFormModelInterface>({
  entryMode: "手工创建订单",
  sale_mode: "名气商城",
  out_ono: "",
  businessType: "名气家/精选",
  user_id: "",
  phone: "",
  wx_nickname: "",
  user_level_name: "",
  username: "",
  name: "",
  company_name: "",
  buyer_note: "",
  merchant_note: "",
  addressInfo: {
    name: "",
    mobile: "",
    addressIds: [],
    address: "",
    tel: "",
    zipcode: "",
  },
  stockFreeze: "提交订单",
  delivery_mode: "快递",
});

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
</script>
