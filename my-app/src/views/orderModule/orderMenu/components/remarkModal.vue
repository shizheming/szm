<template>
  <a-modal
    :visible="props.visible"
    title="title"
    @ok="ok"
    @cancel="cancel"
    :confirmLoading="confirmLoading"
  >
    <a-form ref="formRef" :model="model">
      <a-form-item
        label="label"
        :label-col="{ span: 7 }"
        :name="['h']"
        :rules="{
          required: true,
          message: '请填写',
        }"
      >
        <a-textarea v-model:value="model.remark" show-count :maxlength="220" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { FormInstance, ModalProps } from "ant-design-vue";
import { remarkInterface } from "../interface";

const props = defineProps(["visible"]);
const emits = defineEmits(["update:visible", "submit"]);
const model = reactive<remarkInterface>({ remark: "" });
const formRef = ref<FormInstance>();
const confirmLoading = ref<boolean>(false);

watch(
  () => props.visible,
  async (newValue: boolean) => {
    if (newValue === true) {
    }
  }
);

const ok: ModalProps["onOk"] = async (a) => {
  await formRef.value?.validate();
  confirmLoading.value = true;
  emits("submit");
  confirmLoading.value = false;
  formRef.value?.resetFields();
  emits("update:visible", false);
};
const cancel = () => {
  formRef.value?.resetFields();
  emits("update:visible", false);
};
</script>
