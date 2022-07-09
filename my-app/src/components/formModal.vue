<template>
  <a-modal
    :visible="props.visible"
    title="title"
    @ok="ok"
    @cancel="cancel"
    :confirmLoading="confirmLoading"
  >
    <a-form ref="formRef" :model="formModel">
      <a-form-item
        label="label"
        :label-col="{ span: 7 }"
        :name="['a']"
        :rules="{
          required: true,
          message: '选输入',
        }"
      >
        <a-input v-model:value="formModel.a" placeholder="选输入" />
      </a-form-item>
      <a-form-item
        label="label"
        :label-col="{ span: 7 }"
        :name="['b']"
        :rules="{
          required: true,
          message: '选输入',
        }"
      >
        <a-input-number
          v-model:value="formModel.b"
          placeholder="选输入"
          style="width: 100%"
        />
      </a-form-item>
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
          <a-radio :value="2">radio</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="label"
        :label-col="{ span: 7 }"
        :name="['g']"
        :rules="{
          required: true,
          message: '请选择',
        }"
      >
        <a-radio-group v-model:value="formModel.g">
          <a-radio :value="1">radio</a-radio>
          <a-radio :value="2">radio</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="label"
        :label-col="{ span: 7 }"
        :name="['h']"
        :rules="{
          required: true,
          message: '请输入',
        }"
      >
        <a-textarea
          v-model:value="formModel.h"
          show-count
          :maxlength="200"
          placeholder="请输入"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { ref, watch, reactive } from "vue";

const props = defineProps(["visible"]);
const emits = defineEmits(["update:visible", "submit"]);
const formModel = reactive({});
const formRef = ref();
const confirmLoading = ref();

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue === true) {
    }
  }
);

const ok = async () => {
  await formRef.value.validate();
  confirmLoading.value = true;
  emits("submit");
  confirmLoading.value = false;
  formRef.value.resetFields();
  emits("update:visible", false);
};
const cancel = () => {
  formRef.value.resetFields();
  emits("update:visible", false);
};
</script>
