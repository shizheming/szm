<template>
  <a-form :model="model" :label-col="{ span: 8 }">
    <h1 style="font-weight: 700">基本信息</h1>
    <a-row>
      <a-col>
        <a-form-item
          label="录入方式"
          :name="['entryMode']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.entryMode" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="销售渠道"
          :name="['sale_mode']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.sale_mode" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="外部订单号"
          :name="['out_ono']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.out_ono" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="站点/业务类型"
          :name="['businessType']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.businessType" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="用户ID"
          :name="['user_id']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input-search
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
        <a-form-item
          label="关联手机号"
          :name="['phone']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.phone" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="微信昵称"
          :name="['wx_nickname']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.wx_nickname" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="用户等级"
          :name="['user_level_name']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.user_level_name" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="用户名"
          :name="['username']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.username" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="买家姓名"
          :name="['name']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.name" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="企业名称"
          :name="['company_name']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.company_name" />
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
        <a-form-item
          label="收货人电话"
          :name="['addressInfo', 'tel']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.addressInfo.tel" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="邮编"
          :name="['addressInfo', 'zipcode']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="model.addressInfo.zipcode" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-form-item
          label="买家备注"
          :name="['buyer_note']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-textarea v-model:value="model.buyer_note" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="商家备注"
          :name="['merchant_note']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-textarea v-model:value="model.merchant_note" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <user-list-modal
    v-model:visible="userListModalVisible"
    :selected-row-keys="selectedRowKeys"
  />
</template>
<script setup lang="ts">
import { reactive, defineAsyncComponent, ref } from "vue";
import { FormInstance, InputProps } from "ant-design-vue";
import { orderCreateFormModelInterface } from "./interface";
import { PlusOutlined } from "@ant-design/icons-vue";
import AddressCascader from "../../../components/cascader/address.vue";

const UserListModal = defineAsyncComponent(
  () => import("./components/userListModal.vue")
);
const userListModalVisible = ref<boolean>(false);
const selectedRowKeys = ref<any[]>([]);
const model = reactive<orderCreateFormModelInterface>({
  entryMode: "",
  sale_mode: "",
  out_ono: "",
  businessType: "",
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
});

const inputSearchSearch: InputProps["onChange"] = () => {
  userListModalVisible.value = true;
};
</script>
