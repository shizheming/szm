<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :wrapper-col="{ span: 12 }"
    @finish="formFinish"
    style="margin: 5% auto; width: 50%"
  >
    <a-form-item
      label="账号"
      :label-col="{ span: 6 }"
      :name="['username']"
      :rules="{
        required: true,
        message: '请输入',
      }"
    >
      <a-input v-model:value="formModel.username" placeholder="请输入" />
    </a-form-item>
    <a-form-item
      label="密码"
      :label-col="{ span: 6 }"
      type="password"
      :name="['password']"
      :rules="{
        required: true,
        message: '请输入',
      }"
    >
      <a-input-password
        v-model:value="formModel.password"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      label="手机号"
      :label-col="{ span: 6 }"
      :name="['cms_phone']"
      :rules="{
        required: true,
        message: '请输入',
      }"
    >
      <a-input v-model:value="formModel.cms_phone" placeholder="请输入" />
    </a-form-item>
    <a-form-item
      label="验证码"
      :label-col="{ span: 6 }"
      :name="['sms_code']"
      :rules="{
        required: true,
        message: '请输入',
      }"
    >
      <a-input v-model:value="formModel.sms_code" placeholder="请输入" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 6 }">
      <a-button type="primary" html-type="submit" :loading="buttonLoading"
        >登录</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script setup>
import { ref, watch, reactive } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import axios from "./utils/axios";
import { encrypt } from "./utils/tool";

const formModel = reactive({});
const formRef = ref();
const router = useRouter();
const buttonLoading = ref(false);

const formFinish = async (values) => {
  buttonLoading.value = true;
  try {
    let {
      data: { token_type, access_token },
    } = await axios.post("/api/manager/login", {
      ...values,
      password: encrypt(values.password),
    });
    let token = `${token_type} ${access_token}`;
    let { data: d2 } = await axios({
      method: "GET",
      headers: { Authorization: token },
      url: "/api/manager/permissions",
    });
    let { data: d3 } = await axios({
      method: "GET",
      headers: { Authorization: token },
      url: "/api/manager/me",
    });
    buttonLoading.value = false;
    router.push({
      name: "index",
      params: {
        token,
        permissions: JSON.stringify(d2),
        userInfo: JSON.stringify(d3),
      },
    });
  } catch (v) {
    buttonLoading.value = false;
  }
};
</script>
