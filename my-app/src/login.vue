<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :wrapper-col="{ span: 5 }"
    style="margin-top: 200px"
    @finish="formFinishFunction"
  >
    <a-form-item
      label="账号"
      :label-col="{ span: 9 }"
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
      :label-col="{ span: 9 }"
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
      :label-col="{ span: 9 }"
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
      :label-col="{ span: 9 }"
      :name="['sms_code']"
      :rules="{
        required: true,
        message: '请输入',
      }"
    >
      <a-input v-model:value="formModel.sms_code" placeholder="请输入" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 9 }">
      <a-button type="primary" html-type="submit" :loading="buttonLoading"
        >登录</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { message, FormProps, FormInstance } from 'ant-design-vue';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import axios from './utils/axios';
import { encrypt } from './utils/tool';
import { PermissionsRequestResultInterface } from './interface/index';
// 这种不需要写接口，自己都能类型推断，减少工作量，
const formModel = reactive({
  sms_code: '',
  cms_phone: '',
  password: '',
  username: '',
});
const formRef = ref<FormInstance>();
const routerObject = useRouter();
const buttonLoading = ref(false);

const formFinishFunction: FormProps['onFinish'] = async (values) => {
  buttonLoading.value = true;
  try {
    let {
      data: { token_type, access_token },
    } = await axios.post('/api/manager/login', {
      ...values,
      password: encrypt(values.password),
    });
    let token = `${token_type} ${access_token}`;
    let { data: d2 } = await axios({
      method: 'GET',
      headers: { Authorization: token },
      url: '/api/manager/permissions',
    });
    let { data: d3 } = await axios.get<PermissionsRequestResultInterface>(
      '/api/manager/me',
      {
        headers: { Authorization: token },
      }
    );
    buttonLoading.value = false;
    routerObject.push({
      name: 'index',
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
