<template>
  <div>
    <h1 style="text-align: center; margin-top: 50px">运营后台</h1>
    <a-form
      :model="formData"
      :label-col="{ span: 10 }"
      :wrapper-col="{ span: 4 }"
      ref="formObj"
    >
      <a-form-item
        label="账号"
        :rules="{
          required: true,
          message: '请填写账号',
        }"
        name="username"
      >
        <a-input v-model:value="formData.username" placeholder="账号" />
      </a-form-item>
      <a-form-item
        label="密码"
        :rules="{
          required: true,
          message: '请填写密码',
        }"
        name="password"
      >
        <a-input v-model:value="formData.password" type="password" />
      </a-form-item>
      <a-form-item
        label="手机号"
        :rules="{
          required: true,
          message: '请填写手机号',
        }"
        name="cms_phone"
      >
        <a-input v-model:value="formData.cms_phone" placeholder="手机号" />
      </a-form-item>
      <a-form-item
        label="验证码"
        :rules="{
          required: true,
          message: '请填写验证码',
        }"
        name="sms_code"
      >
        <a-input v-model:value="formData.sms_code" placeholder="验证码" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 10 }">
        <a-button type="primary" :loading="loading" @click="login"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { ref, toRefs, reactive, onMounted } from "vue";
import { desEncrypt, desDecrypt } from "./libs/util";
import App from "./libs/app";
import { message } from "ant-design-vue";
import axios from "axios";
import VueCookies from "vue-cookies";

let formData = reactive({});
let formObj = ref();
let loading = ref();
let auth = ref();
let userInfo;
const emit = defineEmits();

function getPermission(token) {
  const headers = {
    Authorization: token,
  };
  axios.defaults.headers.common["Authorization"] = token;
  return new Promise((resolve, reject) => {
    axios
      .get("api/manager/me", { headers })
      .then((res) => {
        axios.get("api/manager/permissions", { headers }).then((auth) => {
          resolve({ ...auth, userInfo: res.data.data || {} });
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
onMounted(() => {
  App.logout(["permission", "userInfo"]);
});

function login() {
  formObj.value.validate().then(() => {
    loading.value = true;
    axios
      .post("api/manager/login", {
        ...formData,
        password: desEncrypt(formData.password),
      })
      .then(({ data }) => {
        if (data.code == 0) {
          let { token_type, access_token } = data.data;
          const token = `${token_type} ${access_token}`;
          VueCookies.set("token", token, "1m");
          getPermission(token)
            .then((data) => {
              auth = data.data.data || [];
              App.storage("permission", auth);
              userInfo = data.userInfo;

              let arr = [];
              let platform = "kfsc";

              if (userInfo.bucket) {
                for (let key in userInfo.bucket) {
                  if (userInfo.bucket[key].is_pub == 0) {
                    arr[0] = key;
                  }
                  if (userInfo.bucket[key].is_pub == 1) {
                    arr[1] = key;
                  }
                }
              }
              // 10000：名气商城，其他：开放商城
              if (userInfo.enterprise_id == 10000) {
                platform = "mqsc";
              }
              App.login({ ...userInfo, buckets: arr, platform });

              message.success("登录成功", 1, () => {
                emit("update:cook", token);
              });
            })
            .finally(() => {
              loading = false;
            });
        } else {
          loading = false;
          message.error(data.msg || "登录失败");
        }
      });
  });
}
</script>
<style lang="less"></style>
