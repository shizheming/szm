<template>
  <a-modal
    :visible="props.visible"
    title="title"
    @ok="ok"
    @cancel="cancel"
    :confirmLoading="confirmLoading"
  >
    <a-form ref="formRef" :model="model"> </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { FormInstance, message, ModalProps } from "ant-design-vue";
import { FormInterface } from "../interface";
import { merchant_remark_api } from "../api";

const props = defineProps<{
  visible: boolean;
}>();
const emits = defineEmits<{
  (event: "update:visible", visible: boolean): void;
  (event: "submit"): void;
}>();
const model = reactive<FormInterface>({});
const formRef = ref<FormInstance>();
const confirmLoading = ref<boolean>(false);

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue === true) {
    }
  }
);

const ok: ModalProps["onOk"] = async (e) => {
  try {
    let data = await formRef.value?.validate();

    message.success("成功");
    confirmLoading.value = true;
    emits("submit");
    confirmLoading.value = false;
    formRef.value?.resetFields();
    emits("update:visible", false);
  } catch (error) {
    confirmLoading.value = false;
  }
};
const cancel: ModalProps["onCancel"] = (e) => {
  formRef.value?.resetFields();
  emits("update:visible", false);
};
</script>
