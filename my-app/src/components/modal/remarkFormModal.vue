<template>
  <a-modal
    title="卖家备注"
    :visible="propsObject.visible"
    @ok="modalOkFunction"
    @cancel="modalCancelFunction"
    :confirmLoading="modalConfirmLoadingBoolean"
  >
    <a-form ref="formRefObject" :model="formModelObject">
      <a-form-item
        label="卖家备注"
        :name="['merchant_remark']"
        :rules="{
          required: true,
          message: '请填写',
        }"
      >
        <a-textarea v-model:value="formModelObject.merchant_remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { FormInstance, message, ModalProps } from 'ant-design-vue';
import { OrderListRequestResultItemInterface } from '../interface';
import { batchRequestFunction } from '../api';

const propsObject = defineProps<{
  visible: boolean;
  selectedRowsArray: OrderListRequestResultItemInterface[];
}>();
const emitsFunction = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'submit'): void;
}>();
const formModelObject = reactive({
  merchant_remark: '',
});
const formRefObject = ref<FormInstance>();
const modalConfirmLoadingBoolean = ref(false);

const modalOkFunction = async () => {
  await formRefObject.value?.validate();
  modalConfirmLoadingBoolean.value = true;
  await batchRequestFunction({
    ids: propsObject.selectedRowsArray.map(({ osl_seq, user: { user_id } }) => {
      return {
        ...formModelObject,
        osl_seq,
        user_id: String(user_id),
      };
    }),
  }).catch(() => {
    modalConfirmLoadingBoolean.value = false;
    return Promise.reject();
  });
  message.success('成功');
  emitsFunction('submit');
  modalConfirmLoadingBoolean.value = false;
  formRefObject.value?.resetFields();
  emitsFunction('update:visible', false);
};
const modalCancelFunction = () => {
  formRefObject.value?.resetFields();
  emitsFunction('update:visible', false);
};
</script>
