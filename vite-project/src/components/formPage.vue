<template>
  <a-form
    ref="formRef"
    :model="formModel"
    @finish="formFinish"
    @finishFailed="finishFailed"
  >
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item
          label="label"
          :label-col="{ span: 7 }"
          :name="['a']"
          :rules="{
            required: true,
            message: '请输入',
          }"
        >
          <a-input v-model:value="formModel.a" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="label"
          :label-col="{ span: 7 }"
          :name="['b']"
          :rules="{
            required: true,
            message: '请输入',
          }"
        >
          <a-input-number
            v-model:value="formModel.b"
            placeholder="请输入"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="label"
          :label-col="{ span: 7 }"
          :name="['time']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-range-picker v-model:value="formModel.time" style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="label"
          :label-col="{ span: 7 }"
          :name="['c']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-select v-model:value="formModel.c" placeholder="请选择">
            <a-select-option :value="0">0</a-select-option>
            <a-select-option :value="1">1</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="label"
          :label-col="{ span: 7 }"
          :name="['d']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-switch v-model:checked="formModel.d" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="label"
          :label-col="{ span: 7 }"
          :name="['e']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-checkbox-group v-model:value="formModel.e">
            <a-checkbox :value="1">checkbox</a-checkbox>
            <a-checkbox :value="2">checkbox</a-checkbox>
            <a-checkbox :value="3">checkbox</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="label"
          :label-col="{ span: 7 }"
          :name="['f']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-radio-group v-model:value="formModel.f">
            <a-radio :value="1">radio</a-radio>
            <a-radio :value="2">Venue</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item
          v-for="(domain, index) in formModel.domains"
          :key="domain.key"
          :label-col="index === 0 ? { span: 7 } : {}"
          :wrapper-col="index !== 0 ? { offset: 7 } : {}"
          :label="index === 0 ? 'label' : ''"
          :name="['domains', index, 'value']"
          :rules="{
            required: true,
            message: '请输入',
          }"
        >
          <a-input
            v-model:value="domain.value"
            placeholder="请输入"
            style="width: 90%; margin-right: 8px"
          />
          <minus-circle-outlined
            v-if="formModel.domains.length > 1"
            class="dynamic-delete-button"
            :disabled="formModel.domains.length === 1"
            @click="removeButtonclick(domain)"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 7 }">
          <a-button type="dashed" style="width: 90%" @click="addButtonClick">
            <plus-outlined />
            添加
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item
          label="label"
          :label-col="{ span: 7 }"
          :name="['h']"
          :rules="{
            required: true,
            validator: textareaValidator,
            message: '请输入',
          }"
        >
          <a-textarea
            v-model:value="formModel.h"
            placeholder="请输入"
            show-count
            :maxlength="200"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="label"
          :label-col="{ span: 7 }"
          :name="['xxxxxxx']"
          :rules="{
            required: true,
            message: '请输入',
          }"
        >
          <Tx v-model:value="formModel.xxxxxxx"> </Tx>
        </a-form-item>
      </a-col>
    </a-row>
    <a-button type="primary" html-type="submit">提交</a-button>
  </a-form>
</template>
<script setup>
import { ref, watch, reactive } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import Tx from "./t.vue";

const formModel = reactive({
  domains: [],
});
const formRef = ref();
const removeButtonclick = (item) => {
  let index = formModel.domains.indexOf(item);

  if (index !== -1) {
    formModel.domains.splice(index, 1);
  }
};

const addButtonClick = () => {
  formModel.domains.push({
    value: "",
    key: Date.now(),
  });
};

const textareaValidator = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请输入");
  } else {
    return Promise.resolve();
  }
};

const formFinish = (e) => {
  console.log(e, 1);
};
const finishFailed = (e) => {
  console.log(formModel, 1);
};
</script>
