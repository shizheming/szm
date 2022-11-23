<template>
  <a-modal
    :visible="props.visible"
    title="卖家备注"
    @ok="ok"
    @cancel="cancel"
    :confirmLoading="confirmLoading"
  >
    <a-form ref="formRef" :model="model">
      <a-form-item
        label="卖家备注"
        :name="['merchant_remark']"
        :rules="{
          required: true,
          message: '请填写',
        }"
      >
        <a-textarea v-model:value="model.merchant_remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { FormInstance, message, ModalProps } from 'ant-design-vue';
import {
  Api_order_merchantRemark_batch_params_item_interface,
  Api_order_result_item_interface,
} from '../interface';
import { api_order_merchantRemark_batch } from '../api';

const props = defineProps<{
  visible: boolean;
  selectedRowsArray: Api_order_result_item_interface[];
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'submit'): void;
}>();
const model = reactive({
  merchant_remark: '',
});
const formRef = ref<FormInstance>();
const confirmLoading = ref(false);

const ok = async () => {
  try {
    await formRef.value?.validate();
    await api_order_merchantRemark_batch({
      ids: props.selectedRowsArray.map(({ osl_seq, user: { user_id } }) => {
        return {
          ...model,
          osl_seq,
          user_id: String(user_id),
        };
      }),
    });
    message.success('成功');
    confirmLoading.value = true;
    emits('submit');
    confirmLoading.value = false;
    formRef.value?.resetFields();
    emits('update:visible', false);
  } catch (error) {
    confirmLoading.value = false;
  }
};
const cancel = () => {
  formRef.value?.resetFields();
  emits('update:visible', false);
};
</script>
