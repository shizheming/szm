<template>
  <a-form :model="model" :label-col="{ span: 8 }">
    <h1 style="font-weight: 700">基本信息</h1>
    <a-row>
      <a-col :span="8">
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
      <a-col :span="8">
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
      <a-col :span="8">
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
      <a-col :span="8">
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
    </a-row>
  </a-form>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { FormInstance } from "ant-design-vue";
import { orderFormInterface } from "./interface";

const model = reactive<orderFormInterface>({
  entryMode: "",
  sale_mode: "",
  out_ono: "",
  businessType: "",
});
</script>
